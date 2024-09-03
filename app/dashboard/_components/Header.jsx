"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div
      className="flex p-4 items-center justify-between shadow-md"
      style={{ backgroundColor: "var(--secondary)" }}
    >
      <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li
          className={`text-xl hover:text-[#dc1a1a] hover:font-bold transition-all cursor-pointer 
            ${path === "/dashboard" && "text-[#dc1a1a] font-bold"}`}
        >
          Dashboard
        </li>

        <li
          className={`text-xl hover:text-[#dc1a1a] hover:font-bold transition-all cursor-pointer 
            ${path === "/dashboard/question" && "text-[#dc1a1a] font-bold"}`}
        >
          Questions
        </li>
        <li
          className={`text-xl hover:text-[#dc1a1a] hover:font-bold transition-all cursor-pointer 
            ${path === "/dashboard/upgrade" && "text-[#dc1a1a] font-bold"}`}
        >
          Upgrade
        </li>
        <li
          className={`text-xl hover:text-[#dc1a1a] hover:font-bold transition-all cursor-pointer 
            ${path === "/dashboard/how" && "text-[#dc1a1a] font-bold"}`}
        >
          How it works
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
