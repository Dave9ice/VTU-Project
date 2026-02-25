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

export const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Shows 00:59:59 instead of 3599 seconds
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
