import React from "react";
import Link from "next/link";
import HamburgerNavButton from "./HamburgerNavButton";
import { navBarItems } from "../config/navbar-item";
import HorizontalNavButton from "./HorizontalNavButton";

export default function TopNavBar() {
  return (
    <>
      <nav className="sticky top-0 h-14 z-50 backdrop-blur-md">
        {/* グラデーション背景 - 明度を上げて視認性向上 */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 opacity-90"></div>

        {/* グロー効果 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-emerald-900/5"></div>

        {/* シャドウ効果 - 柔らかく */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/50 via-teal-400/50 to-cyan-400/50 shadow-md"></div>

        <div className="relative w-full px-4 h-full flex flex-row justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="font-black text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300"
            >
              T2フォックス
            </Link>
          </div>

          <div className="hidden md:inline-block">
            <HorizontalNavButton config={navBarItems} />
          </div>

          <div className="visible sm:invisible flex items-center">
            <HamburgerNavButton config={navBarItems} />
          </div>
        </div>
      </nav>
    </>
  );
}
