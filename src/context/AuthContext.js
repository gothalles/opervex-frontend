// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirectPath, setRedirectPath] = useState("/");

  // Verificar se há um usuário logado no localStorage ao carregar o app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedUser && expirationTime && new Date().getTime() < new Date(expirationTime).getTime()) {
      setUser(JSON.parse(storedUser)); // ✅ Convertendo para objeto
    } else {
      logout(); // Limpa o localStorage se o login expirou
    }
  }, []);

  const login = async (username, password) => {
    const data = { username, password };

    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth`, data)
      .then((response) => {
        if ("success" === response.data.message) {
          const userData = {
            username: response.data.username,
            fullname: response.data.fullname,
            token: response.data.token,
          };

          // Salva no localStorage
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("expirationTime", response.data.expiresIn);

          setUser(JSON.parse(userData));
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  };

  const logout = () => {
    // Remove do localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");

    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, redirectPath, setRedirectPath }}>{children}</AuthContext.Provider>;
};

// Hook personalizado para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
