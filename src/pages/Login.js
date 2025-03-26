// src/pages/Login.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Row, Button, Container, Col, Form } from "react-bootstrap";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, redirectPath, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) navigate(redirectPath || "/");

  const handleLogin = async () => {
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    if (success) {
      navigate(redirectPath || "/");
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <>
      <Container fluid className="vh-100 d-flex flex-column">
        {/* Conteúdo principal centralizado */}
        <Row className="flex-grow-1 d-flex justify-content-center align-items-center">
          <Col md={6} className="d-flex align-items-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Login Illustration"
            />
          </Col>
          <Col md={4}>
            <Form className="p-4 border rounded shadow bg-light">
              <h3 className="text-center mb-4">Login</h3>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Check type="checkbox" label="Lembrar-me" className="mb-3" />
              <Button variant="primary" className="w-100" onClick={handleLogin}>
                {loading ? "Login..." : "Entrar"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
