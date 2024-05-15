"use client";
import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { LuSearch, LuUserCircle2 } from "react-icons/lu";
import { LuShoppingBag } from "react-icons/lu";
import TxtLogo from "../txt-logo";
import CustomModal from "@/components/ui/custom-modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignIn } from "../../auth";
import { CALLBACK_URI } from "@/utils/constants";

const CustomHeader = ({ navList }: { navList: string[] }) => {
  const [on, toggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const handleRedirect = (type: "Profile" | "Cart") => {
    if (!session || !session.user) {
      router.refresh();
      router.push(`/api/auth/signin?callbackUrl=${CALLBACK_URI}`);
      return;
    }
    router.refresh();
    type === "Profile"
      ? router.push("/account/profile")
      : router.push("/account/cart");
  };

  return (
    <header className="w-full h-20 border-b select-none text-primary flex items-center justify-between md:relative ">
      <div className="w-20 border-r h-20 grid place-content-center">
        <TxtLogo />
      </div>
      <nav
        className={
          "z-50 flex items-start md:border-t-0 border-t overflow-hidden duration-700 transition-[translate, opacity] " +
          (on ? "translate-x-0 " : "-translate-x-full md:translate-x-0") +
          " md:flex-row flex-col md:p-0 p-6 md:items-center gap-4 md:static fixed top-16 translate-y-1 md:translate-y-0 left-0 right-0 bottom-0 bg-white md:bg-transparent"
        }
      >
        <ul className="flex items-start justify-center gap-8 text-xl md:text-base md:gap-5 md:flex-row flex-col">
          {navList.map((e, i) => (
            <li
              key={i}
              onClick={() => toggle((prev) => !prev)}
              className={
                "relative after:border-accent after:absolute hover:after:border after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-200 cursor-pointer hover:text-accent select-none"
              }
            >
              <Link href={"/" + e.toLowerCase()}>{e}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4 text-2xl md:text-xl">
        <CustomModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          openBtn={<LuSearch className="cursor-pointer hover:text-accent" />}
          modalTitle={"Search Products"}
        >
          Hello
        </CustomModal>
        <LuUserCircle2
          onClick={() => {
            handleRedirect("Profile");
          }}
          className="cursor-pointer hover:text-accent"
        />
        <div className="md:w-20 md:h-20 grid place-content-center md:bg-secondary/50">
          <LuShoppingBag
            onClick={() => {
              handleRedirect("Cart");
            }}
            className="cursor-pointer hover:text-accent"
          />
        </div>
        <span className="md:hidden border-l w-20 h-20 grid place-content-center bg-secondary/50">
          <Hamburger
            toggled={on}
            color="#E1FE02"
            toggle={() => toggle((prev) => !prev)}
            rounded
          />
        </span>
      </div>
    </header>
  );
};

export default CustomHeader;
