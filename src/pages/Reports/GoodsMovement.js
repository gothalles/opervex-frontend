// src/pages/Reports/GoodsMovement.js

import React from "react";
import { Container, Row } from "react-bootstrap";
import DynamicReport from "../../components/DynamicReport";

const GoodsMovement = () => {
  return (
    <Container fluid>
      <h1 class="fw-light text-center">Relatório de Movimentação</h1>

      <DynamicReport
        reportName={"reporGoodsMovement"}
        urlData={`${process.env.REACT_APP_API_URL}/Report/GoodsMovement`}
        urlSchema={`${process.env.REACT_APP_API_URL}/Report/GoodsMovement/Schema`}
      />
    </Container>
  );
};

export default GoodsMovement;
