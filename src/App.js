// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RegisterProduct from "./pages/Register/Product"; // Atualizado
import RegisterService from "./pages/Register/Service"; // Atualizado
import Lancamentos from "./pages/Lancamentos";
import Relatorios from "./pages/Relatorios";
import RelatorioEstoque from "./pages/RelatorioEstoque";
import RelatorioMovimentacao from "./pages/RelatorioMovimentacao";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
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
            path="/relatorios"
            element={
              <PrivateRoute>
                <Relatorios />
              </PrivateRoute>
            }
          >
            <Route path="estoque" element={<RelatorioEstoque />} />
            <Route path="movimentacao" element={<RelatorioMovimentacao />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
