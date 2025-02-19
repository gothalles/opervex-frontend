// src/Dashboard/Dashboard.js
import React from "react";
import { Typography, Container, Box } from "@mui/material";
import MainMenu from "../../components/MainMenu";

const Dashboard = () => {
  return (
    <MainMenu>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Dashboard
          </Typography>
        </Box>
      </Container>
    </MainMenu>
  );
};

export default Dashboard;
