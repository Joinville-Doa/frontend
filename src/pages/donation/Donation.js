import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useMutation, useQuery, gql } from "@apollo/client";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useParams, useNavigate, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  InputAdornment,
} from "@mui/material";

const GET_DONATION = gql`
  query GetDonation($id: ID!) {
    donation(id: $id) {
      id
      title
      description
      phoneContact
      categoryId
      hasWhatsapp
      newProduct
      imageOne
      imageTwo
      imageThree
      imageFour
      imageFive
    }
    categories {
      id
      name
    }
  }
`;

export default function Donation() {
  const { id } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { loading, error, data } = useQuery(GET_DONATION, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.donation) {
      const donation = data.donation;
      const category = data.categories.find(
        (category) => category.id === donation.categoryId
      );
    }
  }, [data]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro :(</p>;

  const donation = data?.donation || {};
  const images = [
    donation.imageOne,
    donation.imageTwo,
    donation.imageThree,
    donation.imageFour,
    donation.imageFive,
  ].filter(Boolean);

  const formatPhone = (value) => {
    let newValue = value.replace(/\D/g, "");

    newValue = newValue.replace(/(\d{2})(\d)/, "($1) $2").slice(0, 14);
    newValue = newValue.replace(/(\d{5})(\d)/, "$1-$2");

    return newValue;
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setDialogOpen(true);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "row",
          mt: 4,
          maxWidth: "60%",
          margin: "100px auto",
          backgroundColor: "rgba(245, 245, 245, 0.8)",
          border: "1px solid #E0E0E0",
          borderRadius: "10px",
          p: 4,
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            mt: 2,
            width: "30%",
            "@media (max-width: 600px)": {
              width: "100%",
            },
          }}
        >
          <ImageList
            cols={1}
            rowHeight={250}
            sx={{
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              width: "100%",
              overflow: "hidden",
            }}
          >
            {images.slice(0, 1).map((image, index) => (
              <ImageListItem
                key={index}
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={image}
                  alt={`Imagem ${index + 1}`}
                  style={{ marginBottom: 8, cursor: "pointer", width: "100%" }}
                  onClick={() => handleImageClick(index)}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <ImageList
            cols={4}
            rowHeight={125}
            sx={{
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            {images.slice(1).map((image, index) => (
              <ImageListItem
                key={index}
                cols={1}
                rows={1}
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={image}
                  alt={`Imagem ${index + 2}`}
                  style={{ marginRight: 8, cursor: "pointer" }}
                  onClick={() => handleImageClick(index + 1)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Box sx={{ width: "60%", pr: 2, marginLeft: "25px" }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {donation.title}
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              flexDirection: "column",
              mt: 2,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Descrição
            </Typography>
            <Typography variant="body1">{donation.description}</Typography>
          </Box>
          <Divider sx={{ width: "100%" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              flexDirection: "column",
              mt: 2,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Contato
            </Typography>
            <Typography variant="body1">
              {formatPhone(donation.phoneContact)}
            </Typography>
            <Typography variant="body1">
              {donation.hasWhatsapp ? (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: "10px" }}
                  onClick={() => {
                    const message = encodeURIComponent(
                      "Olá, eu vi o anúncio da sua doação no site Joinville Doa. Gostaria de saber se ainda está disponível." + "\n\n" + "Título: " + donation.title + "\n" + "Link: " + window.location.href
                    );
                    const url = `https://api.whatsapp.com/send?phone=${donation.phoneContact}&text=${message}`;
                    window.open(url, "_blank");
                  }}
                >
                  Entrar em contato via WhatsApp <WhatsAppIcon style={{marginLeft: "10px"}}/>
                </Button>
              ) : (
                <>
                  <span style={{ fontStyle: "italic" }}>
                    (Este número não possui WhatsApp)
                  </span>
                </>
              )}
            </Typography>
          </Box>
          <Divider
            sx={{ width: "100%", marginTop: "25px", marginBottom: "25px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              mt: 2,
              maxWidth: "80%",
            }}
          >
            <ReportProblemOutlinedIcon
              sx={{ marginRight: "10px", marginLeft: "10px" }}
              color="warning"
            />
            <Typography
              gutterBottom
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              Não nós responsabilizamos por fretes ou algo relacionado a entrega
              de itens anunciado em nosso site, <strong>Joinville Doa</strong>.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={dialogOpen}
        fullWidth
        maxWidth="lg"
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16, color: "white" }}
          onClick={handleCloseDialog}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          sx={{ position: "absolute", top: "50%", left: 16, color: "white" }}
          onClick={handlePreviousImage}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          sx={{ position: "absolute", top: "50%", right: 16, color: "white" }}
          onClick={handleNextImage}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
        <DialogContent
          style={{
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <img
            src={images[currentImageIndex]}
            alt={`Imagem ${currentImageIndex + 1}`}
            style={{
              width: "80%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
}
