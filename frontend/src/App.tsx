import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import DataPage from "./pages/dashboard/DataPage";
import CablePage from "./pages/dashboard/CablePage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ElectricityPage from "./pages/dashboard/ElectricityPage";
import ExamPage from "./pages/dashboard/ExamPage";
import AirtimePage from "./pages/dashboard/AirtimePage";
import PaymentPage from "./pages/PaymentPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import VerifyPage from "./pages/VerifyPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import ProtectAdminRoute from "./components/ProtectAdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import TransactionPage from "./pages/admin/TransactionPage";
import ForgottenPasswordEmailVerification from "./pages/ForgottenPasswordEmailVerification";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-account" element={<VerifyPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/forgottenpasswordemailverification"
          element={<ForgottenPasswordEmailVerification />}
        />
        <Route path="/payment" element={<PaymentPage />} />
        {/* USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <DashboardLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/data" element={<DataPage />} />
          <Route path="/dashboard/cable" element={<CablePage />} />
          <Route path="/dashboard/electricity" element={<ElectricityPage />} />
          <Route path="/dashboard/exams" element={<ExamPage />} />
          <Route path="/dashboard/airtime" element={<AirtimePage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
        </Route>
        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectAdminRoute>
              <AdminLayout />
            </ProtectAdminRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/transactions" element={<TransactionPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
