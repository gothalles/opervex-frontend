// src/pages/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, redirectPath } = useContext(AuthContext); // Adicionado redirectPath
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(username, password)) {
      // Redireciona para a URL salva ou para a página inicial
      navigate(redirectPath || "/");
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Usuário"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 3 }}
        >
          Entrar
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
