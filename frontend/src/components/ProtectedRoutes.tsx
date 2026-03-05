import { logoutUser } from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const INACTIVITY_TIME = 5 * 60 * 1000;
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.user);
  //   console.log(user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logoutUser({}));
    navigate("/login");
  }, [dispatch, navigate]);

  useEffect(() => {
    // If not logged in, don't even start the listeners
    // if (!user) return;

    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(handleLogout, INACTIVITY_TIME);
    };

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Start initial countdown

    return () => {
      if (timer) clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [handleLogout, user]);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
