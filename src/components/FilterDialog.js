import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import CurrencyInput from "../components/CurrencyInput";
import Opervex from "../utils/Opervex";

const LOGIC_OPERATORS = [
  { label: "E", value: "AND" },
  { label: "OU", value: "OR" },
];

const FilterDialog = ({ layout, setData, urlData, setPage }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const { user } = useAuth();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddFilter = () => {
    const fieldname = layout.filter((col) => col.visible)[0].key;

    setFilters((prev) => [...prev, { field: "", operator: "=", value: "", logic: prev.length ? "AND" : "" }]);

    handleChangeFilter(filters.length, "field", fieldname);
  };

  const handleRemoveFilter = (index) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeFilter = (index, key, value) => {
    setFilters((prev) => prev.map((filter, i) => (i === index ? { ...filter, [key]: value } : filter)));
  };

  const handleFiltrar = async () => {
    setLoading(true);

    const validFilters = filters.filter((f) => f.field);
    const filterBody = validFilters.map(({ field, operator, value, logic }, index) => ({
      operation: index === 0 ? "AND" : logic,
      field,
      condition: operator,
      value,
    }));

    try {
      const result = await Opervex.API.post(urlData, filterBody);

      setData(result);
    } catch (err) {
      console.error("Erro ao carregar os dados:", err);
    } finally {
      setPage(0);
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Filtros
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Filtros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filters.map((filter, index) => (
            <InputGroup className="mb-2" key={index}>
              {index > 0 && (
                <Form.Select value={filter.logic} onChange={(e) => handleChangeFilter(index, "logic", e.target.value)}>
                  {LOGIC_OPERATORS.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </Form.Select>
              )}
              <Form.Select value={filter.field} onChange={(e) => handleChangeFilter(index, "field", e.target.value)}>
                {layout
                  .filter((col) => col.visible)
                  .map((col) => (
                    <option key={col.key} value={col.key}>
                      {col.label}
                    </option>
                  ))}
              </Form.Select>
              <Form.Select value={filter.operator} onChange={(e) => handleChangeFilter(index, "operator", e.target.value)}>
                {(layout.find((col) => col.key === filter.field)?.filterOptions ?? []).map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </Form.Select>
              {layout.find((col) => col.key === filter.field)?.type === "currency" ? (
                <CurrencyInput value={filter.value} onChange={(value) => handleChangeFilter(index, "value", value)} />
              ) : (
                <Form.Control
                  type={
                    layout.find((col) => col.key === filter.field)?.type === "date"
                      ? "date"
                      : layout.find((col) => col.key === filter.field)?.type === "number"
                      ? "number"
                      : "text"
                  }
                  value={filter.value}
                  onChange={(e) => handleChangeFilter(index, "value", e.target.value)}
                />
              )}
              <Button variant="danger" onClick={() => handleRemoveFilter(index)}>
                -
              </Button>
            </InputGroup>
          ))}
          <Button variant="outline-success" onClick={handleAddFilter}>
            Adicionar Filtro
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleFiltrar} disabled={loading}>
            {loading ? "Carregando..." : "Filtrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterDialog;
