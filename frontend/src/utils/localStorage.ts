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
