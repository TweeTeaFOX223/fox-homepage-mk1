// "use client";

import React from "react";
import Link from "next/link";
import HamburgerNavButton from "./HamburgerNavButton";
import { navBarItems } from "../config/navbar-item";
import HorizontalNavButton from "./HorizontalNavButton";

export default function TopNavBar() {
  return (
    <>
      {/* stickyにして画面上部にバーを固定する */}
      <nav className="sticky top-0 h-12 bg-white shadow-sm z-50 backdrop-blur-sm bg-white/80">
        {/* 中央揃えで表示 */}
        <div className="w-full px-4 h-full flex flex-row justify-between items-center">
          {/* 左側のアクション領域（必要に応じて） */}
          <div className="flex items-center">
            <Link href="/">TTF</Link>
          </div>

          {/* 中央の領域：スマホは隠す、タブレット以上で表示 */}
          <div className="hidden md:inline-block ">
            <HorizontalNavButton config={navBarItems} />
          </div>

          {/* 右側のアクション領域（必要に応じて） */}
          <div className="visible sm:invisible flex items-center">
            {/* ここに検索ボックスやユーザーメニューなどを配置できます */}
            <HamburgerNavButton config={navBarItems} />
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from going under the navbar */}
      {/* <div className="h-16" /> */}
    </>
  );
}
