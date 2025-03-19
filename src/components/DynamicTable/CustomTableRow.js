import React from "react";
import { FormCheck } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const CustomTableRow = ({ row, layout, links, index }) => {
  return (
    <tr key={index}>
      {layout.map(
        (col) =>
          col.visible && (
            <td key={col.key} className="text-center align-middle">
              {col.type === "boolean" ? (
                <FormCheck type="checkbox" checked={row[col.key]} readOnly />
              ) : (
                (() => {
                  const linkObj = Array.isArray(links) ? links.find((l) => l.key === col.key) : null;

                  const formattedValue =
                    col.type === "date"
                      ? format(new Date(row[col.key]), "dd/MM/yyyy")
                      : col.type === "integer" || col.type === "number"
                      ? new Intl.NumberFormat("pt-BR", {
                          maximumFractionDigits: 0,
                        }).format(row[col.key])
                      : col.type === "decimal"
                      ? new Intl.NumberFormat("pt-BR", {
                          minimumFractionDigits: col.decimals,
                          maximumFractionDigits: col.decimals,
                        }).format(row[col.key])
                      : col.type === "currency"
                      ? new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(row[col.key])
                      : row[col.key];

                  if (linkObj && row[col.key]) {
                    const url = linkObj.link.replace(":id", row[col.key]);
                    return linkObj.newPage ? (
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                        {formattedValue}
                      </a>
                    ) : (
                      <Link to={url} className="text-primary text-decoration-none">
                        {formattedValue}
                      </Link>
                    );
                  }

                  return formattedValue;
                })()
              )}
            </td>
          )
      )}
    </tr>
  );
};

export default CustomTableRow;
