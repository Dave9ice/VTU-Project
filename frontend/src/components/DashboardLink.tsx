import React from "react";
import { Link } from "react-router-dom";
type dashboardlinkprops = {
  text: string;
  icon: React.ReactNode;
};

const DashboardLink = ({ text, icon }: dashboardlinkprops) => {
  return (
    <div className="bg-transparent transform transition-transform duration-150   justify-start py-4 text-gray-600 border-b-2 capitalize hover:underline hover:translate-x-1.5 hover:text-gray-400 p-4">
      <Link to={`/dashboard/${text}`} className="flex gap-4 items-center ">
        {icon}
        <h2>{text}</h2>
      </Link>
    </div>
  );
};

export default DashboardLink;
