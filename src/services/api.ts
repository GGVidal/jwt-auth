import axios from "axios";

const api = axios.create({
  baseURL: "https://api-onecloud.multicloud.tivit.com/fake",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (username: string, password: string) => {
  const response = await api.post("/token", null, {
    params: { username, password },
  });
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
