import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TbHistory } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { FaWifi, FaLaptop } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";

import React from "react";
import DashboardModal from "@/components/DashboardModal";

const Dashboard = () => {
  return (
    <section className="py-8 px-4">
      <header className="capitalize flex flex-col md:flex-row md:justify-between mb-8">
        <h2>dashboard</h2>
        <h2>breadcrumbs</h2>
      </header>
      <div className="grid md:grid-cols-2 gap-4 items-center">
        <Card className="flex flex-row justify-between items-center capitalize">
          <CardHeader>
            <h1>balance</h1>
            <p>#0</p>
          </CardHeader>
          <CardContent>
            <DashboardModal />
          </CardContent>
        </Card>
        <DashboardCard
          title="transactions"
          text="transaction history"
          href="/dashboard/transctions"
          icon={<TbHistory />}
        />
      </div>
      <main className="grid md:grid-cols-2 mt-8 gap-4">
        <DashboardCard
          title="airtime"
          text="buy airtime"
          href="/dashboard/airtime"
          icon={<FiPhoneCall />}
        />
        <DashboardCard
          title="data"
          text="buy data"
          href="/dashboard/data"
          icon={<FaWifi />}
        />
        <DashboardCard
          title="cable bill"
          text="subscribe tv bills"
          href="/dashboard/cable"
          icon={<FaLaptop />}
        />
        <DashboardCard
          title="electricity"
          text="pay electricity bill"
          href="/dashboard/electricity"
          icon={<FaDroplet />}
        />
        <DashboardCard
          title="exam"
          text="exam recharge pin"
          href="/dashboard/exam"
          icon={<TfiWrite />}
        />
      </main>
    </section>
  );
};

export default Dashboard;
