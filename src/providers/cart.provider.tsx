import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartService } from "../service/cart.service";
import { CartItem } from "../types/cart";
import Cookies from "js-cookie";
import { useAuth } from "./auth.provider";

// Define Context Type
interface CartContextType {
  cart: CartItem[];
  isLoading: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const token = Cookies.get("token");
  // React Query: Fetch Cart
  const { data: cart = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: CartService.fetchCart,
    enabled: !!token && isAuthenticated,
    retry: 3,
  });

  // Mutations for Updating Cart
  const addMutation = useMutation({
    mutationFn: (item: CartItem) => CartService.addToCart(item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => CartService.removeFromCart(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      CartService.updateCart(id, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  // Cart Functions
  const addToCart = (item: CartItem) => addMutation.mutate(item);
  const removeFromCart = (id: string) => removeMutation.mutate(id);
  const updateQuantity = (id: string, quantity: number) =>
    updateMutation.mutate({ id, quantity });
  const clearCart = () => queryClient.setQueryData(["cart"], []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
