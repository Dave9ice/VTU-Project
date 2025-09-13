import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { alignment } from "./Navbar";
const HomeFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black p-10 text-white text-center">
      <div
        className={`${alignment} flex flex-col md:flex-row md:justify-between md:items-center items-center`}
      >
        <p className="capitalize text-xl">
          &copy; copyright {year}{" "}
          <Link
            to="/"
            className="text-primary hover:underline hover:text-gray-700"
          >
            biggiesub
          </Link>{" "}
          all right reserved{" "}
          <Link
            to="/terms"
            className="text-primary hover:underline hover:text-gray-700"
          >
            terms & condition
          </Link>
          |
          <Link
            to="/policy"
            className="text-primary hover:underline hover:text-gray-700"
          >
            privacy policy
          </Link>
        </p>
        <div className="flex mt-4 md:mt-0 justify-center text-primary text-2xl">
          <Link to="#">
            <FaFacebook />
          </Link>
          <Link to="#">
            <BsTwitterX />
          </Link>
          <Link to="#">
            <FaInstagram />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
