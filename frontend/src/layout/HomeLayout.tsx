import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "grey",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 2000, 
              bgcolor: "white",
              boxShadow: 3,
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Outlet />
          </Box>
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default HomeLayout;
