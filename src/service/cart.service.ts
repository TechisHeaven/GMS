import api from "../utils/api.utils";
import { CartItem } from "../types/cart";

export const CartService = {
  fetchCart: async (): Promise<CartItem[]> => {
    try {
      const { data } = await api.get("/api/carts", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyOWU3Nzc4YTQxNjJiNjM3YzBjOWQiLCJpYXQiOjE3NDMwNzU2NTgsImV4cCI6MTc0MzE2MjA1OH0.qJu3oe01HAB8v5hiN75WTqFnITPzxrDzR3wMtldUnPQ",
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  addToCart: async (item: CartItem): Promise<CartItem[]> => {
    try {
      const { data } = await api.post("/api/carts", item, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyOWU3Nzc4YTQxNjJiNjM3YzBjOWQiLCJpYXQiOjE3NDMwNzU2NTgsImV4cCI6MTc0MzE2MjA1OH0.qJu3oe01HAB8v5hiN75WTqFnITPzxrDzR3wMtldUnPQ",
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  removeFromCart: async (id: CartItem["_id"]): Promise<CartItem[]> => {
    try {
      const { data } = await api.delete(`/api/carts/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyOWU3Nzc4YTQxNjJiNjM3YzBjOWQiLCJpYXQiOjE3NDMwNzU2NTgsImV4cCI6MTc0MzE2MjA1OH0.qJu3oe01HAB8v5hiN75WTqFnITPzxrDzR3wMtldUnPQ",
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  updateCart: async (
    id: CartItem["_id"],
    quantity: number
  ): Promise<CartItem[]> => {
    try {
      const { data } = await api.put(
        `/api/carts/${id}`,
        { quantity },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyOWU3Nzc4YTQxNjJiNjM3YzBjOWQiLCJpYXQiOjE3NDMwNzU2NTgsImV4cCI6MTc0MzE2MjA1OH0.qJu3oe01HAB8v5hiN75WTqFnITPzxrDzR3wMtldUnPQ",
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
};
