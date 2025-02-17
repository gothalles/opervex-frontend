// pages/GoodsMovementHistory.js
import React from "react";
import { Typography } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import DynamicReport from "../../components/DynamicReport";

const Stock = () => {
  return (
    <MainMenu>
      <Typography variant="h4" gutterBottom>
        Relatório de Estoque
      </Typography>

      <DynamicReport
        reportName={"reportGoodsMoviment"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/Stock`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/Stock/Schema`}
      />
    </MainMenu>
  );
};

export default Stock;
