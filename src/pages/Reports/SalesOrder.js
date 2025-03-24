// pages/Reports/SalesOrder.js
import React from "react";
import DynamicReport from "../../components/DynamicReport";

const StockSerialDays = () => {
  return (
    <>
      <h1 class="fw-light text-center">Relatório de Ordens de Venda</h1>

      <DynamicReport
        reportName={"reporSalesOrder"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/SalesOrder`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/SalesOrder/Schema`}
        links={[
          { key: "code", link: "/Register/SalesOrder/:id", newPage: true },
        ]}
      />
    </>
  );
};

export default StockSerialDays;
