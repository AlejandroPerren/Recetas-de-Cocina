import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/slices/authSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const userId = useSelector((state: any) => state.auth.userId);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const goToAccount = () => {
    if (userId) {
      navigate(`/user`);
    }
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/home">
          Recetas De/Para Todos
        </Typography>

        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/recipe/create">
              Crear Receta
            </Button>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              aria-label="account"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={goToAccount}>Cuenta</MenuItem>
              <MenuItem onClick={handleLogOut}>Cerrar sesión</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup">
              Crear Cuenta
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Ingresar
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
