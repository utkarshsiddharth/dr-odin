/*eslint linebreak-style: ["error", "windows"]*/
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
 
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
 
  children
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};
