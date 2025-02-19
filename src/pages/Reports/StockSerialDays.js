// pages/Reports/StockSerialDays.js
import React from "react";
import { Typography } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import DynamicReport from "../../components/DynamicReport";

const StockSerialDays = () => {
  return (
    <MainMenu>
      <Typography variant="h4" gutterBottom>
        Relatório de Movimentação - Serial - Dias em Estoque
      </Typography>

      <DynamicReport
        reportName={"reporStockSerialDays"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/StockSerialDays`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/StockSerialDays/Schema`}
      />
    </MainMenu>
  );
};

export default StockSerialDays;
