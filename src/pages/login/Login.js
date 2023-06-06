import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Box, Snackbar } from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      user {
        name
        email
        documentNumber
        phone
        dateOfBirth
        acceptTermsOfUse
      }
      message
      token
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [loginUser] = useMutation(LOGIN_MUTATION);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
    setFormError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "") {
      setEmailError("Por favor, insira seu e-mail.");
      return;
    }

    if (password === "") {
      setPasswordError("Por favor, insira sua senha.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      });

      if (data.loginUser.token) {
        localStorage.setItem("token", data.loginUser.token);
        // window.location.href = "/";
      }

      if (data.loginUser.message) {
        setFormError(data.loginUser.message);
        setSnackbarOpen(true);
        return;
      }
    } catch (error) {
      setFormError(
        "Ocorreu um erro ao fazer login. Por favor, tente novamente."
      );
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontFamily: "Inter, sans-serif" }}
        >
          Ainda não tem conta?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Cadastre-se
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "300px" }}
        >
          <TextField
            type="text"
            label="Seu e-mail"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
            margin="normal"
          />
          <TextField
            type="password"
            label="Sua senha"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Logar
          </Button>
          {formError && (
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message={formError}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
          )}
        </form>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Link to="/politicas-de-uso">
          <Button variant="text" color="primary">
            Política de privacidade
          </Button>
        </Link>
      </Box>
      <Footer />
    </>
  );
}
