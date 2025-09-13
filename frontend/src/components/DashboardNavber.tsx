import React from "react";
import { FaBars } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Store";
import { logoutUser, toggleSidebar } from "@/features/user/userSlice";

const DashboardNavber = () => {
  const { showSideBar, user, isLoading } = useSelector(
    (store: RootState) => store.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(logoutUser({}));
  };
  return (
    <nav
      className={` h-15 bg-primary transform transition-transform duration-300`}
    >
      <div className="flex justify-between h-full items-center px-4 md:px-8 lg:px-10">
        <Button
          size="icon"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <FaBars />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <FaUser />
            <h2>{user?.name}</h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/dashboard/profile">profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={logout} className="capitalize">
                {isLoading ? "logging out" : "logout"}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashboardNavber;
