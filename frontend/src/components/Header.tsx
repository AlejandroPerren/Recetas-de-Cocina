import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Modal, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogOut: () => void;
}


const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogOut }) => {
  isLoggedIn = true;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Recetas De/Para Todos
        </Typography>

        {isLoggedIn ? (
          <>
            <Button 
              color="inherit" 
              component={Link} 
              to="/mis-recetas" 
            >Mis recetas</Button>
            <Button color="inherit" onClick={handleModalOpen}>
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
              <MenuItem onClick={() => { setModalContent('Cuenta'); handleModalOpen(); }}>Cuenta</MenuItem>
              <MenuItem onClick={() => { onLogOut(); handleMenuClose(); }}>Cerrar sesión</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/crear-cuenta">
              Crear Cuenta
            </Button>
            <Button color="inherit" component={Link} to="/ingresar">
              Ingresar
            </Button>
          </>
        )}

        
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
            bgcolor: 'background.paper', padding: 4, borderRadius: 2, boxShadow: 24 
          }}>
            <Typography id="modal-title" variant="h6">
              {modalContent}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {modalContent === 'Cuenta' ? 'Aquí puedes gestionar tu cuenta' : 'Contenido del modal'}
            </Typography>
            <Button variant="outlined" onClick={handleModalClose} sx={{ mt: 2 }}>
              Cerrar
            </Button>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
