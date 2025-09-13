import React from "react";
import LinksDropDown from "./LinksDropDown";
import { links } from "@/utils/links";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store";
export const alignment =
  "w-[95%] mx-auto max-w-[500px] md:max-w-3xl lg:max-w-4xl xl:max-w-6xl";
const Navbar = () => {
  const { user } = useSelector((store: RootState) => store.user);
  return (
    <nav className=" bg-white h-16 text-primary fixed top-0 left-0 w-full shadow-2xl">
      <div className={`flex justify-between items-center h-full ${alignment}`}>
        <h2>logo</h2>
        <div className="hidden md:flex gap-x-4">
          {links.map((link) => {
            if (user && (link.label === "login" || link.label === "register")) {
              return null;
            }
            return (
              <Link
                to={link.href}
                key={link.id}
                className="capitalize hover:underline"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <LinksDropDown />
      </div>
    </nav>
  );
};

export default Navbar;
