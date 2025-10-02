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
import PaymentPage from "./pages/dashboard/PaymentPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import VerifyPage from "./pages/VerifyPage";
import ProfilePage from "./pages/dashboard/ProfilePage";

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
        <Route path="/verify-email" element={<VerifyPage />} />
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
          <Route path="/dashboard/payment" element={<PaymentPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
