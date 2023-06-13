import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useQuery, gql } from "@apollo/client";
import Footer from "../../components/Footer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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

export default function MyDonations() {
  const { user } = useAuth();
  let variables = {};

  if (user) {
    variables = { userId: user.id };
  }

  const { loading, error, data } = useQuery(GET_DATA, {
    variables,
  });

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro :(</p>;

  const donations = data?.donationsByUser || [];

  return (
    <>
      <Navbar />
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
        style={{
          marginBottom: 20,
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
                    {donation.title.length > 22
                      ? donation.title.substring(0, 22) + " ..."
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
                <IconButton>
                  <EditIcon
                    onClick={() => {
                      console.log("Edit");
                    }}
                    style={{ color: "#000000" }}
                  />
                </IconButton>
                <IconButton>
                  <DeleteForeverIcon
                    onClick={() => {
                      console.log("Delete");
                    }}
                    style={{ color: "#E50303" }}
                  />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </>
  );
}
