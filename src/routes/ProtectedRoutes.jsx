// src/utils/PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ allowedRoles }) {
  const { token, user } = useSelector((state) => state.auth);

  console.log("[Protected] token:", !!token ? "exists" : "MISSING");
  console.log("[Protected] user role:", user?.role);

  if (!token) {
    console.log("[Protected] No token → redirect to login");
    return <Navigate to="/login" replace />;
  }

  // Optional role check (uncomment when ready)
  // if (allowedRoles && !allowedRoles.includes(user?.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  console.log("[Protected] Authorized → rendering children");

  // Instead of element prop, we render the nested routes
  return <Outlet />;
}

export default ProtectedRoutes;