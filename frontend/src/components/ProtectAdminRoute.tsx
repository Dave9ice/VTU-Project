import type { RootState } from "@/Store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.user);
  if (user?.role !== "admin") {
    return <Navigate to={"/"} />;
  } else return children;
};

export default ProtectAdminRoute;
