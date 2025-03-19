// components/FilterDialog.js
import React from "react";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";

const ExportData = ({ data, filename }) => {
  const handleExportar = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, filename + ".xlsx");
  };

  return (
    <Button variant="outline-primary" onClick={handleExportar}>
      Exportar
    </Button>
  );
};

export default ExportData;
