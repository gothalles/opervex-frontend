// src/pages/Reports/ServiceOrder.js

import React from "react";
import DynamicReport from "../../components/DynamicReport";

const ServiceOrder = () => {
  return (
    <>
      <h1 class="fw-light text-center">Relatório de Estoque Serial</h1>

      <DynamicReport
        reportName={"reporServiceOrder"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/ServiceOrder`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/ServiceOrder/Schema`}
        links={[
          { key: "code", link: "/Register/ServiceOrder/:id", newPage: true },
          {
            key: "reversal",
            link: "/Register/ServiceOrder/:id",
            newPage: true,
          },
        ]}
      />
    </>
  );
};

export default ServiceOrder;
