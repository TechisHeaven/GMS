import { UpdateUserProps, User } from "../types/user";
import api from "../utils/api.utils";
import Cookies from "js-cookie";

export const UserService = {
  updateUser: async (
    newProfileData?: UpdateUserProps
  ): Promise<{ user: User; message: string }> => {
    try {
      const token = Cookies.get("token");
      const { data } = await api.put(
        "/api/user",
        { ...newProfileData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data, newProfileData);
      return data;
    } catch (error) {
      throw error;
    }
  },
};
