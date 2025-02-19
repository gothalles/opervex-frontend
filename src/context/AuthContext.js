// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de loading

  // Verifica se há um usuário salvo no localStorage ao carregar o app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedUser && expirationTime) {
      if (new Date().getTime() < new Date(expirationTime).getTime()) {
        setUser(JSON.parse(storedUser)); // ✅ Convertendo apenas se houver dados válidos
      } else {
        logout(); // ✅ Limpa localStorage se o login expirou
      }
    }

    setLoading(false); // Marca como carregado após verificar localStorage
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
        username,
        password,
      });

      console.log(data);

      if (data.message === "success") {
        const userData = {
          username: data.username,
          fullname: data.fullname,
          email: data.email,
          image: data.image || "https://avatars.githubusercontent.com/u/19550456", // Definir uma imagem padrão
          token: data.token,
        };

        // Salva os dados no localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("expirationTime", data.expiresIn);

        setUser(userData); // ✅ Atualiza o estado do usuário
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
    console.log("Aqui -> AuthContext -> logout");

    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    setUser(null);

    // navigate("/login"); // Redireciona para a página de login
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};

// Hook personalizado para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
