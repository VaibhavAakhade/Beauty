import AxiosInstance from "./axiosConfig";
const API_URL = "/auth";
export const register = async (email, password) => {
    return AxiosInstance.post(`${API_URL}/register`, { email, password });
};
export const login = async (email, password) => {
    const response = AxiosInstance.post(`${API_URL}/login`, { email, password });
    const token = (await response).data;
    localStorage.setItem("token", token);
    return token;
};
export const sendResetOtp = async (email) => {
    return AxiosInstance.post(`${API_URL}/send-otp`, { email });
};
export const verifyOtp = async (email, otp) => {
    return AxiosInstance.post(`${API_URL}/verify-otp`, { email, otp });
};
export const resetPassword = async (email, otpOrToken, newPassword) => {
    return AxiosInstance.post(`${API_URL}/reset-password`, { email, otpOrToken, newPassword });
};
