import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Divider,
} from "@mui/material";
import { useMutation, gql } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [registerUser] = useMutation(REGISTER_MUTATION);

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
      const { data } = await registerUser({
        variables: {
          email,
          password,
        },
      });

      if (data.registerUser.token) {
        localStorage.setItem("token", data.registerUser.token);
        // window.location.href = "/";
      }

      if (data.registerUser.message) {
        setFormError(data.registerUser.message);
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
          Cadastro de Usuário
        </Typography>
        <Divider
          sx={{ width: "18%", borderWidth: "1px", borderBlockColor: "#000000" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <TextField
            type="text"
            label="Nome completo"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
            margin="normal"
            width="100%"
            required
          />
          <TextField
            type="text"
            label="CPF"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            margin="normal"
            style={{ width: "45%" }}
            required
          />
          <TextField
            type="text"
            label="Data de nascimento"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            margin="normal"
            style={{ width: "45%", marginLeft: "10%" }}
            required
          />
          <TextField
            type="text"
            label="Telefone / WhatsApp"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            margin="normal"
            style={{ width: "45%" }}
            required
          />
          <TextField
            type="email"
            label="E-mail"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            margin="normal"
            style={{ width: "45%", marginLeft: "10%" }}
            required
          />
          <TextField
            type="password"
            label="Senha"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            margin="normal"
            style={{ width: "45%" }}
            required
          />
          <TextField
            type="password"
            label="Confirmar senha"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            margin="normal"
            style={{ width: "45%", marginLeft: "10%" }}
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "30%", marginLeft: "15%", marginTop: "20px", marginBottom: "100px" }}
          >
            Salvar
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
          <Button
            variant="contained"
            color="warning"
            type="submit"
            style={{ width: "30%", marginRight: "15%", marginLeft: "10%", marginTop: "20px", marginBottom: "100px" }}
          >
            Cancelar
          </Button>
        </form>
      </Box>
      <Footer />
    </>
  );
}
