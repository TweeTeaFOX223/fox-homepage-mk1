"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerNavButton from "./HamburgerNavButton";
import { navBarItems } from "../config/navbar-item";
import HorizontalNavButton from "./HorizontalNavButton";

export default function TopNavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md overflow-x-hidden">
        <div className="absolute inset-0 bg-emerald-500/95"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600/60 shadow-sm"></div>

        <div className="relative w-full px-4 sm:px-3 py-2 flex items-center gap-3 sm:gap-2 overflow-x-hidden">
          <div className="flex items-center shrink-0">
            {isHome ? (
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState(null, "", "/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-black text-xl whitespace-nowrap text-amber-50 bg-orange-500 border-2 border-orange-700 px-3 py-1 rounded-sm shadow-[0_2px_0_rgba(0,0,0,0.35)] hover:scale-105 transition-transform duration-300"
              >
                T2-FOX
              </a>
            ) : (
              <Link
                href="/"
                className="font-black text-xl whitespace-nowrap text-amber-50 bg-orange-500 border-2 border-orange-700 px-3 py-1 rounded-sm shadow-[0_2px_0_rgba(0,0,0,0.35)] hover:scale-105 transition-transform duration-300"
              >
                T2-FOX
              </Link>
            )}
          </div>

          <div className="hidden sm:flex flex-1 min-w-0 lg:justify-center">
            <HorizontalNavButton config={navBarItems} />
          </div>

          <div className="flex sm:hidden ml-auto">
            <HamburgerNavButton config={navBarItems} />
          </div>
        </div>
      </nav>
    </>
  );
}
