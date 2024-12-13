import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey",
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "white",
            boxShadow: 3,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Outlet />
        </Box>
      </Container>
      <Footer/>
    </>
  );   
};

export default HomeLayout;
