// src/pages/Home.js
import React from "react";
import { Typography, Container, Box } from "@mui/material";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Bem-vindo ao Opervex!
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Gerencie seus produtos, serviços, lançamentos e relatórios de forma
            fácil e eficiente.
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
