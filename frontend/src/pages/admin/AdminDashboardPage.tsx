import { FaUsers } from "react-icons/fa";
import { useEffect } from "react";
import AdminDashboardCard from "@/components/AdminDashboardCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Store";
import { fetchStats } from "@/features/stats/statSlice";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import logo from "../../assets/images/logo-favicon.png";
import { MdCancel } from "react-icons/md";

const AdminDashboardPage = () => {
  const {
    userCount,
    transactionCount,
    successfulPayment,
    successfulTransaction,
    pendingTransaction,
    isLoading,
    expirePayment,
  } = useSelector((store: RootState) => store.stat);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchStats(null));
  }, []);
  if (isLoading) {
    return (
      <section className="grid place-items-center h-screen">
        <img src={logo} alt="logo" className="animate-bounce" />
      </section>
    );
  }
  return (
    <section className=" py-15 grid md:grid-cols-2 h-screen">
      <AdminDashboardCard icon={<FaUsers />} title="users" amount={userCount} />
      <AdminDashboardCard
        icon={<FaArrowsRotate />}
        title="transactions"
        amount={transactionCount}
      />
      <AdminDashboardCard
        icon={<FaArrowsRotate />}
        title="pending"
        amount={pendingTransaction}
      />
      <AdminDashboardCard
        icon={<IoCheckmarkCircle />}
        title="successful transaction"
        amount={successfulTransaction}
      />
      <AdminDashboardCard
        icon={<IoCheckmarkCircle />}
        title="successful payment"
        amount={successfulPayment}
      />
      <AdminDashboardCard
        icon={<MdCancel />}
        title="expire payment"
        amount={expirePayment}
      />
    </section>
  );
};

export default AdminDashboardPage;
