// components/FilterDialog.js
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, DialogActions, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";

const FilterDialog = ({ layout, setData, urlData, setPage }) => {
  const [anchorFilters, setAnchorFilters] = useState(null);
  const openFilters = Boolean(anchorFilters);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({});
  const { user } = useAuth(); // Pega usuário do contexto

  const handleOpenFilters = () => {
    setAnchorFilters(true);
  };

  const handleCloseFilters = () => {
    setAnchorFilters(false);
  };

  const handleFiltrar = async () => {
    setLoading(true);
    //setError(null);

    const filtrosEnviados = Object.fromEntries(Object.entries(filtros).filter(([key, value]) => value !== ""));

    var filterBody = [];

    const keys = Object.keys(filtrosEnviados);

    keys.forEach((field) => {
      const value = filtrosEnviados[field];

      filterBody.push({
        operation: "AND",
        field: field,
        condition: "equal",
        value: value,
      });
    });

    try {
      const response = await fetch(urlData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(filterBody),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar os dados.");
      }

      const result = await response.json();

      setPage(0);

      setData(result);

      // handleClose();
    } catch (err) {
      //setError("Erro ao carregar os dados.");
    } finally {
      setLoading(false);

      //handleClose();
    }

    handleCloseFilters();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenFilters}>
        Filtros
      </Button>

      <Dialog onClose={handleCloseFilters} aria-labelledby="filter-dialog-title" open={openFilters}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="filter-dialog-title">
          Filtros
          <IconButton
            aria-label="close"
            onClick={handleCloseFilters}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}>
            {layout
              .filter((col) => col.visible)
              .map((col) => (
                <TextField
                  key={col.key}
                  label={col.label}
                  name={col.key}
                  size="small"
                  value={filtros[col.key] || ""}
                  onChange={(e) => setFiltros({ ...filtros, [e.target.name]: e.target.value })}
                />
              ))}
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
