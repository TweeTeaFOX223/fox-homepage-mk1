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
      <nav className="sticky top-0 h-14 z-50 backdrop-blur-md">
        <div className="absolute inset-0 bg-emerald-500/95"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600/60 shadow-sm"></div>

        <div className="relative w-full px-4 h-full flex flex-row justify-between items-center">
          <div className="flex items-center">
            {isHome ? (
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState(null, "", "/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-black text-[clamp(0.95rem,1.3vw,1.25rem)] whitespace-nowrap text-amber-50 bg-orange-500 border-2 border-orange-700 px-3 py-1 rounded-sm shadow-[0_2px_0_rgba(0,0,0,0.35)] hover:scale-105 transition-transform duration-300"
              >
                T2-FOX
              </a>
            ) : (
              <Link
                href="/"
                className="font-black text-[clamp(0.95rem,1.3vw,1.25rem)] whitespace-nowrap text-amber-50 bg-orange-500 border-2 border-orange-700 px-3 py-1 rounded-sm shadow-[0_2px_0_rgba(0,0,0,0.35)] hover:scale-105 transition-transform duration-300"
              >
                T2-FOX
              </Link>
            )}
          </div>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <HorizontalNavButton config={navBarItems} />
          </div>

          <div className="flex items-center lg:hidden">
            <HamburgerNavButton config={navBarItems} />
          </div>
        </div>
      </nav>
    </>
  );
}
