import AxiosInstance from "../config/axiosConfig";

const API_URL = "/auth";

export const register = async (email: string, password: string): Promise<void> => {
  await AxiosInstance.post(`${API_URL}/register`, { email, password });
};

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await AxiosInstance.post<{ token: string }>(`${API_URL}/login`, {
      email,
      password,
    });

    const { token } = response.data;

    // Store token in localStorage
    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    // Optional: Log and rethrow or handle
    console.error("Login failed", error);
    throw error;
  }
};
