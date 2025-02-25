// pages/Reports/GoodsMovementHistoryFull.js
import React from "react";
import { Typography } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import DynamicReport from "../../components/DynamicReport";

const GoodsMovement = () => {
  return (
    <MainMenu>
      <Typography variant="h4" gutterBottom>
        Relatório de Movimentação
      </Typography>

      <DynamicReport
        reportName={"reporGoodsMovement"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/GoodsMovement`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/GoodsMovement/Schema`}
      />
    </MainMenu>
  );
};

export default GoodsMovement;
