// pages/Reports/GoodsMovementHistoryFull.js
import React from "react";
import { Typography } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import DynamicReport from "../../components/DynamicReport";

const GoodsMovementHistoryFull = () => {
  return (
    <MainMenu>
      <Typography variant="h4" gutterBottom>
        Relatório de Movimentação - Completo
      </Typography>

      <DynamicReport
        reportName={"reporGoodsMovementHistoryFull"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/GoodsMovementHistoryFull`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/GoodsMovementHistoryFull/Schema`}
      />
    </MainMenu>
  );
};

export default GoodsMovementHistoryFull;
