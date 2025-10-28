import axiosInstance from "./axiosConfig";

export const placeOrder = (userId: number) =>
  axiosInstance.post(`/orders/place/${userId}`);

export const getOrders = (userId: number) =>
  axiosInstance.get(`/orders/user/${userId}`);

export const getOrderDetails = (orderId: number, userId: number) =>
  axiosInstance.get(`/orders/details/${orderId}?userId=${userId}`);
