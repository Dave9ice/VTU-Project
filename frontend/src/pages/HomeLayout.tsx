import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import HomeFooter from "@/components/HomeFooter";
import { motion, AnimatePresence } from "framer-motion";

const HomeLayout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname} // This KEY is the secret sauce!
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="pt-16"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <HomeFooter />
    </>
  );
};

export default HomeLayout;
