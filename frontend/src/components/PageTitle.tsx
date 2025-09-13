import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type PageTitleProps = {
  title: string;
  text: string;
};

const PageTitle = ({ title, text }: PageTitleProps) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:justify-between capitalize">
      <h1 className="text-2xl tracking-wider text-gray-700 ">{title}</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className="text-primary">
              home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{text}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageTitle;
