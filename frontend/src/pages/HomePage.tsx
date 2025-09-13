import { alignment } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "../assets/images/hero-img.png";
import { Card, CardContent } from "@/components/ui/card";
import { IoIosFlash } from "react-icons/io";
import { FaPercent } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import ProcessSection from "@/components/ProcessSection";
const HomePage = () => {
  return (
    <>
      <section className="  pt-20 md:pt-36 bg-secondary h-screen ">
        <div
          className={` ${alignment} flex flex-col md:flex-row md:items-center`}
        >
          <header>
            <h2 className="md:text-4xl capitalize text-2xl">
              welcome to BiggieSub
              <br /> the best recharge & utility bills payment platform
            </h2>
            <p className="my-8">
              cheapest and instant data subscription delivery,pay all your
              utilty bills with the highest discount
            </p>
            <div className="flex gap-4 capitalize">
              <Button asChild size="lg" className="text-xl tracking-tighter">
                <Link to="/login">login</Link>
              </Button>
              <Button asChild size="lg" className="text-xl tracking-tighter">
                <Link to="/register">register</Link>
              </Button>
            </div>
          </header>
          <div className="hidden md:grid">
            <img
              src={heroImg}
              alt="her0-img"
              className="grid w-[30rem] h-[25rem] object-cover"
            />
          </div>
        </div>
      </section>
      <section className="py-10">
        <h2 className="capitalize text-2xl text-center mb-4 text-primary">
          why choose us?
        </h2>
        <div className={`${alignment} grid gap-8 md:grid-cols-3`}>
          <article className="text-center text-gray-700 ">
            <Card className="grid px-8 py-8 md:p-2 ">
              <IoIosFlash className="text-7xl justify-self-center rounded-full border-10 border-secondary bg-primary text-white" />
              <CardContent className="text-gray-700 grid gap-4">
                <h2 className="capitalize text-primary">automated delivery</h2>
                <p>
                  We have swift automated system with a 24/7 delivery service
                  almost instantly, nothing beats a seamless process..
                </p>
              </CardContent>
            </Card>
          </article>
          <article className="text-center text-gray-700 ">
            <Card className="grid px-8 py-8 bg-primary">
              <FaPercent className="text-7xl justify-self-center rounded-full border-6 border-secondary text-white p-2" />
              <CardContent className="text-white grid gap-4">
                <h2 className="capitalize text-2xl font-semibold">
                  best discount
                </h2>
                <p>
                  Enjoy massive discount on our platform when you make purchase
                  for your day to day needs.
                </p>
              </CardContent>
            </Card>
          </article>
          <article className="text-center text-gray-700 ">
            <Card className="grid px-8 py-8">
              <MdSupportAgent className="text-7xl justify-self-center rounded-full border-10 border-secondary text-white bg-primary p-2 " />
              <CardContent className="text-gray-700 grid gap-4">
                <h2 className="capitalize text-primary">247/7 suport</h2>
                <p>
                  We guarantee our customers top notch services all time. Hence,
                  we are always respond to your needs.
                </p>
              </CardContent>
            </Card>
          </article>
        </div>
      </section>
      <ProcessSection />
    </>
  );
};

export default HomePage;
