import AxiosInstance  from "./axiosConfig";

const API_URL = "/auth";

export const register = async (email: string, password: string) => {
  return AxiosInstance.post(`${API_URL}/register`, { email, password });
};

export const login = async (email: string, password: string) => {
  const response = AxiosInstance.post(`${API_URL}/login`, { email, password });
  const token = (await response).data;
  localStorage.setItem("token", token);
  return token;
};
