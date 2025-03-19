// pages/Reports/GoodsMovementFull.js
import React from "react";
import DynamicReport from "../../components/DynamicReport";

const GoodsMovementFull = () => {
  return (
    <>
      <h1 class="fw-light text-center">Relatório de Movimentação - Completo</h1>

      <DynamicReport
        reportName={"reporGoodsMovementFull"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/GoodsMovementFull`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/GoodsMovementFull/Schema`}
      />
    </>
  );
};

export default GoodsMovementFull;
