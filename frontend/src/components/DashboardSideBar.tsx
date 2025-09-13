import React from "react";
import DashboardLink from "./DashboardLink";
import { FaTachometerAlt, FaWifi, FaLaptop } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { FaDroplet } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { Separator } from "./ui/separator";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/Store";
import { MdCancel } from "react-icons/md";
import { Button } from "./ui/button";
import { toggleSidebar } from "@/features/user/userSlice";

const DashboardSideBar = () => {
  const { showSideBar } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  return (
    <aside
      className={`w-[15rem] fixed h-screen  top-0 left-0 transform transition-transform duration-300 -translate-x-full  ${
        showSideBar ? "translate-x-0" : ""
      } md:translate-x-0 md:col-span-3 md:relative md:w-full lg:col-span-2 `}
    >
      <header className="h-15 bg-primary flex gap-2 justify-between items-center">
        <h2>logo</h2>
        <h2>logo image</h2>
        <Button onClick={() => dispatch(toggleSidebar())}>
          <MdCancel />
        </Button>
      </header>
      <main className=" grid ">
        <DashboardLink
          text="dashboard"
          icon={<FaTachometerAlt className="text-primary text-2xl" />}
        />

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
