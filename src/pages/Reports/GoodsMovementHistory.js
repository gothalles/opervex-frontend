// pages/Reports/GoodsMovementHistory.js
import React from "react";
import { Typography } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import DynamicReport from "../../components/DynamicReport";

const GoodsMovementHistory = () => {
  return (
    <MainMenu>
      <Typography variant="h4" gutterBottom>
        Relatório de Movimentação de Serial
      </Typography>

      <DynamicReport
        reportName={"reporGoodsMovementHistory"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/GoodsMovementHistory`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/GoodsMovementHistory/Schema`}
      />
    </MainMenu>
  );
};

export default GoodsMovementHistory;
