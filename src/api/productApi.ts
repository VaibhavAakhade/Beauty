import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await axios.post(`${API_BASE_URL}/products`, product);
  return response.data;
};
