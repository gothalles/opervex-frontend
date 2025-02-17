// src/pages/Register/Service.js
import React from "react";
import { Typography, TextField, Button, Container, Box } from "@mui/material";
import MainMenu from "../../components/MainMenu";

const Service = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Serviço cadastrado com sucesso!");
  };

  return (
    <MainMenu>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Cadastro de Serviço
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Nome do Serviço" fullWidth margin="normal" required />
            <TextField label="Preço" type="number" fullWidth margin="normal" required />
            <TextField label="Descrição" fullWidth margin="normal" multiline rows={4} />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Salvar
            </Button>
          </form>
        </Box>
      </Container>
    </MainMenu>
  );
};

export default Service;
