import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Navbar";
import { useQuery, gql, useMutation } from "@apollo/client";
import Footer from "../../components/Footer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import {
  CardActionArea,
  Grid,
  IconButton,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const GET_DATA = gql`
  query GetDonationsByUser($userId: ID!) {
    donationsByUser(userId: $userId) {
      id
      title
      description
      phoneContact
      updatedAt
      createdAt
      imageOne
      imageTwo
      imageThree
      imageFour
      imageFive
    }
  }
`;

const DELETE_DONATION = gql`
  mutation DeleteDonation($id: ID!) {
    deleteDonation(input: { id: $id }) {
      message
    }
  }
`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MyDonations() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!user) {
    navigate("*");
  }

  let variables = {};
  if (user) {
    variables = { userId: user.id };
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const { loading, error, data } = useQuery(GET_DATA, {
    variables,
  });

  const [deleteDonation] = useMutation(DELETE_DONATION);

  const handleDeleteDonation = async () => {
    if (selectedDonation) {
      try {
        const { data } = await deleteDonation({
          variables: {
            id: selectedDonation,
          },
        });

        if (data.deleteDonation.message) {
          setFormSuccess("Doação atualiza com sucesso!");
          setSnackbarOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }

        setSelectedDonation(null);
        setDialogOpen(false);
      } catch (error) {
        setFormError("Houve um erro ao excluir a doação. Tente novamente.");
        setSnackbarOpen(true);
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro :(</p>;

  const donations = data?.donationsByUser || [];

  const getDaysRemaining = (createdAt) => {
    const dateParts = createdAt.split(/[- :]/);
    const creationDate = new Date(
      Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2])
    );
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - creationDate.getTime());
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const daysRemaining = 30 - daysPassed;
    return daysRemaining;
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
          maxWidth: "90%",
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
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            marginTop: 50,
            marginBottom: 50,
            fontWeight: "bold",
          }}
        >
          Minhas doações
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "row",
            backgroundColor: "#FFF7E0",
          }}
        >
          <ReportProblemOutlinedIcon
            sx={{ marginRight: "10px", marginLeft: "10px" }}
            color="warning"
          />
          <Typography
            variant="body1"
            style={{
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Suas doações ficaram dísponiveis por 30 dias. Após esse período,
            elas serão excluídas automaticamente.
          </Typography>
        </Box>
        <Divider
          sx={{
            width: "100%",
            marginTop: 1,
          }}
        />
        <Grid container spacing={2} style={{ padding: 50 }}>
          {donations.map((donation) => {
            const daysRemaining = getDaysRemaining(donation.createdAt);
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={donation.id}>
                <Card
                  sx={{
                    maxHeight: 400,
                    maxWidth: 300,
                    marginBottom: 5,
                    padding: 1,
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="220"
                      image={donation.imageOne}
                      alt="Imagem da doação"
                      onClick={() => {
                        navigate(`/editar-doacao/${donation.id}`);
                      }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        style={{
                          textAlign: "center",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "300px",
                        }}
                      >
                        {donation.title.length > 12
                          ? donation.title.substring(0, 12) + " ..."
                          : donation.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      padding: "0 16px",
                    }}
                  >
                    <IconButton
                      component={Link}
                      to={`/editar-doacao/${donation.id}`}
                    >
                      <EditIcon style={{ color: "#000000" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedDonation(donation.id);
                        setDialogOpen(true);
                      }}
                    >
                      <DeleteForeverIcon style={{ color: "#E54203" }} />
                    </IconButton>
                  </div>
                  <Typography
                    variant="subtitle2"
                    color={daysRemaining <= 7 ? "error" : "textSecondary"}
                    style={{
                      textAlign: "center",
                      marginTop: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Sua doação expira em {daysRemaining} {daysRemaining > 1 ? "dias" : "dia"}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Footer />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir esta doação?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Não</Button>
          <Button onClick={handleDeleteDonation} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
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
    </>
  );
}
