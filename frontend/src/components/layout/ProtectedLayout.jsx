import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const ProtectedLayout = () => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/signin?message=You must sign in first!" />;
  }
  return <Outlet />;
};

export default ProtectedLayout;
