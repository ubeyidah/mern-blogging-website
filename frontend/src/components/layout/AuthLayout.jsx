import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const AuthLayout = () => {
  const { user } = useAuthContext();
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AuthLayout;
