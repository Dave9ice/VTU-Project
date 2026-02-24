import type { User } from "./types";

export const setUserToLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user: User = result ? JSON.parse(result) : null;
  return user;
};
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};
