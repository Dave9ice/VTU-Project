import type { RootState } from "@/Store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.user);
  //   console.log(user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
