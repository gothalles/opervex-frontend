// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import routes from "./routes";

// Proteção de Rotas - Verifica se o usuário está autenticado
const PrivateRoute = ({ children, requiredRoles, admin }) => {
  const { user, roles, loading } = useAuth(); // Pegando `user`, `roles` e `loading` do contexto

  // Exibe tela de carregamento enquanto os dados estão sendo processados
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não houver usuário, redireciona para login
  if (!user) return <Navigate to="/Login" />;

  // Verifica se o usuário tem a role necessária
  if (requiredRoles) {
    const hasPermission = roles.some((x) => x.command === requiredRoles);

    if (!hasPermission) return <Navigate to="/" />;
  }

  if (admin) if (!user.administrator) return <Navigate to="/" />;

  return children;
};

// Função auxiliar para criar rotas privadas
const AddPrivateRoute = (path, page, requiredRoles, admin) => (
  <Route
    key={path}
    path={path}
    element={
      <Layout>
        <PrivateRoute requiredRoles={requiredRoles} admin={admin}>
          {page}
        </PrivateRoute>
      </Layout>
    }
  />
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route, index) =>
            route.private ? (
              AddPrivateRoute(
                route.path,
                route.component,
                route.role,
                route?.admin
              )
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            )
          )}

          {/* Redireciona qualquer URL inválida para a Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
