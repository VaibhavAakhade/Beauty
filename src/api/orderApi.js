import axiosInstance from "./axiosConfig";
export const placeOrder = (userId) => axiosInstance.post(`/orders/place/${userId}`);
export const getOrders = (userId) => axiosInstance.get(`/orders/user/${userId}`);
export const getOrderDetails = (orderId, userId) => axiosInstance.get(`/orders/details/${orderId}?userId=${userId}`);
