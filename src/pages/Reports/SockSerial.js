// src/pages/Reports/SockSerial.js

import React from "react";
import DynamicReport from "../../components/DynamicReport";

const Stock = () => {
  return (
    <>
      <h1 class="fw-light text-center">Relatório de Estoque Serial</h1>

      <DynamicReport
        reportName={"reporSockSerial"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/StockSerial`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/StockSerial/Schema`}
      />
    </>
  );
};

export default Stock;
