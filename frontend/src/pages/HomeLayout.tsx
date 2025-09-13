import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import HomeFooter from "@/components/HomeFooter";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <HomeFooter />
    </>
  );
};

export default HomeLayout;
