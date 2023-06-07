import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import { v4 as uuidv4 } from "uuid";

export default function ImageUpload({ selectedImages, onImageUpload }) {
  const [logoImage, setLogoImage] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar o loading

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (selectedImages.length + files.length > 5) {
      return;
    }

    setIsLoading(true); // Ativar o loading

    const imageUrls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      formData.append("tags", ["donation", "product"]);
      formData.append("samples", `${uuidv4()}`);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      imageUrls.push(data.secure_url);
    }

    setIsLoading(false); // Desativar o loading

    onImageUpload([...selectedImages, ...imageUrls]);
    setLogoImage(false);
  };

  const handleImageRemove = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    onImageUpload(updatedImages);
  };

  return (
    <Box sx={{ width: "100%", marginLeft: 4 }}>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontFamily: "Inter, sans-serif", marginLeft: "15px" }}
      >
        Anexar Imagens
      </Typography>
      <Divider
        sx={{
          width: "100%",
          height: "2px",
          backgroundColor: "#DDDDDD",
          marginBottom: "20px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <Box
          component="label"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            flex: 1,
            backgroundColor: "#f3f3f3",
            border: "1px solid #DDDDDD",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "10px",
            position: "relative",
          }}
        >
          {logoImage && !isLoading && (
            <AddPhotoAlternateIcon sx={{ fontSize: "100%" }} />
          )}
          {!logoImage && selectedImages[0] && (
            <>
              <img
                src={selectedImages[0]}
                alt="Product"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
              <IconButton
                onClick={() => handleImageRemove(0)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  zIndex: 1,
                  "@media (max-width: 600px)": {
                    fontSize: "18px",
                    padding: "5px",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
          {isLoading && (
            <CircularProgress
              color="primary"
              size={40}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleImageUpload}
            disabled={!logoImage && selectedImages.length === 5}
          />
        </Box>
        <Grid container spacing={1} sx={{ flex: 1 }}>
          <Grid item xs={6}>
            <Box
              component="label"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80px",
                backgroundColor: "#f3f3f3",
                border: "1px solid #DDDDDD",
                borderRadius: "4px",
                cursor: "pointer",
                margin: "5px",
                position: "relative",
              }}
            >
              {selectedImages[1] ? (
                <>
                  <img
                    src={selectedImages[1]}
                    alt="Product"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                  <IconButton
                    onClick={() => handleImageRemove(1)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      zIndex: 1,
                      "@media (max-width: 600px)": {
                        fontSize: "18px",
                        padding: "5px",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <AddPhotoAlternateIcon />
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleImageUpload}
                disabled={selectedImages.length === 5}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              component="label"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80px",
                backgroundColor: "#f3f3f3",
                border: "1px solid #DDDDDD",
                borderRadius: "4px",
                cursor: "pointer",
                margin: "5px",
                position: "relative",
              }}
            >
              {selectedImages[2] ? (
                <>
                  <img
                    src={selectedImages[2]}
                    alt="Product"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                  <IconButton
                    onClick={() => handleImageRemove(2)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      zIndex: 1,
                      "@media (max-width: 600px)": {
                        fontSize: "18px",
                        padding: "5px",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <AddPhotoAlternateIcon />
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleImageUpload}
                disabled={selectedImages.length === 5}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              component="label"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80px",
                backgroundColor: "#f3f3f3",
                border: "1px solid #DDDDDD",
                borderRadius: "4px",
                cursor: "pointer",
                margin: "5px",
                position: "relative",
              }}
            >
              {selectedImages[3] ? (
                <>
                  <img
                    src={selectedImages[3]}
                    alt="Product"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                  <IconButton
                    onClick={() => handleImageRemove(3)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      zIndex: 1,
                      "@media (max-width: 600px)": {
                        fontSize: "18px",
                        padding: "5px",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <AddPhotoAlternateIcon />
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleImageUpload}
                disabled={selectedImages.length === 5}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              component="label"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80px",
                backgroundColor: "#f3f3f3",
                border: "1px solid #DDDDDD",
                borderRadius: "4px",
                cursor: "pointer",
                margin: "5px",
                position: "relative",
              }}
            >
              {selectedImages[4] ? (
                <>
                  <img
                    src={selectedImages[4]}
                    alt="Product"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                  <IconButton
                    onClick={() => handleImageRemove(4)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      zIndex: 1,
                      "@media (max-width: 600px)": {
                        fontSize: "18px",
                        padding: "5px",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <AddPhotoAlternateIcon />
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleImageUpload}
                disabled={selectedImages.length === 5}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={1}>
        {selectedImages.slice(5).map((image, index) => (
          <Grid item xs={6} key={index}>
            <CloudinaryContext cloudName="dpkix0ze1">
              <Transformation
                width="300"
                height="300"
                crop="fill"
                quality="auto"
                fetchFormat="auto"
              />
              <Image publicId={image} alt="Produto" />
            </CloudinaryContext>
            <IconButton
              onClick={() => handleImageRemove(index + 5)}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                "@media (max-width: 600px)": {
                  fontSize: "18px",
                  padding: "5px",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
