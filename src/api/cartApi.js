import axiosInstance from "./axiosConfig";
export const addToCart = (userId, productId, quantity = 1) => axiosInstance.post(`/cart/add`, { userId, productId, quantity });
export const getCartItems = (userId) => axiosInstance.get(`/cart/${userId}`);
export const removeFromCart = (userId, productId) => axiosInstance.delete(`/cart/${userId}/product/${productId}`);
export const clearCart = (userId) => axiosInstance.delete(`/cart/clear/${userId}`);
export const updateCartItem = (userId, productId, quantity) => axiosInstance.put(`/cart/${userId}/product/${productId}?qty=${quantity}`);
