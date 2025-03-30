import api from "../utils/api.utils";
import { CartItem } from "../types/cart";
import Cookies from "js-cookie";

export const CartService = {
  fetchCart: async (): Promise<CartItem[]> => {
    try {
      const token = Cookies.get("token");
      const { data } = await api.get("/api/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  addToCart: async (item: CartItem): Promise<CartItem[]> => {
    try {
      const token = Cookies.get("token");
      const { data } = await api.post("/api/carts", item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  removeFromCart: async (id: CartItem["_id"]): Promise<CartItem[]> => {
    try {
      const token = Cookies.get("token");
      const { data } = await api.delete(`/api/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      const token = Cookies.get("token");
      const { data } = await api.put(
        `/api/carts/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
};
