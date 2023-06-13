import React, { createContext, useState, useEffect, useContext } from "react";
import { gql } from "@apollo/client";
import client from "../apollo";

const AuthContext = createContext();

const GET_USER_BY_TOKEN = gql`
  query GetUserByToken($token: String!) {
    userByToken(token: $token) {
      id
      name
      email
      documentNumber
      dateOfBirth
      acceptTermsOfUse
      phone
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const { data } = await client.query({
        query: GET_USER_BY_TOKEN,
        variables: {
          token: token,
        },
      });

      const user = data.userByToken;
      setUser(user);
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUser(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
