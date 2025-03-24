// src/components/DynamicTable.js
import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";

import CustomTableRow from "./CustomTableRow";

const DynamicTable = ({ layout, dados, page, rowsPerPage, setPage, setRowsPerPage, links, noPagination }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    // Atualiza a paginação sempre que a página muda
  }, [page]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (array, orderBy, order) => {
    if (!orderBy) return array;

    return [...array].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      if (orderBy === "documentDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedData = sortData(dados, orderBy, order);

  const handleChangePage = (newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPages = Math.ceil(dados.length / rowsPerPage);
  let startPage = Math.max(0, page - 3);
  let endPage = Math.min(totalPages - 1, startPage + 6);

  if (endPage - startPage < 6) {
    startPage = Math.max(0, endPage - 6);
  }

  const PaginationMenu = () => {
    return (
      <Pagination hidden={noPagination}>
        <Pagination.First onClick={() => handleChangePage(0)} disabled={page === 0} />
        <Pagination.Prev onClick={() => handleChangePage(page - 1)} disabled={page === 0} />

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((p) => (
          <Pagination.Item key={p} active={p === page} onClick={() => handleChangePage(p)}>
            {p + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={() => handleChangePage(page + 1)} disabled={page >= totalPages - 1} />
        <Pagination.Last onClick={() => handleChangePage(totalPages - 1)} disabled={page >= totalPages - 1} />
      </Pagination>
    );
  };

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr className="text-center align-middle">
            {layout.map(
              (col) =>
                col.visible && (
                  <th key={col.key} onClick={() => handleRequestSort(col.key)} style={{ cursor: "pointer" }}>
                    {col.label} {orderBy === col.key ? (order === "asc" ? "▲" : "▼") : ""}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {!noPagination
            ? sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => CustomTableRow({ row, layout, links, index }))
            : sortedData.map((row, index) => CustomTableRow({ row, layout, links, index }))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <select onChange={handleChangeRowsPerPage} value={rowsPerPage} className="form-select w-auto" hidden={noPagination}>
          {[5, 10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} por página
            </option>
          ))}
        </select>
        {PaginationMenu()}
      </div>
    </div>
  );
};

export default DynamicTable;
