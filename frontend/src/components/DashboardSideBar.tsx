import DashboardLink from "./DashboardLink";
import { FaTachometerAlt, FaWifi, FaLaptop } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { FaDroplet } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/Store";
import { MdCancel } from "react-icons/md";
import { Button } from "./ui/button";
import { toggleSidebar } from "@/features/user/userSlice";
import logo from "../assets/images/logo-favicon.png";
import logoImage from "../assets/images/logo-dark-transparent.png";
import { Link } from "react-router-dom";

const DashboardSideBar = () => {
  const { showSideBar } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  return (
    <aside
      className={`w-[15rem] fixed h-screen bg-secondary  top-0 left-0 transform transition-transform duration-300 -translate-x-full  ${
        showSideBar ? "translate-x-0" : ""
      } md:translate-x-0 md:col-span-3 md:relative md:w-full lg:col-span-2 `}
    >
      <header className="h-15 bg-primary flex gap-2 justify-between md:justify-center items-center">
        <img src={logo} alt="logo" className="h-10 w-10" />
        <div className="bg-secondary w-30 md:w-40 md:justify-self-center">
          {" "}
          <img src={logoImage} alt="logo" />
        </div>
        {/* <h2>logo image</h2> */}
        <Button onClick={() => dispatch(toggleSidebar())} className="md:hidden">
          <MdCancel className="h-10 w-10" />
        </Button>
      </header>
      <main className=" grid bg-secondary">
        <div className="bg-transparent transform transition-transform duration-150   justify-start py-4 text-gray-600 border-b-2 capitalize hover:underline hover:translate-x-1.5 hover:text-gray-400 p-4">
          <Link to="/dashboard" className="flex gap-4 items-center ">
            <FaTachometerAlt />
            <h2>dashboard</h2>
          </Link>
        </div>

        <DashboardLink
          text="data"
          icon={<FaWifi className="text-primary text-2xl" />}
        />

        <DashboardLink
          text="cable"
          icon={<FaLaptop className="text-primary text-2xl" />}
        />
        <DashboardLink
          text="airtime"
          icon={<FiPhoneCall className="text-primary text-2xl" />}
        />
        <DashboardLink
          text="electricity"
          icon={<FaDroplet className="text-primary text-2xl" />}
        />
        <DashboardLink
          text="exams"
          icon={<TfiWrite className="text-primary text-2xl" />}
        />
      </main>
    </aside>
  );
};

export default DashboardSideBar;
