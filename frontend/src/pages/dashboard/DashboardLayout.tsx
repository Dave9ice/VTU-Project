import DashboardNavber from "@/components/DashboardNavber";
import DashboardSideBar from "@/components/DashboardSideBar";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <main className="relative md:grid md:grid-cols-10">
      <DashboardSideBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname} // This KEY is the secret sauce!
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-7 lg:col-span-8"
        >
          <DashboardNavber />
          <div className="bg-gray-100">
            <Outlet />
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default DashboardLayout;
//  <div className="md:col-span-7 lg:col-span-8">
//         <DashboardNavber />
//         <div className="bg-gray-100">
//           <Outlet />
//         </div>
