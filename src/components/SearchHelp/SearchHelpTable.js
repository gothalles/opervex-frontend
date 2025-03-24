// src/components/SearchHelp/SearchHelpTable.js

import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

import CustomTableRow from "../DynamicTable/CustomTableRow";

const SearchHelpTable = ({ layout, data, onSelectItem }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const newLayout = JSON.parse(
    JSON.stringify([
      ...layout,
      {
        key: "actionSearch",
        visible: true,
      },
    ])
  );

  const actionSearchButton = (item) => {
    return (
      <Button
        variant="success"
        size="sm"
        onClick={() => {
          onSelectItem(item);
        }}
      >
        Selecionar
      </Button>
    );
  };

  const newData = JSON.parse(JSON.stringify(data)).map((row) => ({
    ...row,
    actionSearch: actionSearchButton(row),
  }));

  useEffect(() => {
    //console.log(newLayout);
    // Atualiza a paginação sempre que a página muda
  }, []);

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

  const sortedData = sortData(newData, orderBy, order);

  return (
    <div>
      <Table striped bordered hover size="sm" className="mb-2">
        <thead>
          <tr className="text-center align-middle">
            {layout ? (
              layout.map(
                (col) =>
                  col.visible && (
                    <th
                      key={col.key}
                      onClick={() => handleRequestSort(col.key)}
                      style={{ cursor: "pointer" }}
                    >
                      {col.label}{" "}
                      {orderBy === col.key ? (order === "asc" ? "▲" : "▼") : ""}
                    </th>
                  )
              )
            ) : (
              <></>
            )}
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) =>
            CustomTableRow({ row, layout: newLayout, links: [], index })
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default SearchHelpTable;
