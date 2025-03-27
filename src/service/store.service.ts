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
};

export const useFetchFeaturedStore = (limit?: number) => {
  return useQuery({
    queryKey: ["featuredStores"],
    queryFn: () => StoreService.fetchFeaturedStores(limit),
    retry: false,
  });
};
