import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
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

function NewDonation() {
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const theme = useTheme();
  const [categorieName, setcategorieName] = useState("");
  const [formError, setFormError] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [newProduct, setNewProduct] = useState(true);
  const [phone, setPhone] = useState("");
  const [usePhoneProfile, setUsePhoneProfile] = useState(false);

  const handleImageUpload = (images) => {
    setSelectedImages(images);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(tittle, description);
  };

  const handleChange = (event) => {
    setcategorieName(event.target.value);
  };

  const handleUsePhoneProfile = (event) => {
    setUsePhoneProfile(event.target.checked);
  };

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { categories } = data;

  const getStyles = (name, categorieName, theme) => {
    return {
      fontWeight:
        categorieName === name
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
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontFamily: "Inter, sans-serif" }}
        >
          O QUE VOCÊ ESTÁ ANUNCIANDO?
        </Typography>
        <Divider
          sx={{ width: "25%", borderWidth: "1px", borderBlockColor: "#000000" }}
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                label="Título"
                variant="outlined"
                value={tittle}
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
                minHeight="150px"
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
                  >
                    Categoria
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    single
                    value={categorieName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    sx={{ mt: 1 }}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category.id}
                        value={category.name}
                        style={getStyles(category.name, categorieName, theme)}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl component="fieldset" sx={{ width: "100%", maxWidth: "48%" }}>
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
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <WhatsAppIcon />
                          </InputAdornment>
                        ),
                      }}
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
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageUpload
              selectedImages={selectedImages}
              onImageUpload={handleImageUpload}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "#DDDDDD",
          marginBottom: "20px",
          marginTop: "100px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            flexDirection: "row",
            backgroundColor: "#FFF7E0",
            width: "100%",
            maxWidth: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "10px",
          }}
        >
          <ReportProblemOutlinedIcon
            sx={{ marginRight: "10px", marginLeft: "10px" }}
            color="warning"
          />
          <Typography
            gutterBottom
            sx={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
          >
            Não pedimos códigos por ligação, chat ou WhatsApp. Desconfie se
            alguém entrar em contato ou enviar comprovante de pagamento em nome
            da <strong>Joinville Doa</strong>.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "200px",
            flexDirection: "row",
            width: "100%",
            maxWidth: "30%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              width: "25%",
              margin: "0 60px",
            }}
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
          <Link to="/" passHref>
            <Button
              variant="contained"
              color="warning"
              sx={{
                width: "100%",
              }}
            >
              Cancelar
            </Button>
          </Link>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default NewDonation;
