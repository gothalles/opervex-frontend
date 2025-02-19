import React from "react";
import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

const CurrencyInput = ({ value, onChange, label }) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => onChange(values.floatValue)}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      customInput={TextField}
      fullWidth
      label={label ? label : "Valor"}
      variant="outlined"
    />
  );
};

export default CurrencyInput;
