import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 3, 
        textAlign: 'center', 
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container>
        <Typography variant="body1">
          Todos los derechos reservados
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Realizado con ❤️ por Alejandro Perren
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link href="www.linkedin.com/in/ale-perren-52094a214" target="_blank" sx={{ color: 'inherit', textDecoration: 'none' }}>
            Conéctate conmigo en LinkedIn
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
