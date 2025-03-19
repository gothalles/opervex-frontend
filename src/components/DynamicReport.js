// components/DynamicReport/index.js
import React, { useState } from "react";
import DynamicTable from "./DynamicTable"; // Importando DynamicTable
import LayoutConfigMenu from "./LayoutConfigMenu"; // Importando LayoutConfigMenu
import FilterDialog from "./FilterDialog";
import ExportData from "./ExportData";

const DynamicReport = ({ reportName, urlData, urlSchema, links }) => {
  const [dados, setDados] = useState([]);
  const [layout, setLayout] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <>
      <div className="d-flex gap-2 mb-3">
        {/* Dialog de Filtros */}
        <FilterDialog layout={layout || []} setData={setDados} urlData={urlData} setPage={setPage} />

        {/* Export Excel*/}
        <ExportData data={dados} filename={reportName} />

        {/* Configuração de Layout */}
        <LayoutConfigMenu layout={layout || []} setLayout={setLayout} layoutName={reportName} urlSchema={urlSchema} />
      </div>

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
