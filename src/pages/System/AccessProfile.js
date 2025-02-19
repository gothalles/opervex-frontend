import React from "react";
import MainMenu from "../../components/MainMenu";
import { Button, TextField, Typography, Box } from "@mui/material";

const AccessProfile = () => {
  return (
    <MainMenu>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Perfil de Acesso
        </Typography>
        <Box sx={{ marginBottom: 3 }}>
          <Button variant="contained" sx={{ marginRight: 1 }}>
            Novo
          </Button>
          <Button variant="contained" sx={{ marginRight: 1 }}>
            Alterar
          </Button>
          <Button variant="contained" sx={{ marginRight: 1 }}>
            Salvar
          </Button>
          <Button variant="contained" sx={{ marginRight: 1 }}>
            Cancelar
          </Button>
          <Button variant="contained">Eliminar</Button>
        </Box>
        <Box sx={{ marginBottom: 3 }}>
          <TextField label="Usuário" variant="outlined" sx={{ marginRight: 2 }} />
          <TextField label="Código" variant="outlined" sx={{ marginRight: 2 }} />
          <TextField label="Nome" variant="outlined" />
        </Box>
        <Typography variant="h5" gutterBottom>
          Profiles
        </Typography>
      </Box>
    </MainMenu>
  );
};

export default AccessProfile;
