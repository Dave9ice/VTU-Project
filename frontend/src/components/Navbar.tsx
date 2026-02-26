import LinksDropDown from "./LinksDropDown";
import { links } from "@/utils/links";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store";
import logo from "../assets/images/logo-favicon.png";
export const alignment =
  "w-[95%] mx-auto max-w-[500px] md:max-w-3xl lg:max-w-4xl xl:max-w-6xl";
const Navbar = () => {
  const { user } = useSelector((store: RootState) => store.user);
  return (
    <nav className=" bg-white h-16 text-primary fixed top-0 left-0 w-full shadow-2xl">
      <div className={`flex justify-between items-center h-full ${alignment}`}>
        {/* logo */}
        <img src={logo} alt="logo" className="h-10 w-10 md:h-12 md:w-12" />
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
