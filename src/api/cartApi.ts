import axiosInstance from "./axiosConfig";

export const addToCart = (userId: number, productId: number, quantity = 1) =>
  axiosInstance.post(`/cart/add`, { userId, productId, quantity });

export const getCartItems = (userId: number) =>
  axiosInstance.get(`/cart/${userId}`);

export const removeFromCart = (userId: number, productId: number) =>
  axiosInstance.delete(`/cart/${userId}/product/${productId}`);

export const clearCart = (userId: number) =>
  axiosInstance.delete(`/cart/clear/${userId}`);

export const updateCartItem = (
  userId: number,
  productId: number,
  quantity: number
) => axiosInstance.put(`/cart/${userId}/product/${productId}?qty=${quantity}`);
