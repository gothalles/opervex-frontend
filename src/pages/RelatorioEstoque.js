// src/pages/RelatorioEstoque.js
import React from "react";
import { Typography, Container, Box } from "@mui/material";
import Layout from "../components/Layout";

const RelatorioEstoque = () => {
  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Relatório de Estoque
          </Typography>
          <Typography variant="body1">
            Aqui você pode visualizar o relatório de estoque.
          </Typography>
          {/* Adicione tabelas, gráficos ou outros componentes aqui */}
        </Box>
      </Container>
    </Layout>
  );
};

export default RelatorioEstoque;
