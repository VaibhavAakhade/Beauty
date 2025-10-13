import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const register = async (email: string, password: string) => {
  return axios.post(`${API_URL}/register`, { email, password });
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const token = response.data;
  localStorage.setItem("token", token);
  return token;
};
