import React, { useState } from "react";
import { Button, Form, InputGroup, Accordion, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import CurrencyInput from "../../components/CurrencyInput";
import Opervex from "../../utils/Opervex";

const LOGIC_OPERATORS = [
  { label: "E", value: "AND" },
  { label: "OU", value: "OR" },
];

const FilterAccordion = ({ layout, setData, urlData }) => {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);

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
      setLoading(false);
    }
  };

  return (
    <>
      <Accordion defaultActiveKey="0" className="mb-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtros</Accordion.Header>
          <Accordion.Body>
            {filters.map((filter, index) => (
              <InputGroup className="mb-2" key={index} size="sm">
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
                <InputGroup.Text size="sm" type="button" onClick={() => handleRemoveFilter(index)}>
                  <FaTrash />
                </InputGroup.Text>
              </InputGroup>
            ))}
            <Row className="mb-2"></Row>
            <div className="text-end mb-2">
              <Button variant="outline-success" onClick={handleAddFilter} size="sm">
                Adicionar Filtro
              </Button>{" "}
              <Button variant="primary" onClick={handleFiltrar} disabled={loading} size="sm">
                {loading ? "Carregando..." : "Filtrar"}
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FilterAccordion;
