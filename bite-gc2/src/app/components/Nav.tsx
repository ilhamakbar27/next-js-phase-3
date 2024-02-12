"use client";
import React, { useState, useEffect } from "react";
import Link from "../../../node_modules/next/link";
import { IoMdExit, IoMdLogIn } from "react-icons/io";
import { GrShop } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { actionLogout } from "./actionLogout";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <main>
        <nav
          className={`flex px-20 z-20  fixed transition duration-300 w-full justify-between items-center py-5 ${
            scrolled
              ? "bg-white text-gray-900  border border-gray-800 border-1"
              : "bg-transparent text-black"
          }`}>
          <div className="w-[30%] ">
            <h1 className="text-4xl font-extrabold  tracking-tighter">Bite</h1>
          </div>
          <div className="w-[35%]  ">
            <ul className="flex font-[300] uppercase text-lg  justify-between px-20">
              <Link href={"/"}>home</Link>
              <Link href={"/products"}>Product</Link>
              <Link href={"/about"}>about</Link>
            </ul>
          </div>
          <div className=" w-[30%] ">
            <div className="flex gap-9 text-end items-end justify-end px-20 ">
              <Link
                href={"/wishlist"}
                className="text-3xl flex  font-[300] justify-center items-center">
                <GrShop />
              </Link>
              <Link
                href={"/register"}
                className="text-3xl flex  font-[300] justify-center items-center">
                <FaUser />
              </Link>
              <form action={actionLogout}>
                <button
                  className="text-3xl flex  font-[300] justify-center items-center"
                  type="submit">
                  <IoMdExit />
                </button>
              </form>
            </div>
          </div>
        </nav>
      </main>
    </>
  );
};

export default Nav;
