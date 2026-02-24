import React from "react";
import { Card } from "./ui/card";

type AdminDashboardCardProps = {
  icon: React.ReactNode;
  title: string;
  amount: number;
};

const AdminDashboardCard = ({
  icon,
  title,
  amount,
}: AdminDashboardCardProps) => {
  return (
    <Card className="grid w-full max-w-[27rem] mx-auto mb-4">
      <h2 className="text-3xl flex gap-x-4 items-center uppercase justify-self-center">
        {title}
        <span className="text-primary">{icon}</span>
      </h2>
      <h2 className="justify-self-center text-3xl font-bold">{amount}</h2>
    </Card>
  );
};

export default AdminDashboardCard;
