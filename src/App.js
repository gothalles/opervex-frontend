// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccessProfile from "./pages/System/AccessProfile";

import RegisterProduct from "./pages/Register/Product";
import RegisterService from "./pages/Register/Service";
import RegisterSales from "./pages/Register/Sales";

import ReportStock from "./pages/Reports/Stock";
import ReportStockSerial from "./pages/Reports/SockSerial";
import ReportStockSerialDays from "./pages/Reports/StockSerialDays";
import ReportGoodsMovementHistory from "./pages/Reports/GoodsMovementHistory";
import ReportGoodsMovementHistoryFull from "./pages/Reports/GoodsMovementHistoryFull";

// Proteção de Rotas - Verifica se o usuário está autenticado
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Pega usuário e loading do contexto

  // Se ainda está carregando, mostra um carregamento (pode ser uma tela de loading ou nada)
  if (loading) {
    return <div>Carregando...</div>; // Aqui você pode mostrar um spinner ou algo mais adequado
  }

  // Verifica se o usuário está autenticado, se não, redireciona para login
  if (!user) {
    console.log("Aqui -> App -> PrivateRoute");
    return <Navigate to="/login" />;
  }

  return children;
};

// Página de Logout
const Logout = () => {
  const { logout } = useAuth(); // Obtendo a função logout do contexto

  logout(); // Chama o logout

  return <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Página de Login */}
          <Route path="/login" element={<Login />} />
          {/* Página de Logout */}
          <Route path="/logout" element={<Logout />} />
          {/* Rotas Privadas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/System/AccessProfile"
            element={
              <PrivateRoute>
                <AccessProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/Register/Product"
            element={
              <PrivateRoute>
                <RegisterProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/Register/Sales"
            element={
              <PrivateRoute>
                <RegisterSales />
              </PrivateRoute>
            }
          />
          <Route
            path="/Report/Stock"
            element={
              <PrivateRoute>
                <ReportStock />
              </PrivateRoute>
            }
          />
          <Route
            path="/Report/StockSerial"
            element={
              <PrivateRoute>
                <ReportStockSerial />
              </PrivateRoute>
            }
          />
          <Route
            path="/Report/StockSerialDays"
            element={
              <PrivateRoute>
                <ReportStockSerialDays />
              </PrivateRoute>
            }
          />
          <Route
            path="/Report/GoodsMovementHistory"
            element={
              <PrivateRoute>
                <ReportGoodsMovementHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/Report/GoodsMovementHistoryFull"
            element={
              <PrivateRoute>
                <ReportGoodsMovementHistoryFull />
              </PrivateRoute>
            }
          />
          {/* Redireciona qualquer URL inválida para a Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
