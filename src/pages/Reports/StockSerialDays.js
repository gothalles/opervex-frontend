// src/pages/Reports/StockSerialDays.js

import React from "react";
import DynamicReport from "../../components/DynamicReport";

const StockSerialDays = () => {
  return (
    <>
      <h1 class="fw-light text-center">
        Relatório de Movimentação - Serial - Dias em Estoque
      </h1>

      <DynamicReport
        reportName={"reporStockSerialDays"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/StockSerialDays`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/StockSerialDays/Schema`}
      />
    </>
  );
};

export default StockSerialDays;
