import React from "react";
import TxtLogo from "./txt-logo";
import Link from "next/link";

const Footer = () => {
  const footerLinks = [
    {
      name: "Categories",
      list: ["Men", "Women", "kids"],
    },
    {
      name: "Social",
      list: ["Facebook", "Twitter", "Instagram"],
    },
    {
      name: "Legal",
      list: ["Terms & Conditions", "Privacy Policy", "About"],
    },
  ];
  return (
    <section className="w-full md:px-20 h-fit border-t">
      <div className="w-full  md:border-x flex gap-2 p-3 md:p-5 items-start justify-end md:flex-row flex-col">
        <TxtLogo logoSize="text-7xl" />
        <ul className="flex-1 text-lg flex gap-5 md:gap-16 pl-3 md:items-start justify-end flex-col md:flex-row ">
          {footerLinks.map((e, i) => (
            <li key={i}>
              {e.name}
              <ul className="text-base text-primary/80 ">
                {e.list.map((item, index) => (
                  <li key={index} className="hover:text-primary">
                    <Link href={`/${item.toLocaleLowerCase()}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Footer;
