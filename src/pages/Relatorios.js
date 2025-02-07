// src/pages/Relatorios.js
import React from "react";
import { Typography, Container, Box, Tabs, Tab } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import Layout from "../components/Layout";

const Relatorios = () => {
  const location = useLocation();

  // Determina a aba ativa com base na URL
  const getActiveTab = () => {
    if (location.pathname.includes("movimentacao")) {
      return 1;
    }
    return 0;
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Relatórios
          </Typography>

          {/* Menu de abas */}
          <Tabs value={getActiveTab()} aria-label="Menu de Relatórios">
            <Tab label="Estoque" component={Link} to="/relatorios/estoque" />
            <Tab
              label="Movimentação"
              component={Link}
              to="/relatorios/movimentacao"
            />
          </Tabs>

          {/* Conteúdo das subpáginas */}
          <Box sx={{ mt: 3 }}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Relatorios;
