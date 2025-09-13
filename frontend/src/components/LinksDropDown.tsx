import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { FaBars } from "react-icons/fa";
import { Button } from "./ui/button";
import { links } from "@/utils/links";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store";

const LinksDropDown = () => {
  const { user } = useSelector((store: RootState) => store.user);

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <FaBars />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-secondary mt-4  transition ease-out duration-300  data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[state=open]:fade-in data-[state=closed]:fade-out"
        >
          {links.map((link) => {
            if (user && (link.label === "login" || link.label === "register")) {
              return null;
            }
            return (
              <DropdownMenuItem key={link.id}>
                <Link to={link.href} className="capitalize ">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LinksDropDown;
