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
import { useState } from "react";

const DashboardNavber = () => {
  const { user, isLoading } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

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
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className="flex items-center capitalize gap-1.5 text-secondary hover:cursor-pointer">
            <FaUser />
            <h2>{user?.firstName}</h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`bg-secondary z-20  w-40 p-4 mt-5 capitalize hover:cursor-pointer mr-4 transform  transition-all duration-1000 ease-in-out data-[state=open]:fade-in data-[state=close]:fade-out
            } `}
          >
            <DropdownMenuItem>
              <Link to="/dashboard/profile">profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={logout} className="capitalize">
                {isLoading ? "logging out" : "logout"}
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashboardNavber;
