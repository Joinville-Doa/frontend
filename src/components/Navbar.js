import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 2px 4px rgba(77, 77, 252, 0.2)",
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isAuthenticated, logout } = useAuth();

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        elevation: 0,
        horizontal: "left",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated && (
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          component={Link}
          to="/minhas-doacoes"
        >
          Minhas doações
        </MenuItem>
      )}
      {!isAuthenticated && (
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          component={Link}
          to="/cadastro"
        >
          Registrar-se
        </MenuItem>
      )}
      {!isAuthenticated && (
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          component={Link}
          to="/login"
        >
          Entrar
        </MenuItem>
      )}
      {isAuthenticated && (
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#000000",
          }}
          component={Link}
          to="/nova-doacao"
        >
          Doar
        </MenuItem>
      )}
      {isAuthenticated && (
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#000000",
          }}
          component={Link}
          to="/meu-perfil"
        >
          Meu Perfil
        </MenuItem>
      )}
      {isAuthenticated && <MenuItem onClick={logout}>Sair</MenuItem>}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <Link to="/">
            <img
              src="/images/logo-1.png"
              alt="Logo Joinville doa"
              style={{ width: "150px", height: "auto" }}
            />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Ver mais"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="#000000"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              width: isAuthenticated ? "50%" : "30%",
            }}
          >
            {isAuthenticated ? (
              [
                <Typography
                  key="doar"
                  variant="body1"
                  component={Link}
                  to="/nova-doacao"
                  onClick={handleMenuClose}
                  className="menu-item"
                >
                  Doar
                </Typography>,
                <Typography
                  key="minhas-doacoes"
                  variant="body1"
                  component={Link}
                  to="/minhas-doacoes"
                  onClick={handleMenuClose}
                  className="menu-item"
                >
                  Minhas Doações
                </Typography>,
                <Typography
                  key="meu-perfil"
                  variant="body1"
                  component={Link}
                  to="/meu-perfil"
                  onClick={handleMenuClose}
                  className="menu-item"
                >
                  Meu Perfil
                </Typography>,
                <Typography
                  key="sair"
                  variant="body1"
                  component={Link}
                  to="/"
                  onClick={logout}
                  className="menu-item"
                >
                  Sair
                </Typography>,
              ]
            ) : (
              [
                <Typography
                  key="login"
                  variant="body1"
                  component={Link}
                  to="/login"
                  onClick={handleMenuClose}
                  className="menu-item"
                >
                  Entrar
                </Typography>,
                <Typography
                  key="cadastro"
                  variant="body1"
                  component={Link}
                  to="/cadastro"
                  onClick={handleMenuClose}
                  className="menu-item"
                >
                  Registrar-se
                </Typography>,
              ]
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>
      {renderMenu}
    </Box>
  );
}
