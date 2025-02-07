// src/components/Layout.js
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Collapse,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory"; // Ícone para Produto
import BuildIcon from "@mui/icons-material/Build"; // Ícone para Serviço
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openCadastro, setOpenCadastro] = useState(false);

  const handleCadastroClick = () => {
    setOpenCadastro(!openCadastro);
  };

  const menuItems = [
    { text: "Lançamentos", icon: <ListAltIcon />, path: "/lancamentos" },
    { text: "Relatórios", icon: <AssessmentIcon />, path: "/relatorios" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Opervex {/* Nome alterado para Opervex */}
          </Typography>
        </Toolbar>
        <List>
          {/* Item de Home */}
          <ListItem
            button
            onClick={() => navigate("/")}
            selected={location.pathname === "/"} // Destacar se a rota for /
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          {/* Item de Cadastro com Submenu */}
          <ListItem button onClick={handleCadastroClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Cadastro" />
            {openCadastro ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCadastro} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/cadastro-produto")}
                selected={location.pathname === "/cadastro-produto"}
              >
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Produto" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/cadastro-servico")}
                selected={location.pathname === "/cadastro-servico"}
              >
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary="Serviço" />
              </ListItem>
            </List>
          </Collapse>

          {/* Outros itens do menu */}
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div style={{ flexGrow: 1, padding: 3 }}>{children}</div>
    </div>
  );
};

export default Layout;
