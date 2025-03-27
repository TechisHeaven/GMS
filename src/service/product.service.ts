import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.utils";

export const ProductService = {
  fetchFeaturedProducts: async (page?: number, limit?: number) => {
    try {
      const response = await api.get(
        `/api/products/featured-products/top?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchProductById: async (id: string) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchProducts: async (id?: string | null) => {
    try {
      if (id) {
        const response = await api.get(`/api/products/category/${id}`);
        return response.data;
      }
      const response = await api.get(`/api/products/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchSimilarProductsByIdInStore: async (id?: string | null) => {
    try {
      const response = await api.get(`/api/products/${id}/other-stores`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchSimilarProductsById: async (id?: string | null) => {
    try {
      const response = await api.get(`/api/products/${id}/related`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const useFetchFeaturedProducts = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ["featuredProducts"],
    queryFn: () => ProductService.fetchFeaturedProducts(page, limit),
    retry: false,
  });
};
export const useFetchProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => ProductService.fetchProductById(id),
    enabled: !!id,
    retry: false,
  });
};
export const useFetchSimilarProducts = (id: string) => {
  return useQuery({
    queryKey: ["other-store", id],
    queryFn: () => ProductService.fetchSimilarProductsByIdInStore(id),
    enabled: !!id,
    retry: false,
  });
};
export const useFetchProducts = (id?: string | null) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => ProductService.fetchProducts(id),
    retry: false,
  });
};
export const useRelatedProducts = (id?: string | null) => {
  return useQuery({
    queryKey: ["similar-products", id],
    queryFn: () => ProductService.fetchSimilarProductsById(id),
    retry: false,
  });
};
