import DashboardNavber from "@/components/DashboardNavber";
import DashboardSideBar from "@/components/DashboardSideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <main className="relative md:grid md:grid-cols-10">
      <DashboardSideBar />
      <div className="md:col-span-7 lg:col-span-8">
        <DashboardNavber />
        <div className="bg-gray-100">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
