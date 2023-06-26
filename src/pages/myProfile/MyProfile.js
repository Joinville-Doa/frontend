import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation, gql, useQuery } from "@apollo/client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Checkbox,
  IconButton,
  InputAdornment,
} from "@mui/material";

const USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
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

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MyProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION);

  const { loading: userLoading, data: userData } = useQuery(USER_QUERY, {
    variables: { id: user?.id },
    skip: !user,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptTermsOfUse, setAcceptTermsOfUse] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  if (!user) {
    navigate("*");
  }

  useEffect(() => {
    if (userData && userData.user) {
      const {
        name,
        email,
        documentNumber,
        dateOfBirth,
        acceptTermsOfUse,
        phone,
      } = userData.user;
      setName(name);
      setEmail(email);
      setCPF(documentNumber);
      setDateOfBirth(dateOfBirth);
      setAcceptTermsOfUse(acceptTermsOfUse);
      setPhone(phone);
    }
  }, [userData]);

  useEffect(() => {
    setIsSaveEnabled(
      name !== "" &&
        cpf !== "" &&
        dateOfBirth !== "" &&
        phone !== "" &&
        email !== "" &&
        acceptTermsOfUse &&
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword &&
        password !== user.password
    );
  }, [
    name,
    cpf,
    dateOfBirth,
    phone,
    email,
    acceptTermsOfUse,
    password,
    confirmPassword,
  ]);

  useEffect(() => {
    setIsSaveEnabled(
      name !== "" &&
        cpf !== "" &&
        dateOfBirth !== "" &&
        phone !== "" &&
        email !== "" &&
        acceptTermsOfUse &&
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword &&
        password !== user.password
    );
  }, [
    name,
    cpf,
    dateOfBirth,
    phone,
    email,
    acceptTermsOfUse,
    password,
    confirmPassword,
  ]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCPFChange = (event) => {
    const newValue = formatCPF(event.target.value);
    setCPF(newValue);
  };

  const handlePhoneChange = (event) => {
    const newValue = formatPhone(event.target.value);
    setPhone(newValue);
  };

  const formatPhone = (value) => {
    let newValue = value.replace(/\D/g, "");

    newValue = newValue.replace(/(\d{2})(\d)/, "($1) $2").slice(0, 14);
    newValue = newValue.replace(/(\d{5})(\d)/, "$1-$2");

    return newValue;
  };

  const formatCPF = (value) => {
    let newValue = value.replace(/\D/g, "").slice(0, 11);

    newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
    newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
    newValue = newValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return newValue;
  };

  const handleEdit = () => {
    setEditMode(true);
    setPassword("");
    setConfirmPassword("");
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
      setSnackbarOpen("Você precisa aceitar os termos de uso.");
      return;
    }

    try {
      const { data } = await updateUser({
        variables: {
          input: {
            id: user.id,
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

      if (data.updateUser.user) {
        const {
          id,
          name,
          email,
          documentNumber,
          phone,
          dateOfBirth,
          acceptTermsOfUse,
        } = data.updateUser.user;

        setFormSuccess("Usuário atualizado com sucesso!");
        setSnackbarOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setFormError(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setPassword("");
    setConfirmPassword("");
  };

  const handleAcceptTermsOfUseChange = (event) => {
    setAcceptTermsOfUse(event.target.checked);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
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
            Editar meu Perfil
          </Typography>
        </Box>
        <Divider
          sx={{
            width: "100%",
          }}
        />
        <form style={{ width: "100%", maxWidth: "600px" }}>
          <TextField
            type="text"
            label="Nome completo"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
            margin="normal"
            width="100%"
            disabled={!editMode}
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
            disabled={!editMode}
            required
          />
          <TextField
            type="text"
            label="Data de nascimento"
            variant="outlined"
            fullWidth
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            margin="normal"
            style={{ width: "45%", marginLeft: "10%" }}
            disabled={!editMode}
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
            disabled={!editMode}
            required
          />
          <TextField
            type="email"
            label="E-mail"
            variant="outlined"
            fullWidth
            value={email}
            error={Boolean(emailError)}
            helperText={emailError}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            style={{ width: "45%", marginLeft: "10%" }}
            disabled={!editMode}
            required
          />
          <Divider
            sx={{
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            sx={{ fontFamily: "Inter, sans-serif" }}
            textAlign={"center"}
          >
            Necessário preencher sua senha para salvar as alterações
          </Typography>
          {editMode && (
            <>
              <TextField
                type={showPassword ? "text" : "password"}
                label="Senha"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                margin="normal"
                style={{ width: "45%" }}
                error={Boolean(passwordError)}
                helperText={passwordError}
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
                label="Confirmação de senha"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                margin="normal"
                style={{ width: "45%", marginLeft: "10%" }}
                error={Boolean(confirmPasswordError)}
                helperText={confirmPasswordError}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowConfirmPassword}>
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <Checkbox
              checked={acceptTermsOfUse}
              onChange={handleAcceptTermsOfUseChange}
              inputProps={{ "aria-label": "aceite termos de uso" }}
              disabled={!editMode}
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
              <Link
                to="/politicas-de-uso"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <strong style={{ color: "#E54203" }}>
                  política de privacidade
                </strong>{" "}
              </Link>
              da Joinville Doa.
            </Typography>
          </Box>

          {editMode ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{
                  width: "30%",
                  marginLeft: "15%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
                disabled={!isSaveEnabled}
              >
                Salvar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={handleCancel}
                style={{
                  width: "30%",
                  marginLeft: "15%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              style={{
                width: "30%",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Editar
            </Button>
          )}
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={formError ? "error" : "success"}
        >
          {formError || formSuccess}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}
