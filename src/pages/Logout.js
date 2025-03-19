// src/pages/Logout.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Página de Logout
const Logout = () => {
  const { logout } = useAuth(); // Obtendo a função logout do contexto

  logout(); // Chama o logout

  return <Navigate to="/Login" />;
};

export default Logout;
