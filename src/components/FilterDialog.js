import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAuth } from "../context/AuthContext";
import CurrencyInput from "../components/CurrencyInput";

const LOGIC_OPERATORS = [
  { label: "E", value: "AND" },
  { label: "OU", value: "OR" },
];

const FilterDialog = ({ layout, setData, urlData, setPage }) => {
  useEffect(() => {}, []);

  const [openFilters, setOpenFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const { user } = useAuth(); // Usuário autenticado

  const handleOpenFilters = () => setOpenFilters(true);
  const handleCloseFilters = () => setOpenFilters(false);

  const handleAddFilter = () => {
    setFilters((prev) => [...prev, { field: "", operator: "=", value: "", logic: prev.length ? "AND" : "" }]);
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
      const response = await fetch(urlData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(filterBody),
      });

      if (!response.ok) throw new Error("Erro ao buscar os dados.");

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Erro ao carregar os dados:", err);
    } finally {
      setPage(0);
      setLoading(false);
      handleCloseFilters();
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenFilters}>
        Filtros
      </Button>

      <Dialog onClose={handleCloseFilters} open={openFilters} fullWidth maxWidth="lg">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Filtros
          <IconButton
            aria-label="close"
            onClick={handleCloseFilters}
            sx={{ position: "absolute", right: 8, top: 8, color: "gray" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {filters.map((filter, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {index > 0 && (
                  <FormControl size="small" sx={{ width: 100 }}>
                    <TextField
                      select
                      label="Opção"
                      size="small"
                      fullWidth
                      required
                      value={filter.logic}
                      onChange={(e) => handleChangeFilter(index, "logic", e.target.value)}
                    >
                      {LOGIC_OPERATORS.map((op) => (
                        <MenuItem key={op.value} value={op.value}>
                          {op.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                )}

                <FormControl size="small" sx={{ flex: 1 }}>
                  <TextField
                    select
                    label="Campo"
                    size="small"
                    fullWidth
                    required
                    value={filter.field}
                    onChange={(e) => handleChangeFilter(index, "field", e.target.value)}
                  >
                    {layout
                      .filter((col) => col.visible)
                      .map((col) => (
                        <MenuItem key={col.key} value={col.key}>
                          {col.label}
                        </MenuItem>
                      ))}
                  </TextField>
                </FormControl>

                <FormControl size="small" sx={{ width: 150 }}>
                  <TextField
                    select
                    label="Operador"
                    size="small"
                    fullWidth
                    required
                    value={filter.operator}
                    onChange={(e) => handleChangeFilter(index, "operator", e.target.value)}
                  >
                    {(layout.find((col) => col.key === filter.field)?.filterOptions ?? []).map((op) => (
                      <MenuItem key={op.value} value={op.value}>
                        {op.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <FormControl size="small" sx={{ width: 200 }}>
                  {layout.find((col) => col.key === filter.field)?.type === "currency" ? (
                    <CurrencyInput
                      value={filter.value}
                      onChange={(value) => handleChangeFilter(index, "value", value)}
                      label="Valor"
                    />
                  ) : (
                    <TextField
                      size="small"
                      label="Valor"
                      type={
                        layout.find((col) => col.key === filter.field)?.type === "date"
                          ? "date"
                          : layout.find((col) => col.key === filter.field)?.type === "number"
                            ? "number"
                            : "text"
                      }
                      InputLabelProps={layout.find((col) => col.key === filter.field)?.type === "date" ? { shrink: true } : {}}
                      value={filter.value}
                      onChange={(e) => handleChangeFilter(index, "value", e.target.value)}
                      fullWidth
                    />
                  )}
                </FormControl>

                <IconButton color="error" onClick={() => handleRemoveFilter(index)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}

            <Button startIcon={<AddIcon />} variant="outlined" onClick={handleAddFilter} sx={{ alignSelf: "flex-start" }}>
              Adicionar Filtro
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleFiltrar} disabled={loading}>
            {loading ? "Carregando..." : "Filtrar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterDialog;
