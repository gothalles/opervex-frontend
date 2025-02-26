import React, { useState } from "react";
import * as XLSX from "xlsx";
import MainMenu from "../components/MainMenu";
import { Typography, Box, Paper, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import { useAuth } from "../context/AuthContext";
import DynamicTable from "../components/DynamicTable";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ExcelUploader = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { user } = useAuth(); // Pega usuário do contexto

  const layout = [
    {
      key: "protocol",
      label: "Protocolo",
      type: "string",
      visible: true,
    },
    {
      key: "idTask",
      label: "ID Tarefa",
      type: "string",
      visible: true,
    },
    {
      key: "city",
      label: "Cidade",
      type: "string",
      visible: true,
    },
    {
      key: "customer",
      label: "Cliente",
      type: "string",
      visible: true,
    },
    {
      key: "finishDate",
      label: "Data Finalizado",
      type: "date",
      visible: true,
    },
    {
      key: "service",
      label: "Serviço",
      type: "string",
      visible: true,
    },
    {
      key: "resolved",
      label: "Serviço Resolvido?",
      type: "boolean",
      visible: true,
    },
    {
      key: "tpCustomer",
      label: "Tipo Pessoa",
      type: "string",
      visible: true,
    },

    {
      key: "priceService",
      label: "Valor Serviço Principal",
      type: "currency",
      visible: true,
    },
    {
      key: "priceTotal",
      label: "Valor Total",
      type: "currency",
      visible: true,
    },
    {
      key: "priceReview",
      label: "Valor Total Sem Rev",
      type: "currency",
      visible: true,
    },
    {
      key: "link",
      label: "URL umov",
      type: "string",
      visible: false,
    },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      setLoading(true);

      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convertendo para JSON
      const parsedData = XLSX.utils.sheet_to_json(sheet, { raw: false });

      const dataResult = [];

      parsedData.forEach((item) => {
        const arrayColl = Object.keys(item);
        const arrayRow = Object.values(item);
        const dataRow = {};
        const valueRow = null;

        layout.forEach((layoutItem) => {
          const index = arrayColl.findIndex((item) => item === layoutItem.label);
          const column = arrayColl[index];

          if (index) {
            // Gerar a referência da célula (exemplo: A1, B2, etc.)
            const cellAddress = XLSX.utils.encode_cell({ r: index + 1, c: Object.keys(item).indexOf(column) });

            // Pegar a célula correspondente na planilha
            const cell = sheet[cellAddress];

            if (cell && layoutItem.type === "date") {
              const dateInfo = XLSX.SSF.parse_date_code(cell.v);

              if (dateInfo.D != 0) {
                // Criar um objeto Date manualmente
                const jsDate = new Date(
                  dateInfo.y, // Ano
                  dateInfo.m - 1, // Mês (subtrair 1 porque JavaScript usa 0-11 para meses)
                  dateInfo.d,
                  Math.floor(dateInfo.T / 3600000), // Dia // Horas
                  Math.floor((dateInfo.T % 3600000) / 60000), // Minutos
                  Math.floor((dateInfo.T % 60000) / 1000) // Segundos
                );

                dataRow[layoutItem.key] = jsDate.toISOString().replace("T", " ").split(".")[0];
              }
            } else if (layoutItem.type === "boolean") {
              dataRow[layoutItem.key] = arrayRow[index] === "Sim" || arrayRow[index] === "Yes" ? true : false;
            } else if (layoutItem.type === "currency") {
              dataRow[layoutItem.key] = arrayRow[index] === undefined ? 0 : arrayRow[index];
              dataRow[layoutItem.key] = String(dataRow[layoutItem.key]).replace(",", "");
            } else {
              dataRow[layoutItem.key] = arrayRow[index];
            }
          }
        });

        if (dataRow.protocol) {
          dataResult.push(dataRow);
        }
      });

      setData(dataResult);
      setLoading(false);
    };
  };

  const handleSave = async (event) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/import/AnalyticSummary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    setData([]);
  };

  return (
    <MainMenu>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Importação de Excel - Unifique - Resumo Analítio
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Box display="flex" gap={2} mb={2} spacing={2}>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              {loading ? "Carregando" : "Upload files"}
              <VisuallyHiddenInput accept=".xls,.xlsx" type="file" onChange={handleFileUpload} />
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              sx={{ display: data.length == 0 ? "none" : "inline-block" }}
            >
              Salvar
            </Button>
          </Box>
          <Box>
            {/* Tabela Dinâmica */}
            <DynamicTable
              layout={layout || []}
              dados={data || []}
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
            />
          </Box>
        </Paper>
      </Box>
    </MainMenu>
  );
};

export default ExcelUploader;
