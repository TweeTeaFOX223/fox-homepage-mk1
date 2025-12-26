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
import { useEffect, useMemo, useState } from "react";

interface HamburgerNavProps {
  config: NavBarItemConfig;
}

export default function HamburgerNavButton({ config }: HamburgerNavProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const iconMap = {
    CircleUserRound,
    Sparkles,
    Swords,
    Apple,
    BookText,
    AppWindow,
  };

  const sectionIds = useMemo(
    () =>
      config.navBarItem
        .map((item) => item.href)
        .filter((href) => href.includes("#"))
        .map((href) => href.split("#")[1]),
    [config.navBarItem]
  );

  useEffect(() => {
    if (!isHome) return;
    const elements = sectionIds
      .map((id) => (id ? document.getElementById(id) : null))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: [0, 0.01],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, sectionIds]);

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
          const sectionId = href.includes("#") ? href.split("#")[1] : null;
          const isActive = isHome
            ? sectionId !== null && sectionId === activeSection
            : pathname === item.href;
          const activeClass = isActive
            ? "bg-emerald-200/60 text-emerald-900 underline decoration-emerald-600 underline-offset-4"
            : "text-emerald-900";

          return (
            <DropdownMenuItem
              key={item.href}
              className={`focus:bg-emerald-100 hover:bg-emerald-100 ${activeClass}`}
            >
              {shouldUseAnchor ? (
                <a
                  href={href}
                  className="flex items-center w-full py-2 px-1 rounded-md transition-colors duration-200"
                >
                 <Icon className="w-5 h-5 mr-3 text-emerald-600" />
                  <span className="font-bold">
                    {item.name}
                  </span>
                </a>
              ) : (
                <Link
                  href={href}
                  className="flex items-center w-full py-2 px-1 rounded-md transition-colors duration-200"
                >
                  <Icon className="w-5 h-5 mr-3 text-emerald-600" />
                  <span className="font-bold">
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
