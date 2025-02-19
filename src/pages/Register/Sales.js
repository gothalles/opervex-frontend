import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, Typography, TextField, MenuItem, Button } from "@mui/material";

import MainMenu from "../../components/MainMenu";

export default function Sales() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const vendedores = ["João Silva", "Maria Oliveira", "Carlos Souza"];
  const servicos = ["Plano Básico", "Plano Premium", "Plano Empresarial"];

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Dados da Venda:", data);
    setTimeout(() => {
      setLoading(false);
      reset();
    }, 1000);
  };

  return (
    <MainMenu>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-lg p-6 shadow-lg bg-white">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Cadastro de Venda
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <TextField
                type="date"
                {...register("dataVenda")}
                label="Data da Venda"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField type="text" {...register("nomeCliente")} label="Nome do Cliente" fullWidth required />
              <TextField type="text" {...register("protocolo")} label="Protocolo" fullWidth required />
              <TextField select {...register("vendedor")} label="Vendedor" fullWidth required>
                {vendedores.map((v, index) => (
                  <MenuItem key={index} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </TextField>
              <TextField select {...register("servico")} label="Serviço" fullWidth required>
                {servicos.map((s, index) => (
                  <MenuItem key={index} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
              <TextField type="text" value="R$ 0,00" fullWidth InputProps={{ readOnly: true }} label="Valor Plano" />
              <TextField type="text" value="R$ 159,80" fullWidth InputProps={{ readOnly: true }} label="Valor Novo" />
              <TextField
                type="number"
                {...register("qtdLinhasMoveis")}
                label="Quantidade de Linhas Móveis"
                fullWidth
                required
                inputProps={{ min: 1 }}
                defaultValue="1"
              />
              <Button type="submit" disabled={loading} variant="contained" color="primary" fullWidth>
                {loading ? "Salvando..." : "Salvar Venda"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainMenu>
  );
}
