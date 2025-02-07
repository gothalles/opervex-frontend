// src/pages/Register/Product.js
import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Grid,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import Layout from "../../components/Layout";

// Dados de exemplo (substitua por uma chamada à API)
const produtosSalvos = [
  {
    id: 1,
    codigo: "162",
    descricao: "CAIXA DE PASSAGEM CFTV VBOX 1100 - INTELBRAS",
  },
  { id: 2, codigo: "163", descricao: "CABO DE REDE CAT6 - 100M" },
  { id: 3, codigo: "164", descricao: "FONTE 12V 2A - INTELBRAS" },
];

const Product = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    descricao: "",
    unidadeMedida: "UN",
    categoria: "009",
    subcategoria: "",
    controleSerie: "",
    controleMAC: "",
    fabricante: "",
    modelo: "",
    codigoExterno: "",
    inativo: false,
  });

  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  useEffect(() => {
    if (termoPesquisa) {
      const resultados = produtosSalvos.filter(
        (produto) =>
          produto.codigo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
          produto.descricao.toLowerCase().includes(termoPesquisa.toLowerCase())
      );
      setProdutosFiltrados(resultados);
    } else {
      setProdutosFiltrados([]);
    }
  }, [termoPesquisa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  const handleSelecionarProduto = (produto) => {
    setFormData({
      ...formData,
      codigo: produto.codigo,
      descricao: produto.descricao,
    });
    setTermoPesquisa("");
    setProdutosFiltrados([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    alert("Produto cadastrado com sucesso!");
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Cadastro de Produto
          </Typography>

          {/* Campo de Pesquisa */}
          <Box sx={{ mb: 4 }}>
            <TextField
              label="Pesquisar Produto"
              value={termoPesquisa}
              onChange={handlePesquisaChange}
              fullWidth
            />
            {produtosFiltrados.length > 0 && (
              <Paper sx={{ mt: 1, maxHeight: 150, overflow: "auto" }}>
                <List>
                  {produtosFiltrados.map((produto) => (
                    <ListItem
                      button
                      key={produto.id}
                      onClick={() => handleSelecionarProduto(produto)}
                    >
                      <ListItemText
                        primary={`${produto.codigo} - ${produto.descricao}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          {/* Formulário de Cadastro */}
          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Coluna 1 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Código"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Descrição"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Unidade de Medida"
                    name="unidadeMedida"
                    value={formData.unidadeMedida}
                    onChange={handleChange}
                    fullWidth
                    required
                    select
                  >
                    <MenuItem value="UN">UN - Unidade</MenuItem>
                    {/* Adicione outras unidades de medida aqui */}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Subcategoria"
                    name="subcategoria"
                    value={formData.subcategoria}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Controle nº Série"
                    name="controleSerie"
                    value={formData.controleSerie}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                {/* Coluna 2 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Controle MAC"
                    name="controleMAC"
                    value={formData.controleMAC}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Fabricante"
                    name="fabricante"
                    value={formData.fabricante}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Modelo"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Código Externo"
                    name="codigoExterno"
                    value={formData.codigoExterno}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Inativo"
                    name="inativo"
                    value={formData.inativo}
                    onChange={handleChange}
                    fullWidth
                    select
                  >
                    <MenuItem value={false}>Não</MenuItem>
                    <MenuItem value={true}>Sim</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              {/* Botão de Salvar */}
              <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button type="submit" variant="contained" color="primary">
                  Salvar
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default Product;
