// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children }) => {
//   const user = useSelector((state) => state.user.userInfo); // Verifica si hay un usuario autenticado

//   return user ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children,requiredRole  }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  if (!userInfo) {
    // If the user is not logged in, return a Navigate component to redirect
    return <Navigate to="/signin" replace />;
  }

  return children; // Render children (protected content) if the user is logged in
};

export default ProtectedRoute;
