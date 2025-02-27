import { LucideIcon } from "lucide-react";

export type NavBarItem = {
  name: string;
  href: string;

  // Lucid-reactのアイコンの型
  icon: LucideIcon;
};

export type NavBarItemConfig = {
  navBarItem: NavBarItem[];
};
