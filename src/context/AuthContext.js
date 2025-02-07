// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirectPath, setRedirectPath] = useState("/");

  // Verificar se há um usuário logado no localStorage ao carregar o app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedUser && expirationTime && new Date().getTime() < expirationTime) {
      setUser(JSON.parse(storedUser));
    } else {
      logout(); // Limpa o localStorage se o login expirou
    }
  }, []);

  const login = (username, password) => {
    // Simulação de login
    if (username === "admin" && password === "1234") {
      const userData = { username };
      const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hora

      // Salva no localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("expirationTime", expirationTime);

      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    // Remove do localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, redirectPath, setRedirectPath }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
