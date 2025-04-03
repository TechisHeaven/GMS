import React, { createContext, useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/user";
import { AuthService } from "../service/auth.service";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Define Context Type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  verifyUser: () => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const token = Cookies.get("token");
  // React Query: Verify User
  const {
    refetch: verifyUser,
    data: user = null,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => AuthService.verifyToken(token!),
    enabled: !!token,
    select: (user) => user.user,
    retry: 3,
  });

  useEffect(() => {
    if (isError) logout();
  }, [isError]);

  // Mutation for Login
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.login(email, password),
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      // Cookies.set("token", data.token, { sameSite: "strict" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      verifyUser();
    },
    onError: (data: any) => {
      toast.error(data.response.data.message);
    },
  });
  // Mutation for Login
  const registerMutation = useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => AuthService.register(fullName, email, password),
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      verifyUser();
    },
    onError: (data: any) => {
      toast.error(data.response.data.message);
    },
  });

  // Auth Functions
  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    await registerMutation.mutateAsync({ fullName, email, password });
  };

  const logout = async () => {
    Cookies.remove("token");
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.removeQueries({ queryKey: ["user"] });
    verifyUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !!Cookies.get("token"),
        isLoading:
          isLoading || loginMutation.isPending || registerMutation.isPending,
        login,
        register,
        logout,
        verifyUser: async () => {
          await verifyUser();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
