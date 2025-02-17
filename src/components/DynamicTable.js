// components/DynamicTable.js
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from "@mui/material";
import { format } from "date-fns";

const DynamicTable = ({ layout, dados, page, rowsPerPage, setPage, setRowsPerPage }) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Cabeçalho da Tabela */}
        <TableHead>
          <TableRow>{layout.map((col) => col.visible && <TableCell key={col.key}>{col.label}</TableCell>)}</TableRow>
        </TableHead>

        {/* Corpo da Tabela */}
        <TableBody>
          {dados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              {layout.map(
                (col) =>
                  col.visible && (
                    <TableCell key={col.key} size="small">
                      {col.key === "documentDate" ? format(new Date(row[col.key]), "dd/MM/yyyy") : row[col.key]}
                    </TableCell>
                  )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginação */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={dados.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default DynamicTable;
