// pages/Reports/GoodsMovementHistoryFull.js
import React from "react";
import { Typography } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import DynamicReport from "../../components/DynamicReport";

const GoodsMovementFull = () => {
  return (
    <MainMenu>
      <Typography variant="h4" gutterBottom>
        Relatório de Movimentação - Completo
      </Typography>

      <DynamicReport
        reportName={"reporGoodsMovementFull"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/GoodsMovementFull`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/GoodsMovementFull/Schema`}
      />
    </MainMenu>
  );
};

export default GoodsMovementFull;
