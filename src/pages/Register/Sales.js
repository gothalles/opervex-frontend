import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Typography, TextField, MenuItem, Button, Box, Paper, Grid } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import CurrencyInput from "../../components/CurrencyInput";
import DynamicTable from "../../components/DynamicTable";

export default function Sales() {
  const { register, handleSubmit, reset, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [valorPlano, setValorPlano] = useState("");
  const [valorNovo, setValorNovo] = useState("");
  const [dados, setDados] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const layout = [
    {
      key: "code",
      label: "Código",
      type: "number",
      visible: true,
      filterOptions: ["=", "<>", ">", ">=", "<", "<="],
    },
    {
      key: "dataVenda",
      label: "Data da Venda",
      type: "date",
      visible: true,
      filterOptions: ["=", "<>", ">", ">=", "<", "<="],
    },
    {
      key: "nomeCliente",
      label: "Nome do Cliente",
      type: "string",
      visible: true,
      filterOptions: ["equal", "contain", "startWith", "endWith"],
    },
    {
      key: "protocolo",
      label: "Protocolo",
      type: "string",
      visible: true,
      filterOptions: ["equal", "contain", "startWith", "endWith"],
    },
    {
      key: "servico",
      label: "Serviço",
      type: "string",
      visible: true,
      filterOptions: ["equal", "contain", "startWith", "endWith"],
    },
    {
      key: "valorPlano",
      label: "Valor Plano",
      type: "currency",
      visible: true,
      filterOptions: ["equal", "contain", "startWith", "endWith"],
    },
    {
      key: "valorNovo",
      label: "Valor Novo",
      type: "currency",
      visible: true,
      filterOptions: ["equal", "contain", "startWith", "endWith"],
    },
    {
      key: "vendedor",
      label: "Vendedor",
      type: "string",
      visible: true,
      filterOptions: ["equal", "contain", "startWith", "endWith"],
    },
    {
      key: "qtdLinhasMoveis",
      label: "Linhas Móveis",
      type: "int",
      visible: true,
      filterOptions: ["=", "<>", ">", ">=", "<", "<="],
    },
    {
      key: "operadora",
      label: "Operadora",
      type: "string",
      visible: true,
      filterOptions: ["equal", "contain", "startWith", "endWith"],
    },
  ];

  const vendedores = ["João Silva", "Maria Oliveira", "Carlos Souza"];
  const servicos = ["Plano Básico", "Plano Premium", "Plano Empresarial"];
  const operadoras = ["Tim", "Vivo", "Claro", "Oi", "Outras"];

  // Watch the value of qtdLinhasMoveis
  const qtdLinhasMoveis = useWatch({
    control,
    name: "qtdLinhasMoveis",
    defaultValue: 0,
  });

  const onSubmit = (data) => {
    setLoading(true);

    dados.push({ ...data, code: dados.length + 1, valorPlano, valorNovo });

    setTimeout(() => {
      setLoading(false);
      reset();
      setValorPlano("");
      setValorNovo("");
    }, 1000);
  };

  return (
    <MainMenu>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Cadastro de Venda
        </Typography>
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("dataVenda", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required type="text" label="Protocolo" fullWidth {...register("protocolo", { required: true })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="text"
                  label="Nome do Cliente"
                  fullWidth
                  {...register("nomeCliente", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Vendedor" fullWidth required {...register("vendedor", { required: true })}>
                  {vendedores.map((v, index) => (
                    <MenuItem key={index} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Serviço" fullWidth required {...register("servico", { required: true })}>
                  {servicos.map((s, index) => (
                    <MenuItem key={index} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                <CurrencyInput value={valorPlano} onChange={setValorPlano} label="Valor Plano" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CurrencyInput value={valorNovo} onChange={setValorNovo} label="Valor Novo" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  label="Quantidade de Linhas Móveis"
                  fullWidth
                  required
                  inputProps={{ min: 0 }}
                  defaultValue="0"
                  {...register("qtdLinhasMoveis", {
                    required: true,
                    valueAsNumber: true,
                    min: 0,
                  })}
                />
              </Grid>
              {/* Conditionally render the "Operadora" field */}
              {qtdLinhasMoveis > 0 && (
                <Grid item xs={12} sm={6}>
                  <TextField select label="Operadora" fullWidth required {...register("operadora", { required: true })}>
                    {operadoras.map((s, index) => (
                      <MenuItem key={index} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" disabled={loading} variant="contained" color="primary" fullWidth>
                  {loading ? "Salvando..." : "Salvar Venda"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      <Box>
        {/* Tabela Dinâmica */}
        <DynamicTable
          layout={layout || []}
          dados={dados || []}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Box>
    </MainMenu>
  );
}
