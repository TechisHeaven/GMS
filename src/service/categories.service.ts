import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.utils";

export const CategoriesService = {
  fetchFeaturedCategories: async () => {
    try {
      const response = await api.get("/api/categories/featured");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchCategoryById: async (id: string) => {
    try {
      const response = await api.get(`/api/categories/category/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["featuredCategories"],
    queryFn: CategoriesService.fetchFeaturedCategories,
    retry: false,
  });
};
export const useFetchCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => CategoriesService.fetchCategoryById(id),
    enabled: !!id,
    retry: false,
  });
};
