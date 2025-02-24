import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MainMenu from "../../components/MainMenu";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ServiceOrder = () => {
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      await fetchBranches();
      await fetchCities();

      if (id) {
        await getData();
      }
    };

    fetchData();
  }, []);

  const getData = async () => {
    if (!user) {
      setLoading(false);
      setData({});
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ServiceOrder/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      console.log("Erro ao carregar os dados:\n\n", err);
      setLoading(false);
      setData({});
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Accounting/Branches`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = await response.json();

      setBranches(result);
    } catch (err) {
      console.error("Erro ao carregar as unidades:", err);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Accounting/Cities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = await response.json();
      setCities(result);
    } catch (err) {
      console.error("Erro ao carregar as unidades:", err);
    }
  };

  return (
    <MainMenu>
      <Box mt={4}>
        <FormGroup>
          <Typography variant="h5" gutterBottom>
            Informações da O.S.
          </Typography>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Protocolo"
                fullWidth
                size="small"
                value={data?.header?.protocol || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    header: { ...data.header, protocol: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="ID Tarefa"
                fullWidth
                size="small"
                value={data?.header?.idTask || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    header: { ...data.header, idTask: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Data Execução"
                type="date"
                fullWidth
                size="small"
                value={data?.header?.documentDate || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    header: { ...data.header, documentDate: e.target.value },
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Início"
                type="time"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={data?.header?.startTime || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    header: { ...data.header, startTime: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Fim"
                type="time"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={data?.header?.endTime || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    header: { ...data.header, endTime: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12} md={3}>
              <TextField
                select
                label="Unidade"
                size="small"
                fullWidth
                required
                value={data?.header?.branch || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    header: { ...data.header, branch: e.target.value },
                  })
                }
              >
                {branches.map((branch) => (
                  <MenuItem key={branch.code} value={branch.code}>
                    {branch.description}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControlLabel
                control={<Checkbox />}
                label="Invalidar Pontuação"
                value={data?.header?.unproductive || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    header: { ...data.header, unproductive: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Motivo"
                multiline
                fullWidth
                size="small"
                value={data?.header?.reasonUnproductive || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    header: { ...data.header, reasonUnproductive: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Link"
                fullWidth
                size="small"
                value={data?.header?.link || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    header: { ...data.header, link: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Box>

      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Dados do Cliente
            </Typography>
            <FormGroup>
              <Grid container spacing={2} sx={{ p: 1 }}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Código"
                    fullWidth
                    size="small"
                    value={data?.header?.customerCode || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        header: { ...data.header, customerCode: e.target.value },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    label="Nome"
                    fullWidth
                    size="small"
                    value={data?.header?.customerName || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        header: { ...data.header, customerName: e.target.value },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    label="Cidade"
                    size="small"
                    fullWidth
                    required
                    value={data?.header?.city || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        header: { ...data.header, city: e.target.value },
                      })
                    }
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.code} value={city.code}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Equipe
            </Typography>
            <FormGroup>
              <Grid container spacing={2} sx={{ p: 1 }}>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Código do Técnico"
                    fullWidth
                    size="small"
                    value={data?.header?.technician || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        header: { ...data.header, technician: e.target.value },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    label="Nome do Técnico"
                    fullWidth
                    size="small"
                    value={data?.header?.technicianName || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        header: { ...data.header, technicianName: e.target.value },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Código do Supervisor"
                    fullWidth
                    size="small"
                    value={data?.header?.supervisor || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        header: { ...data.header, supervisor: e.target.value },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField label="Nome do Supervisor" fullWidth size="small" value={data?.header?.supervisorName || ""} />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField label="Código do Auxiliar" fullWidth size="small" value={data?.header?.assistant || ""} />
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField label="Nome do Auxiliar" fullWidth size="small" value={data?.header?.assistantName || ""} />
                </Grid>
              </Grid>
            </FormGroup>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Serviços Executados</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Preço Revenda</TableCell>
                <TableCell>Pontos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.services?.length > 0 ? (
                data.services.map((service) => (
                  <TableRow>
                    <TableCell>{service.item}</TableCell>
                    <TableCell>{service.codeItem}</TableCell>
                    <TableCell>FTTH PJ - INSTALAÇÃO</TableCell>
                    <TableCell>{service.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(service.price)}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(service.priceResale)}
                    </TableCell>
                    <TableCell>{service.points}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center" }}>
                    Nenhum serviço encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Produtos</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Unidade</TableCell>
                <TableCell>Nº Série</TableCell>
                <TableCell>MAC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.products?.length > 0 ? (
                data.products.map((product) => (
                  <TableRow>
                    <TableCell>{product.item}</TableCell>
                    <TableCell>{product.codeItem}</TableCell>
                    <TableCell>FTTH PJ - INSTALAÇÃO</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.unitMeasurement}</TableCell>
                    <TableCell>{product.serialNumber}</TableCell>
                    <TableCell>{product.mac}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center" }}>
                    Nenhum produto encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MainMenu>
  );
};

export default ServiceOrder;
