import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
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
import Navbar from "../../components/Navbar";
import { useQuery, gql, useMutation } from "@apollo/client";
import Footer from "../../components/Footer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

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

export default function MyDonations() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  let variables = {};

  if (user) {
    variables = { userId: user.id };
  }

  const { loading, error, data } = useQuery(GET_DATA, {
    variables,
  });

  const [deleteDonation] = useMutation(DELETE_DONATION);

  const handleEditDonation = (donationId) => {
    navigate(`/editar-doacao/${donationId}`);
  };

  const handleDeleteDonation = async () => {
    if (selectedDonation) {
      try {
        const { data } = await deleteDonation({
          variables: {
            id: selectedDonation,
          },
        });

        if (data.deleteDonation.message) {
          window.location.reload();
          console.log(data.deleteDonation.message);
        }

        setSelectedDonation(null);
        setDialogOpen(false);
      } catch (error) {
        // Handle error
        console.error("Failed to delete donation:", error);
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro :(</p>;

  const donations = data?.donationsByUser || [];

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
        <Divider
          sx={{
            width: "100%",
          }}
        />
        <Grid container spacing={2} style={{ padding: 50 }}>
          {donations.map((donation) => (
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
              </Card>
            </Grid>
          ))}
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
    </>
  );
}
