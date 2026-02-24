import { FaUsers } from "react-icons/fa";
import { useEffect } from "react";
import AdminDashboardCard from "@/components/AdminDashboardCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Store";
import { fetchStats } from "@/features/stats/statSlice";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

const AdminDashboardPage = () => {
  const {
    userCount,
    transactionCount,
    successfulPayment,
    successfulTransaction,
    pendingTransaction,
  } = useSelector((store: RootState) => store.stat);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchStats(null));
  }, []);
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
    </section>
  );
};

export default AdminDashboardPage;
