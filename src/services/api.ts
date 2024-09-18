import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  },
});

export const login = async (username: string, password: string) => {
  const response = await api.post(
    "/login",
    {},
    {
      params: { username, password },
    }
  );
  return response.data;
};

export const getUserData = async (token: string) => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAdminData = async (token: string) => {
  const response = await api.get("/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default api;
