import BreadCrumps from "@/components/BreadCrumps";
import { alignment } from "@/components/Navbar";
import AboutImg from "../assets/images/about-img.png";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <section className="bg-secondary h-35 grid items-center">
        <div className={`${alignment}`}>
          <BreadCrumps text="about us" />
        </div>
      </section>
      <section className="py-10">
        <div className="text-center grid text-3xl capitalize text-primary">
          <h2>about us</h2>
          <div className="h-1 w-20 bg-primary justify-self-center"></div>
          <p className="text-sm mt-1.5">who we are and what we do</p>
        </div>
        <div
          className={`${alignment} pt-10 grid md:grid-cols-2 gap-4 items-center`}
        >
          <p>
            BiggieSub is a platform that enable users run their daily mobile
            topups, funds, and pay bills in a more secure, swift, friendly and
            convenient way.(all from the comfort of your home). We offer the
            best services for Data and Airtime top-up, Fund and airtime
            convertion,Cable TV subscriptions, Electricity Bills payment and
            many other services. Recharging your mobile phone, having excess
            airtime without getting the value or paying bills usually comes with
            the hassle of what is the latest data plan that will suit your
            usage, unnecessary calls to exhaust excess airtime or imagine trying
            to remember the various account numbers and even the different
            payment processes involved for utility payment, hence BiggieSub. we
            intend to bring everything to your doorstep seamlessly.
          </p>
          <img
            src={AboutImg}
            alt="about image"
            className="w-[30rem] h-[30rem] object-cover hidden md:block"
          />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
