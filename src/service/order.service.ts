import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.utils";
import Cookies from "js-cookie";

export const OrderService = {
  placeOrder: async (orders: any): Promise<any> => {
    try {
      const token = Cookies.get("token");
      const response = await api.post(
        `/api/orders`,
        { orders },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchOrder: async () => {
    try {
      const token = Cookies.get("token");
      const response = await api.get(`/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchOrderById: async (id: string) => {
    try {
      const token = Cookies.get("token");
      const response = await api.get(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const useFetchOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => OrderService.fetchOrder(),
    retry: false,
  });
};

export const useFetchOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => OrderService.fetchOrderById(id),
    retry: false,
    enabled: !!id,
  });
};
