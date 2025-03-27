import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.utils";

export const OrderService = {
  placeOrder: async (orders: any): Promise<any> => {
    try {
      const response = await api.post(
        `/api/orders`,
        { orders },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyOWU3Nzc4YTQxNjJiNjM3YzBjOWQiLCJpYXQiOjE3NDMwNzU2NTgsImV4cCI6MTc0MzE2MjA1OH0.qJu3oe01HAB8v5hiN75WTqFnITPzxrDzR3wMtldUnPQ",
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
      const response = await api.get(`/api/orders`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyOWU3Nzc4YTQxNjJiNjM3YzBjOWQiLCJpYXQiOjE3NDMwNzU2NTgsImV4cCI6MTc0MzE2MjA1OH0.qJu3oe01HAB8v5hiN75WTqFnITPzxrDzR3wMtldUnPQ",
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
