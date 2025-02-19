import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Typography, TextField, MenuItem, Button, Box, Paper, Grid } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import CurrencyInput from "../../components/CurrencyInput";

export default function Sales() {
  const { register, handleSubmit, reset, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [valorPlano, setValorPlano] = useState("");
  const [valorNovo, setValorNovo] = useState("");

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
    //console.log("Dados da Venda:", { ...data, valorPlano, valorNovo });
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
    </MainMenu>
  );
}
