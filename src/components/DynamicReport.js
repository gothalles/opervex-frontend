// components/LayoutConfigMenu.js
import React, { useState } from "react";
import DynamicTable from "./DynamicTable"; // Importando DynamicTable
import LayoutConfigMenu from "./LayoutConfigMenu"; // Importando LayoutConfigMenu
import FilterDialog from "./FilterDialog";
import ExportData from "./ExportData";
import { Box } from "@mui/material";

const DynamicReport = ({ reportName, urlData, urlSchema, links }) => {
  const [dados, setDados] = useState([]);
  const [layout, setLayout] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <>
      <Box display="flex" gap={2} mb={2}>
        {/* Dialog de Filtros */}
        <FilterDialog layout={layout || []} setData={setDados} urlData={urlData} setPage={setPage} />
        {/* Export Excel */}
        <ExportData data={dados} filename={reportName} />
        {/* Configuração de Layout */}
        <LayoutConfigMenu layout={layout || []} setLayout={setLayout} layoutName={reportName} urlSchema={urlSchema} />
      </Box>

      {/* Tabela Dinâmica */}
      <DynamicTable
        layout={layout || []}
        dados={dados || []}
        page={page}
        links={links || []}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
};

export default DynamicReport;
