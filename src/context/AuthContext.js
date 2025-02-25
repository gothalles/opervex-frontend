// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de loading

  // Verifica se há um usuário salvo no localStorage ao carregar o app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRoles = localStorage.getItem("roles");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedUser && expirationTime) {
      if (new Date().getTime() < new Date(expirationTime).getTime()) {
        setUser(JSON.parse(storedUser)); // ✅ Convertendo apenas se houver dados válidos

        if (storedRoles) setRoles(JSON.parse(storedRoles)); // ✅ Convertendo apenas se houver dados válidos
      } else {
        logout(); // ✅ Limpa localStorage se o login expirou
      }
    }

    setLoading(false); // Marca como carregado após verificar localStorage
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/Auth`, {
        username,
        password,
      });

      if (data.message === "success") {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/System/Users/${data.id}/Profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        });

        const userData = {
          id: data.id,
          username: data.username,
          fullname: data.fullname,
          email: data.email,
          image: data.image || "https://avatars.githubusercontent.com/u/19550456", // Definir uma imagem padrão
          token: data.token,
        };

        const rolesUser = await response.json();

        // Salva os dados no localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("roles", JSON.stringify(rolesUser));
        localStorage.setItem("expirationTime", data.expiresIn);

        setUser(userData); // ✅ Atualiza o estado do usuário
        setRoles(rolesUser);
        setLoading(false); // Após o login, definimos o loading como false

        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    localStorage.removeItem("expirationTime");
    setUser(null);
    setRoles(null);
  };

  return <AuthContext.Provider value={{ user, roles, login, logout, loading }}>{children}</AuthContext.Provider>;
};

// Hook personalizado para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
