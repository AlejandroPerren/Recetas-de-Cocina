import { Box } from "@mui/material"
import Container from '@mui/material/Container';
import { Outlet, RouterProvider } from "react-router-dom";
import router from "../routes/routes";

const AuthLayout = () => {
  return (
    <Container
        maxWidth={false}
        sx={{
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 900,
            bgcolor: 'white',
            boxShadow: 3,
            p: 3,
            borderRadius: 2,
          }}
        >
         <Outlet/>   

        </Box>
      </Container>
  )
}

export default AuthLayout