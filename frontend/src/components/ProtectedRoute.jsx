

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;