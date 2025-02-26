// pages/Reports/SockSerial.js
import React from "react";
import { Typography } from "@mui/material";
import MainMenu from "../../components/MainMenu";
import DynamicReport from "../../components/DynamicReport";

const ServiceOrder = () => {
  return (
    <MainMenu>
      <Typography variant="h4" gutterBottom>
        Relatório de Estoque Serial
      </Typography>
      <DynamicReport
        reportName={"reporServiceOrder"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/ServiceOrder`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/ServiceOrder/Schema`}
        links={[
          { key: "code", link: "/Register/ServiceOrder/:id", newPage: true },
          { key: "reversal", link: "/Register/ServiceOrder/:id", newPage: true },
        ]}
      />
    </MainMenu>
  );
};

export default ServiceOrder;
