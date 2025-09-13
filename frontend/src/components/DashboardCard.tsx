import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Link } from "react-router-dom";

type dashBoardProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
  href: string;
};

const DashboardCard = ({ title, text, icon, href }: dashBoardProps) => {
  return (
    <Link to={href}>
      <Card className="flex flex-row justify-between items-center capitalize">
        <CardHeader>
          <div>
            <h2 className="text-primary uppercase text-xs tracking-wider flex-1 min-w-0">
              {title}
            </h2>
            <h2 className="font-bold tracking-wide text-gray-500 text-lg">
              {text}
            </h2>
          </div>
        </CardHeader>
        <CardContent className="text-3xl text-primary">{icon}</CardContent>
      </Card>
    </Link>
  );
};

export default DashboardCard;
