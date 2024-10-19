import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, authenticatedUser, requiredRole }) => {
  if (authenticatedUser && authenticatedUser?.role !== requiredRole) {
    // If the user role doesn't match, redirect to a 404 page or Access Denied
    return <Navigate to="/access-denied" />;
  }

  // If the user is authenticated and has the required role, render the children components
  return children;
};

export default PrivateRoute;
