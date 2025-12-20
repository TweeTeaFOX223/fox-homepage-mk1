"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Apple,
  AppWindow,
  BookText,
  CircleUserRound,
  Menu,
  Sparkles,
  Swords,
} from "lucide-react";
import { NavBarItem, NavBarItemConfig } from "../types/navbar-type";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HamburgerNavProps {
  config: NavBarItemConfig;
}

export default function HamburgerNavButton({ config }: HamburgerNavProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const iconMap = {
    CircleUserRound,
    Sparkles,
    Swords,
    Apple,
    BookText,
    AppWindow,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-white/25 transition-all duration-300">
        <Menu className="w-6 h-6 text-white drop-shadow-md" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-xl">
        {config.navBarItem.map((item: NavBarItem) => {
          const Icon = iconMap[item.iconName];

          const href = isHome && item.href.startsWith("/#")
            ? item.href.replace("/#", "#")
            : item.href;
          const shouldUseAnchor = isHome && href.startsWith("#");

          return (
            <DropdownMenuItem
              key={item.href}
              className="focus:bg-emerald-100 hover:bg-emerald-100"
            >
              {shouldUseAnchor ? (
                <a
                  href={href}
                  className="flex items-center w-full py-2 px-1 rounded-md transition-colors duration-200"
                >
                  <Icon className="w-5 h-5 mr-3 text-emerald-600" />
                  <span className="font-bold text-emerald-900">
                    {item.name}
                  </span>
                </a>
              ) : (
                <Link
                  href={href}
                  className="flex items-center w-full py-2 px-1 rounded-md transition-colors duration-200"
                >
                  <Icon className="w-5 h-5 mr-3 text-emerald-600" />
                  <span className="font-bold text-emerald-900">
                    {item.name}
                  </span>
                </Link>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
