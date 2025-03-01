// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import OpervexAPI from "../utils/OpervexAPI2";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRoles = localStorage.getItem("roles");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedUser && expirationTime) {
      if (new Date().getTime() < Number(expirationTime)) {
        setUser(JSON.parse(storedUser));
        if (storedRoles) setRoles(JSON.parse(storedRoles));
      } else {
        logout();
      }
    }

    setLoading(false);
  }, []);

  // 🔄 Função de login
  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/Auth`, {
        username,
        password,
      });

      console.log("AQUI");

      if (data?.message === "success") {
        const userData = {
          id: data.id,
          username: data.username,
          fullname: data.fullname,
          email: data.email,
          image: data.image || "https://avatars.githubusercontent.com/u/19550456",
          token: data.token,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        localStorage.setItem("expirationTime", String(Date.now() + data.expiresIn * 1000));

        setUser(userData);

        const rolesUser = await OpervexAPI.get(`/System/Users/${data.id}/Profile`);
        localStorage.setItem("roles", JSON.stringify(rolesUser));
        setRoles(rolesUser);

        setLoading(false);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  // 🚀 Logout
  const logout = async () => {
    await OpervexAPI.logout();
    setUser(null);
    setRoles(null);
  };

  return <AuthContext.Provider value={{ user, roles, login, logout, loading }}>{children}</AuthContext.Provider>;
};

// Hook personalizado
export const useAuth = () => useContext(AuthContext);
