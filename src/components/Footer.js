import React from "react";
import { Typography } from "@mui/material";

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function Footer() {
  return (
    <>
      <footer style={styles.footer}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Joinville Doa. Todos os direitos reservados.
        </Typography>
      </footer>
    </>
  );
}

export default Footer;
