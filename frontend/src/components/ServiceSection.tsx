import { alignment } from "./Navbar";
import airtimeImage from "../assets/images/airtime.jpg";
import dataImage from "../assets/images/data.jpg";
import cableImage from "../assets/images/cable.jpg";

import ElectricityImage from "../assets/images/electricity.jpg";
import { FaHome, FaWifi, FaLaptop } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";

import ServiceCard from "./ServiceCard";

const ServiceSection = () => {
  return (
    <section className="py-10 bg-gray-100 grid relative">
      <h2 className="capitalize text-2xl text-center mb-2 text-primary">
        services we offer
      </h2>
      <div className="w-20 h-1 bg-primary justify-self-center mt-0 mb-4"></div>
      <div
        className={`${alignment} grid gap-4
      md:grid-cols-2`}
      >
        <ServiceCard
          title="airtime"
          img={airtimeImage}
          icon={<FaHome />}
          description="get up to 3% discount when you recharge"
        />
        <ServiceCard
          title="data"
          img={dataImage}
          icon={<FaWifi />}
          description="get internet data as low as 65 naira"
        />
        <ServiceCard
          title="cable"
          img={cableImage}
          icon={<FaLaptop />}
          description="make payment for your gtv,dst and startime without any hassle"
        />
        <ServiceCard
          title="electricity"
          img={ElectricityImage}
          icon={<FaDroplet />}
          description="pay your electricity with our giveaway discount"
        />
      </div>
    </section>
  );
};

export default ServiceSection;
