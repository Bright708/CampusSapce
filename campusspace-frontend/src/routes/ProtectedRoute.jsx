import { Navigate } from "react-router-dom";

import useAuthStore from "../store/authstore";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();

  console.log("PROTECTED ROUTE USER:", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
