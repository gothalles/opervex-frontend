// src/Opervex/OpervexAPI.js

import axios from "axios";

class OpervexAPI {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      //withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptador de requisições
    this.api.interceptors.request.use(
      (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptador de respostas
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          console.log("Token expirado ou inválido. Tentando renovar...");
          error.config._retry = true;
          const newToken = await this.refreshToken();

          if (newToken) {
            console.log("Novo token obtido");
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return this.api(error.config);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async refreshToken() {
    try {
      const response = await this.api.get("/Refresh");
      const newAccessToken = response.data.accessToken;
      console.log("Novo token obtido:", newAccessToken); // Log do novo token

      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.token = newAccessToken;
        localStorage.setItem("user", JSON.stringify(user));
      }

      return newAccessToken;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      this.logout();
      return null;
    }
  }

  async get(path) {
    return await this.api
      .get(path)
      .then((res) => res.data)
      .catch((error) => error.response?.data || error.message);
  }

  async post(path, body) {
    return this.api
      .post(path, JSON.stringify(body))
      .then((res) => res.data)
      .catch((error) => error.response?.data || error.message);
  }

  async put(path, body) {
    return this.api
      .put(path, JSON.stringify(body))
      .then((res) => res.data)
      .catch((error) => error.response.data);
  }

  async logout() {
    try {
      await this.api.post("/Logout");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    localStorage.removeItem("expirationTime");
  }
}

export default new OpervexAPI(); // eslint-disable-next-line
