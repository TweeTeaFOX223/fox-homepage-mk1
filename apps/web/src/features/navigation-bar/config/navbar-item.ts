import { NavBarItemConfig } from "../types/navbar-type";

import { CircleUserRound } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Swords } from "lucide-react";
import { Apple } from "lucide-react";
import { BookText } from "lucide-react";
import { AppWindow } from "lucide-react";

// ここで使用するLucidIconを指定する

export const navBarItems: NavBarItemConfig = {
  navBarItem: [
    {
      name: "プロフィール",
      href: "/#profile",
      icon: CircleUserRound,
    },
    {
      name: "公開中のアプリ",
      href: "/#apps",
      icon: Sparkles,
    },
    {
      name: "興味ある技術",
      href: "/#interest-tech",
      icon: Swords,
    },
    {
      name: "雑多な記事",
      href: "/#poem-articles",
      icon: Apple,
    },
    {
      name: "技術の記事",
      href: "/#tech-articles",
      icon: BookText,
    },
    {
      name: "制作アプリ",
      href: "/#products",
      icon: AppWindow,
    },
  ],
};
