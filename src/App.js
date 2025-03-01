// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import ExcelUploader from "./pages/ExcelUploader";
import AccessProfile from "./pages/System/AccessProfile";

import RegisterProduct from "./pages/Register/Product";
import RegisterSales from "./pages/Register/Sales";
import RegisterServiceOrder from "./pages/Register/ServiceOrder";

import ReportStock from "./pages/Reports/Stock";
import ReportStockSerial from "./pages/Reports/SockSerial";
import ReportStockSerialDays from "./pages/Reports/StockSerialDays";
import ReportGoodsMovement from "./pages/Reports/GoodsMovement";
import ReportGoodsMovementFull from "./pages/Reports/GoodsMovementFull";
import ReportServiceOrder from "./pages/Reports/ServiceOrder";

// Proteção de Rotas - Verifica se o usuário está autenticado
const PrivateRoute = ({ children, requiredRoles }) => {
  const { user, roles, loading, checkToken } = useAuth(); // Pega usuário e loading do contexto

  // Se ainda está carregando, mostra um carregamento (pode ser uma tela de loading ou nada)
  if (loading) {
    return <div>Carregando...</div>; // Aqui você pode mostrar um spinner ou algo mais adequado
  }

  if (!user)
    // Verifica se o usuário está autenticado, se não, redireciona para login
    return <Navigate to="/login" />;

  // Verifica se o usuário tem pelo menos um dos papéis necessários
  if (requiredRoles) {
    const allowed = roles.findIndex((x) => x.command === requiredRoles) == -1 ? false : true;

    if (!allowed) return <Navigate to="/" />;
  }

  return children;
};

// Página de Logout
const Logout = () => {
  const { logout } = useAuth(); // Obtendo a função logout do contexto

  logout(); // Chama o logout

  return <Navigate to="/login" />;
};

const AddPrivateRoute = (path, page, requiredRoles) => {
  return <Route path={path} element={<PrivateRoute requiredRoles={requiredRoles}>{page}</PrivateRoute>} />;
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
          {AddPrivateRoute("/", <Home />)}
          {AddPrivateRoute("/ExcelUploader", <ExcelUploader />)}
          {AddPrivateRoute("/Dashboard", <Dashboard />)}
          {AddPrivateRoute("/System/AccessProfile", <AccessProfile />, "USER_PROFILE")}

          {AddPrivateRoute("/Register/Product", <RegisterProduct />)}
          {AddPrivateRoute("/Register/Sales", <RegisterSales />)}
          {AddPrivateRoute("/Register/ServiceOrder", <RegisterServiceOrder />)}
          {AddPrivateRoute("/Register/ServiceOrder/:id", <RegisterServiceOrder />)}

          {AddPrivateRoute("/Report/Stock", <ReportStock />, "REPORT_STOCK")}
          {AddPrivateRoute("/Report/StockSerial", <ReportStockSerial />, "REPORT_STOCK_SERIAL")}
          {AddPrivateRoute("/Report/StockSerialDays", <ReportStockSerialDays />, "REPORT_SERIAL_DAYS_DEPOSIT")}
          {AddPrivateRoute("/Report/GoodsMovement", <ReportGoodsMovement />, "REPORT_GOODS_MOVEMENT")}
          {AddPrivateRoute("/Report/GoodsMovementFull", <ReportGoodsMovementFull />, "REPORT_GOODS_MOVEMENT_FULL")}
          {AddPrivateRoute("/Report/ServiceOrder", <ReportServiceOrder />, "REPORT_SERVICE_ORDER")}

          {/* Redireciona qualquer URL inválida para a Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
