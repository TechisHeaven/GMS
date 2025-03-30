import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";
import { useEffect } from "react";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  return (
    !isAuthenticated && (
      <div className="font-display bg-gray-50">
        <Outlet />
      </div>
    )
  );
}
