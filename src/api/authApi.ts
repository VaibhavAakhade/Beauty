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

export const sendResetOtp = async (email: string) => {
  return AxiosInstance.post(`${API_URL}/send-otp`, { email });
};

export const verifyOtp = async (email: string, otp: string) => {
  return AxiosInstance.post(`${API_URL}/verify-otp`, { email, otp });
};

export const resetPassword = async (email: string, otpOrToken: string, newPassword: string) => {
  return AxiosInstance.post(`${API_URL}/reset-password`, { email, otpOrToken, newPassword });
};
