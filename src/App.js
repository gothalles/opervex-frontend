import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, logout, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RegisterProduct from "./pages/Register/Product";
import RegisterService from "./pages/Register/Service";
import Lancamentos from "./pages/Lancamentos";
import ReportStock from "./pages/Reports/Stock";
import ReportGoodsMovementHistory from "./pages/Reports/GoodsMovementHistory";

// Proteção de Rotas - Verifica se o usuário está autenticado
const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Pega usuário do contexto

  const isAuthenticated = user || localStorage.getItem("user"); // Persistência no LocalStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Página de Logout
const Logout = () => {
  // Remove o usuário da autenticação
  <Login.logout />;

  // Redireciona para login
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
            path="/Register/Product"
            element={
              <PrivateRoute>
                <RegisterProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/Register/Service"
            element={
              <PrivateRoute>
                <RegisterService />
              </PrivateRoute>
            }
          />
          <Route
            path="/lancamentos"
            element={
              <PrivateRoute>
                <Lancamentos />
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
          />{" "}
          <Route
            path="/Report/GoodsMovementHistory"
            element={
              <PrivateRoute>
                <ReportGoodsMovementHistory />
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
