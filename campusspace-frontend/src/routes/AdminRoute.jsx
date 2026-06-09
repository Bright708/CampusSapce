import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authstore";

const AdminRoute = ({ children }) => {
  const { user, role } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
