// src/components/CurrencyInput.js

import React from "react";
import { Form } from "react-bootstrap";
import { NumericFormat } from "react-number-format";

const CurrencyInput = ({
  value,
  onChange,
  label,
  hidden,
  disabled,
  name,
  showDisabled,
}) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      {!showDisabled && disabled ? (
        <div>
          R${" "}
          {value?.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ) : (
        <NumericFormat
          value={value}
          onValueChange={(values) => onChange(values.floatValue)}
          thousandSeparator="."
          decimalSeparator=","
          size="sm"
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          name={name}
          hidden={hidden}
          disabled={disabled}
          customInput={Form.Control}
        />
      )}
    </Form.Group>
  );
};

export default CurrencyInput;
