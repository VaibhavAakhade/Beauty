import axiosInstance from "./axiosConfig";
import { CheckoutFormData } from "@/components/checkout/CheckoutForm";

export const placeOrder = (userId: number, shippingDetails: CheckoutFormData) =>
  axiosInstance.post(`/orders/place/${userId}`, { shippingDetails });

export const getOrders = (userId: number) =>
  axiosInstance.get(`/orders/user/${userId}`);

export const getOrderDetails = (orderId: number, userId: number) =>
  axiosInstance.get(`/orders/details/${orderId}?userId=${userId}`);
