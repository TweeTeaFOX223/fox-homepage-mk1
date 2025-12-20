import { NavBarItemConfig } from "../types/navbar-type";

export const navBarItems: NavBarItemConfig = {
  navBarItem: [
    {
      name: "プロフィール",
      href: "/#profile",
      iconName: "CircleUserRound",
    },
    {
      name: "公開中のアプリ",
      href: "/#apps",
      iconName: "Sparkles",
    },
    // {
    //   name: "興味ある技術",
    //   href: "/#interest-tech",
    //   iconName: "Swords",
    // },
    {
      name: "雑多な記事",
      href: "/#poem-articles",
      iconName: "Apple",
    },
    {
      name: "技術の記事",
      href: "/#tech-articles",
      iconName: "BookText",
    },
    {
      name: "制作アプリ",
      href: "/#products",
      iconName: "AppWindow",
    },
  ],
};
