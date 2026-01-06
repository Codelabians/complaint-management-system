// src/utils/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
  const token = useSelector((state) => state?.auth?.token ?? null);

  return token ? <Navigate to="/portal" replace /> : children;
}
export default PublicRoute;