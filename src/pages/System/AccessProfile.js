import React, { useState } from "react";
import { Checkbox, TextField, Button, Paper, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MainMenu from "../../components/MainMenu";
import { TreeView, TreeItem } from "@mui/lab";

const MUI_X_PRODUCTS = [
  {
    id: "grid",
    label: "Data Grid",
    children: [
      { id: "grid-community", label: "@mui/x-data-grid" },
      { id: "grid-pro", label: "@mui/x-data-grid-pro" },
      { id: "grid-premium", label: "@mui/x-data-grid-premium" },
    ],
  },
  {
    id: "pickers",
    label: "Date and Time Pickers",
    children: [
      { id: "pickers-community", label: "@mui/x-date-pickers" },
      { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    children: [{ id: "charts-community", label: "@mui/x-charts" }],
  },
  {
    id: "tree-view",
    label: "Tree View",
    children: [{ id: "tree-view-community", label: "@mui/x-tree-view" }],
  },
];

const AccessProfile = () => {
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const handleToggle = (id) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <Box display="flex" alignItems="center">
          <Checkbox checked={!!selectedPermissions[nodes.id]} onChange={() => handleToggle(nodes.id)} />
          {nodes.label}
        </Box>
      }
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <MainMenu>
      <Paper style={{ padding: 20, maxWidth: 600 }}>
        <Typography variant="h6">Perfil de Acesso</Typography>
        <TextField label="Código" fullWidth margin="dense" />
        <TextField label="Nome" fullWidth margin="dense" />
        <Box sx={{ minHeight: 352, minWidth: 250, mt: 2 }}>
          <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
            {MUI_X_PRODUCTS.map((node) => renderTree(node))}
          </TreeView>
        </Box>
        <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
          Salvar
        </Button>
      </Paper>
    </MainMenu>
  );
};

export default AccessProfile;
