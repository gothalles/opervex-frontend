import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const DynamicTable = ({ layout, dados, page, rowsPerPage, setPage, setRowsPerPage, links }) => {
  // Estado para armazenar a coluna e a direção da ordenação
  const [order, setOrder] = useState("asc"); // 'asc' ou 'desc'
  const [orderBy, setOrderBy] = useState(""); // Coluna que está sendo ordenada

  // Função para lidar com a ordenação ao clicar no cabeçalho da coluna
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Função para ordenar os dados
  const sortData = (array, orderBy, order) => {
    if (!orderBy) return array; // Se nenhuma coluna foi selecionada para ordenação, retorna os dados originais

    return [...array].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Se for uma data, convertemos para objeto Date
      if (orderBy === "documentDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Comparação genérica para números e textos
      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Ordenamos os dados antes de paginar
  const sortedData = sortData(dados, orderBy, order);

  // Funções para mudar a página e a quantidade de linhas por página
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Cabeçalho da Tabela */}
        <TableHead>
          <TableRow>
            {layout.map(
              (col) =>
                col.visible && (
                  <TableCell key={col.key}>
                    <TableSortLabel
                      active={orderBy === col.key}
                      direction={orderBy === col.key ? order : "asc"}
                      onClick={() => handleRequestSort(col.key)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                )
            )}
          </TableRow>
        </TableHead>

        {/* Corpo da Tabela */}
        <TableBody>
          {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              {layout.map(
                (col) =>
                  col.visible && (
                    <TableCell key={col.key} size="small">
                      {row[col.key] != null &&
                        (() => {
                          const linkObj = Array.isArray(links) ? links.find((l) => l.key === col.key) : undefined;

                          const formattedValue =
                            col.type === "date"
                              ? format(new Date(row[col.key]), "dd/MM/yyyy")
                              : col.type === "integer" || col.type === "number"
                                ? new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(row[col.key])
                                : col.type === "decimal"
                                  ? new Intl.NumberFormat("pt-BR", {
                                      minimumFractionDigits: col.decimals,
                                      maximumFractionDigits: col.decimals,
                                    }).format(row[col.key])
                                  : col.type === "currency"
                                    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(row[col.key])
                                    : row[col.key];

                          if (linkObj) {
                            const url = linkObj.link.replace(":id", row[col.key]);
                            return linkObj.newPage ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", color: "blue" }}
                              >
                                {formattedValue}
                              </a>
                            ) : (
                              <Link to={url} style={{ textDecoration: "none", color: "blue" }}>
                                {formattedValue}
                              </Link>
                            );
                          }

                          return formattedValue;
                        })()}
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
