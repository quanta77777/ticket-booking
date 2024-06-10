"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeSwitcher";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
type Props = {};

const Header = (props: Props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-slate-900 shadow-lg fixed w-full top-0 dark:shadow-slate-800 dark:shadow-md  z-[9999]">
     
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex lg:flex-1 ">
              <Link href="/" className="-m-1.5 p-1.5">
                <Image
                  className="h-8 w-auto"
                  src="/header-logo.webp"
                  width={100}
                  height={100}
                  alt="Logo"
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden lg:flex lg:gap-x-12 flex-end mr-5">
              <Link
                href="/movie"
                className="text-sm font-semibold leading-6 text-gray-900  dark:text-slate-50 hover:text-slate-300 dark:hover:text-slate-500"
              >
                Phim
              </Link>
              <Link
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900  dark:text-slate-50"
              >
                Rạp chiếu
              </Link>
              <Link
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900  dark:text-slate-50"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900  dark:text-slate-50"
              >
                Contact
              </Link>
        
            </div>
            <div className="mr-2">
              <ThemeSwitcher />
            </div>
            <IconButton
              aria-label="Menu"
              className="bg-slate-200 dark:bg-[#212933] lg:hidden"
              onClick={() => setOpen(true)}
            >
              <MenuIcon className="text-slate-900 dark:text-white " />
            </IconButton>
          </div>
        </nav>

        {/* mobile menu */}
        {isOpen && (
          <>
           
          <div className="lg:hidden " role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-[999]"></div>
            <div className="fixed inset-y-0 right-0 z-[999] w-full overflow-y-auto bg-white dark:bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-md dark:shadow-slate-800">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-900 dark:text-slate-100 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <div className="">
                      <ThemeSwitcher />
                    </div>
                    <Link
                      href="/future"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      Features
                    </Link>
                    <Link
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      Marketplace
                    </Link>
                    <Link
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      Company
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
        
        )}
      </header>
    </>
  );
};

export default Header;
