import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import ImageUpload from "../../components/ImageUpload";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Checkbox } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

const CREATE_DONATION = gql`
  mutation CreateDonation($input: CreateDonationInput!) {
    createDonation(input: $input) {
      donation {
        title
        phoneContact
        userId
        description
        newProduct
        imageOne
        imageTwo
        imageThree
        imageFour
        imageFive
      }
      message
    }
  }
`;

function NewDonation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const theme = useTheme();
  const [categoryId, setCategoryId] = useState("");
  const [formError, setFormError] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [newProduct, setNewProduct] = useState(true);
  const [phoneContact, setPhoneContact] = useState("");
  const [usePhoneProfile, setUsePhoneProfile] = useState(false);

  const handleImageUpload = (images) => {
    setSelectedImages(images);
  };

  const handlePhoneChange = (event) => {
    const newValue = formatPhone(event.target.value);
    setPhoneContact(newValue);
  };

  const formatPhone = (value) => {
    let newValue = value.replace(/\D/g, "");

    newValue = newValue.replace(/(\d{2})(\d)/, "($1) $2").slice(0, 14);
    newValue = newValue.replace(/(\d{5})(\d)/, "$1-$2");

    return newValue;
  };

  const [createDonation] = useMutation(CREATE_DONATION);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !categoryId || !phoneContact) {
      setFormError("Preencha todos os campos obrigatórios.");
      return;
    }

    setFormError("");

    const input = {
      title,
      description,
      categoryId,
      phoneContact,
      newProduct,
      userId: "3",
      imageOne: selectedImages[0],
      imageTwo: selectedImages[1],
      imageThree: selectedImages[2],
      imageFour: selectedImages[3],
      imageFive: selectedImages[4],
    };

    try {
      const { data } = await createDonation({
        variables: { input },
      });

      console.log("data.createDonation", data.createDonation);
    } catch (error) {
      console.log("Error creating donation", error);
    }
  };

  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleUsePhoneProfile = (event) => {
    setUsePhoneProfile(event.target.checked);
  };

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { categories } = data;

  const getStyles = (name, categoryName, theme) => {
    return {
      fontWeight:
        categoryName === name
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightRegular,
    };
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
          padding: "0 20px",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
            maxWidth: "100%",
            marginBottom: "10px",
          }}
        >
          O QUE VOCÊ ESTÁ ANUNCIANDO?
        </Typography>
        <Divider
          sx={{
            width: "100%",
            marginBottom: "20px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          padding: "0 20px",
          marginLeft: "150px",
          marginRight: "150px",
        }}
      >
        <Grid>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                label="Título"
                variant="outlined"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                margin="normal"
                fullWidth
                required
              />
              <TextField
                type="text"
                label="Descrição"
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={7}
                multiline
                fullWidth
                required
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
                <FormControl sx={{ width: "100%", maxWidth: "48%" }}>
                  <InputLabel
                    id="demo-multiple-name-label"
                    sx={{ fontFamily: "Inter, sans-serif" }}
                    required
                  >
                    Categoria
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={categoryId}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    sx={{ mt: 1 }}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                        style={getStyles(category.id, categoryId, theme)}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  component="fieldset"
                  sx={{ width: "100%", maxWidth: "48%" }}
                >
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
                    Produto
                  </Typography>
                  <RadioGroup
                    value={newProduct ? "new" : "used"}
                    onChange={(event) =>
                      event.target.value === "new"
                        ? setNewProduct(true)
                        : setNewProduct(false)
                    }
                    row
                  >
                    <FormControlLabel
                      value="new"
                      control={<Radio />}
                      label="Novo"
                    />
                    <FormControlLabel
                      value="used"
                      control={<Radio />}
                      label="Usado"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "right",
                    marginTop: "5px",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <TextField
                      type="text"
                      label="Contato"
                      variant="outlined"
                      value={phoneContact}
                      onChange={handlePhoneChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <WhatsAppIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      required
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={usePhoneProfile}
                          onChange={handleUsePhoneProfile}
                          style={{ marginLeft: "10px" }}
                        />
                      }
                      label="Usar Telefone do meu perfil"
                    />
                  </Box>
                </Box>
              </Box>
              <Grid marginTop={4}>
                <ImageUpload
                  selectedImages={selectedImages}
                  onImageUpload={handleImageUpload}
                />
              </Grid>
              <Divider
                sx={{
                  width: "100%",
                  marginTop: "50px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                  flexDirection: "row",
                  backgroundColor: "#FFF7E0",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "20px",
                  padding: "10px",
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
                    textAlign: "center",
                  }}
                >
                  Não pedimos códigos por ligação, chat ou WhatsApp. Desconfie
                  se alguém entrar em contato
                  em nome da <strong>Joinville Doa</strong>.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 2,
                  marginBottom: 10,
                }}
              >
                <Button variant="contained" color="primary" type="submit" style={{minWidth: "150px"}}>
                  Salvar
                </Button>
                <Link to={"/"}>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ marginLeft: 10 }}
                    style={{minWidth: "150px"}}
                  >
                    Cancelar
                  </Button>
                </Link>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px",
        }}
      ></Box>
      <Footer />
    </>
  );
}

export default NewDonation;
