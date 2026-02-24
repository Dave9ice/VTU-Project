import AdminSideBar from "@/components/AdminSideBar";
import DashboardNavber from "@/components/DashboardNavber";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <main className="relative md:grid md:grid-cols-10">
      <AdminSideBar />
      <div className="md:col-span-7 lg:col-span-8">
        <DashboardNavber />
        <div className="bg-gray-100">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
