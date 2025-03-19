// pages/Reports/Stock.js
import React from "react";
import DynamicReport from "../../components/DynamicReport";

const Stock = () => {
  return (
    <>
      <h1 class="fw-light text-center">Relatório de Estoque</h1>

      <DynamicReport
        reportName={"reporStock"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/Stock`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/Stock/Schema`}
      />
    </>
  );
};

export default Stock;
