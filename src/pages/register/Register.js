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
  IconButton,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const REGISTER_MUTATION = gql`
  mutation RegisterUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        name
        email
        documentNumber
        phone
        dateOfBirth
        acceptTermsOfUse
      }
      message
    }
  }
`;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTermsOfUse, setAcceptTermsOfUse] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser] = useMutation(REGISTER_MUTATION);

  const handleCPFChange = (event) => {
    const newValue = formatCPF(event.target.value);
    setCPF(newValue);
  };

  const handleDateOfBirthChange = (event) => {
    const newValue = formatDateOfBirth(event.target.value);
    setDateOfBirth(newValue);
  };

  const handlePhoneChange = (event) => {
    const newValue = formatPhone(event.target.value);
    setPhone(newValue);
  };

  const formatCPF = (value) => {
    let newValue = value.replace(/\D/g, "").slice(0, 11);

    newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
    newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
    newValue = newValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return newValue;
  };

  const formatDateOfBirth = (value) => {
    let newValue = value.replace(/\D/g, "").slice(0, 8);

    newValue = newValue.replace(/(\d{2})(\d)/, "$1/$2");
    newValue = newValue.replace(/(\d{2})(\d)/, "$1/$2");

    return newValue;
  };

  const formatPhone = (value) => {
    let newValue = value.replace(/\D/g, "");

    newValue = newValue.replace(/(\d{2})(\d)/, "($1) $2").slice(0, 14);
    newValue = newValue.replace(/(\d{5})(\d)/, "$1-$2");

    return newValue;
  };

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

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
    setFormError("");
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleAcceptTermsOfUseChange = (event) => {
    setAcceptTermsOfUse(event.target.checked);
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

    if (confirmPassword === "") {
      setConfirmPasswordError("Por favor, confirme sua senha.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não correspondem.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }

    if (!acceptTermsOfUse) {
      setFormError("Você precisa aceitar os termos de uso.");
      return;
    }

    try {
      const { data } = await registerUser({
        variables: {
          input: {
            email,
            name,
            phone,
            dateOfBirth,
            documentNumber: cpf,
            password,
            passwordConfirmation: confirmPassword,
            acceptTermsOfUse,
          },
        },
      });

      if (data.createUser.user) {
        const {
          id,
          name,
          email,
          documentNumber,
          phone,
          dateOfBirth,
          acceptTermsOfUse,
        } = data.createUser.user;
        console.log("User created:", {
          id,
          name,
          email,
          documentNumber,
          phone,
          dateOfBirth,
          acceptTermsOfUse,
        });
        setSnackbarMessage("Usuário criado com sucesso!");
        setSnackbarOpen(true);
        return;
      }

      if (data.createUser.message) {
        setFormError(data.createUser.message);
        setSnackbarOpen(true);
        return;
      }
    } catch (error) {
      setFormError(
        "Ocorreu um erro ao se registrar. Por favor, tente novamente mais tarde."
      );
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isFormValid = () => {
    return (
      name !== "" &&
      email !== "" &&
      cpf !== "" &&
      dateOfBirth !== "" &&
      phone !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      acceptTermsOfUse
    );
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 4,
          maxWidth: "60%",
          margin: "100px auto",
          backgroundColor: "rgba(245, 245, 245, 0.8)",
          border: "1px solid #E0E0E0",
          borderRadius: "10px",
          p: 4,
          "@media (max-width: 600px)": {
            maxWidth: "90%",
          },
        }}
      >
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
        </Box>
        <Divider
          sx={{
            width: "100%",
          }}
        />
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <TextField
            type="text"
            label="Nome completo"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
            margin="normal"
            width="100%"
            required
          />
          <TextField
            type="text"
            label="CPF"
            variant="outlined"
            fullWidth
            value={cpf}
            onChange={handleCPFChange}
            margin="normal"
            style={{ width: "45%" }}
            required
          />
          <TextField
            type="text"
            label="Data de nascimento"
            variant="outlined"
            fullWidth
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            margin="normal"
            style={{ width: "45%", marginLeft: "10%" }}
            required
          />
          <TextField
            type="text"
            label="Telefone / WhatsApp"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={handlePhoneChange}
            margin="normal"
            style={{ width: "45%" }}
            required
          />
          <TextField
            type="email"
            label="E-mail"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
            margin="normal"
            style={{ width: "45%", marginLeft: "10%" }}
            required
          />
          <TextField
            type={showPassword ? "text" : "password"}
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type={showConfirmPassword ? "text" : "password"}
            label="Confirmar senha"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
            margin="normal"
            style={{ width: "45%", marginLeft: "10%" }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowConfirmPassword}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <Checkbox
              checked={acceptTermsOfUse}
              onChange={handleAcceptTermsOfUseChange}
              inputProps={{ "aria-label": "aceite termos de uso" }}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#000000",
                marginTop: "5px",
              }}
            >
              Estou de acordo com a{" "}
              <Link to="/politicas-de-uso" style={{ textDecoration: "none" }}>
                <strong style={{ color: "#E54203" }}>
                  política de privacidade
                </strong>{" "}
              </Link>
              da Joinville Doa.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{
              width: "30%",
              marginLeft: "15%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            disabled={!isFormValid()}
          >
            Salvar
          </Button>
          {formError && (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center" }}
            >
              {formError}
            </Typography>
          )}
          <Link to="/">
            <Button
              variant="contained"
              color="warning"
              style={{
                width: "30%",
                marginLeft: "15%",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Cancelar
            </Button>
          </Link>
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          ></IconButton>
        }
      />
      <Footer />
    </>
  );
}
