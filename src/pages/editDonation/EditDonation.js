import React, { useState, useEffect } from "react";
import { useMutation, useQuery, gql, useParam } from "@apollo/client";
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
import { useAuth } from "../../components/AuthProvider";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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

const UPDATE_DONATION = gql`
  mutation UpdateDonation($input: UpdateDonationInput!) {
    updateDonation(input: $input) {
      donation {
        title
        phoneContact
        userId
        description
        categoryId
        hasWhatsapp
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditDonation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [newProduct, setNewProduct] = useState(true);
  const [phoneContact, setPhoneContact] = useState("");
  const [hasWhatsapp, setHasWhatsapp] = useState(false);
  const [usePhoneProfile, setUsePhoneProfile] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!user) {
    navigate("*");
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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

  const [updateDonation] = useMutation(UPDATE_DONATION);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedImages.every((image) => image === null)) {
      setFormError("Necessário incluir pelo menos uma imagem.");
      setSnackbarOpen(true);
      return;
    }

    if (!selectedImages[0]) {
      const updatedImages = [...selectedImages];
      updatedImages[0] = selectedImages.find((image) => image !== null);
      setSelectedImages(updatedImages);
    }

    if (!title || !description || !categoryId || !phoneContact) {
      setFormError("Preencha todos os campos obrigatórios.");
      return;
    }

    setFormError("");

    const input = {
      id,
      title,
      description,
      categoryId,
      phoneContact,
      newProduct,
      hasWhatsapp,
      userId: user.id,
      imageOne: selectedImages[0],
      imageTwo: selectedImages[1],
      imageThree: selectedImages[2],
      imageFour: selectedImages[3],
      imageFive: selectedImages[4],
    };

    try {
      const { data } = await updateDonation({
        variables: { input },
      });
      setFormSuccess("Doação atualiza com sucesso!");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/minhas-doacoes");
        window.location.reload();
      }, 2000);
    } catch (error) {
      setFormError(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleUsePhoneProfile = (event) => {
    const checked = event.target.checked;
    setUsePhoneProfile(checked);
    if (checked) {
      const formattedPhone = formatPhone(user.phone || "");
      setPhoneContact(formattedPhone);
    } else {
      setPhoneContact("");
    }
  };

  const handleHasWhatsapp = (event) => {
    const checked = event.target.checked;
    setHasWhatsapp(checked);
  };

  const { loading, error, data } = useQuery(GET_DONATION, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.donation) {
      const donation = data.donation;
      setTitle(donation.title);
      setDescription(donation.description);
      setCategoryId(donation.categoryId);
      setPhoneContact(donation.phoneContact);
      setNewProduct(donation.newProduct);
      setHasWhatsapp(donation.hasWhatsapp);
      setSelectedImages([
        donation.imageOne,
        donation.imageTwo,
        donation.imageThree,
        donation.imageFour,
        donation.imageFive,
      ]);
    }
  }, [data]);

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
          justifyContent: "center",
          mt: 4,
          padding: "0 20px",
          marginLeft: "150px",
          marginRight: "150px",
          marginBottom: "250px",
        }}
      >
        <Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              backgroundColor: "#F5F5F5",
              opacity: "0.8",
              borderRadius: "10px",
              border: "1px solid #E0E0E0",
              padding: "40px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "bold",
                  color: "#000000",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Editar doação
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
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
                      label="Usar Telefone do meu cadastro"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={hasWhatsapp}
                          onChange={handleHasWhatsapp}
                          style={{ marginLeft: "10px" }}
                        />
                      }
                      label="Possui WhatsApp"
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
                  se alguém entrar em contato em nome da{" "}
                  <strong>Joinville Doa</strong>.
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
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ minWidth: "150px" }}
                >
                  Salvar
                </Button>
                <Link to={"/minhas-doacoes"}>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ marginLeft: 10 }}
                    style={{ minWidth: "150px" }}
                  >
                    Cancelar
                  </Button>
                </Link>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
      <Footer />
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

export default EditDonation;
