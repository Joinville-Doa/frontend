import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "") {
      setEmailError("Por favor, insira seu e-mail.");
    }

    if (password === "") {
      setPasswordError("Por favor, insira sua senha.");
    }

    if (email !== "" && password !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        setEmailError("Por favor, insira um e-mail válido.");
        return;
      }
    } else {
      setFormError("Por favor, insira todos os campos requisitados.");
    }
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
            <Typography variant="body2" color="error" align="center">
              {formError}
            </Typography>
          )}
        </form>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Link to="/termos-de-uso">
          <Button variant="text" color="primary">
            Política de privacidade
          </Button>
        </Link>
      </Box>
      <Footer />
    </>
  );
}
