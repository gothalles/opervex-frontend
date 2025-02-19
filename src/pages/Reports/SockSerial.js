// pages/Reports/SockSerial.js
import React from "react";
import { Typography } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import DynamicReport from "../../components/DynamicReport";

const Stock = () => {
  return (
    <MainMenu>
      <Typography variant="h4" gutterBottom>
        Relatório de Estoque Serial
      </Typography>

      <DynamicReport
        reportName={"reporSockSerial"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/SockSerial`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/SockSerial/Schema`}
      />
    </MainMenu>
  );
};

export default Stock;
