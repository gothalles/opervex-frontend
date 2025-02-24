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
import ReportServiceOrder from "./pages/Reports/ServiceOrder";

// Proteção de Rotas - Verifica se o usuário está autenticado
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Pega usuário e loading do contexto

  // Se ainda está carregando, mostra um carregamento (pode ser uma tela de loading ou nada)
  if (loading) {
    return <div>Carregando...</div>; // Aqui você pode mostrar um spinner ou algo mais adequado
  }

  // Verifica se o usuário está autenticado, se não, redireciona para login
  if (!user) {
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

const AddPrivateRoute = (path, page) => {
  return <Route path={path} element={<PrivateRoute>{page}</PrivateRoute>} />;
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
          {AddPrivateRoute("/System/AccessProfile", <AccessProfile />)}

          {AddPrivateRoute("/Register/Product", <RegisterProduct />)}
          {AddPrivateRoute("/Register/Sales", <RegisterSales />)}
          {AddPrivateRoute("/Register/ServiceOrder", <RegisterServiceOrder />)}
          {AddPrivateRoute("/Register/ServiceOrder/:id", <RegisterServiceOrder />)}

          {AddPrivateRoute("/Report/Stock", <ReportStock />)}
          {AddPrivateRoute("/Report/StockSerial", <ReportStockSerial />)}
          {AddPrivateRoute("/Report/StockSerialDays", <ReportStockSerialDays />)}
          {AddPrivateRoute("/Report/GoodsMovement", <ReportGoodsMovement />)}
          {AddPrivateRoute("/Report/ServiceOrder", <ReportServiceOrder />)}

          {/* Redireciona qualquer URL inválida para a Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
