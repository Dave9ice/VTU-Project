import React from "react";

type serviceCardProps = {
  img: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};
const ServiceCard = ({ img, icon, title, description }: serviceCardProps) => {
  return (
    <article className="w-3/4 mx-auto md:w-full md:mx-0 relative group overflow-hidden rounded-2xl">
      <img src={img} alt={title} />
      <div className="absolute top-0 left-0 pt-6 px-2 bg-cyan-900 transition-transform duration-500 transform opacity-70 h-full w-full -translate-y-full group-hover:-translate-y-0 ">
        <div className="text-white text-xl grid gap-2.5 font-extrabold capitalize text-center">
          {/* <{icon} className="text-5xl justify-self-center " /> */}
          <header className="text-5xl justify-self-center ">{icon}</header>
          <h2 className="">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
