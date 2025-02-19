import React, { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SidebarFooterAccount = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    localStorage.clear();
    navigate("/logout");
    handleMenuClose();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        borderTop: "1px solid #ccc",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Avatar alt="Usuário" src={user?.image || ""} />
        <p style={{ margin: 1, fontSize: "14px" }}>Usuário: {user?.fullname || "Visitante"}</p>
      </div>
      <IconButton onClick={handleMenuOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>
          <Logout style={{ marginRight: "8px" }} /> Sair
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SidebarFooterAccount;
