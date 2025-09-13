import BreadCrumps from "@/components/BreadCrumps";
import { alignment } from "@/components/Navbar";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <>
      {" "}
      <section className="bg-secondary h-35 grid items-center">
        <div className={`${alignment}`}>
          <BreadCrumps text="contact us" />
        </div>
      </section>
      <section className="pt-10 h-screen">
        <div className="text-center grid text-3xl capitalize text-primary">
          <h2>contact us</h2>
          <div className="h-1 w-20 bg-primary justify-self-center"></div>
          <p className="text-sm mt-1.5">feel free to reach us</p>
        </div>
        <div className={`${alignment} grid pt-10 gap-4 md:grid-cols-2 pb-10`}>
          <div className="grid place-items-center gap-4">
            <FaPhoneAlt className="text-5xl text-primary" />
            <h2>08128905115</h2>
          </div>
          <div className="grid place-items-center gap-4">
            <IoMdMail className="text-5xl text-primary" />
            <h2>suport@biggiesub.com</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
