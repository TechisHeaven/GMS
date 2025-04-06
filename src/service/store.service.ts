import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.utils";

export const StoreService = {
  fetchFeaturedStores: async (limit?: number) => {
    try {
      const response = await api.get(`/api/stores/top/store?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchStoreById: async (id: string) => {
    try {
      const response = await api.get(`/api/stores/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchStoreProducts: async (
    id: string,
    page?: number,
    limit?: number,
    sortBy?: string,
    order?: string
  ) => {
    try {
      const response = await api.get(
        `/api/stores/${id}/products?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const useFetchFeaturedStore = (limit?: number) => {
  return useQuery({
    queryKey: ["featuredStores"],
    queryFn: () => StoreService.fetchFeaturedStores(limit),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
export const useFetchStoreById = (id: string) => {
  return useQuery({
    queryKey: ["store", id],
    queryFn: () => StoreService.fetchStoreById(id),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
export const useFetchProductsStore = (id: string) => {
  return useQuery({
    queryKey: ["store", id, "products"],
    queryFn: () => StoreService.fetchStoreProducts(id),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
