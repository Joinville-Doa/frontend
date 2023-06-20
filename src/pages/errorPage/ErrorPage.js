import * as React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
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
          maxWidth: "40%",
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
        <img
          className="term-logo2"
          alt="Logo secundário"
          src="/images/logo-4.png"
          style={{ width: "250px", height: "auto" }}
        />
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            marginTop: 50,
            marginBottom: 50,
            fontWeight: "bold",
          }}
        >
          Ops! Você não tem permissão para acessar esta página!!!
        </Typography>
        <Typography
          variant="body1"
          style={{
            textAlign: "center",
          }}
        >
          Faça o seu login para acessar o conteúdo!!!
        </Typography>
        <Link to="/login">
          <Button
            variant="contained"
            color="warning"
            type="submit"
            sx={{ mt: 2, mb: 2, width: "100%" }}
          >
            Entrar
          </Button>
        </Link>
      </Box>
      <Footer />
    </>
  );
}
