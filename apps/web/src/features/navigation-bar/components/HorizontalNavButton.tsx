"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Apple,
  AppWindow,
  BookText,
  CircleUserRound,
  Compass,
  Sparkles,
  Swords,
} from "lucide-react";
import { NavBarItem, NavBarItemConfig } from "../types/navbar-type";

interface HorizontalNavBarProps {
  config: NavBarItemConfig;
}

export default function HorizontalNavButton({ config }: HorizontalNavBarProps) {
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
    Compass,
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
    <div className="flex items-center h-14 justify-between">
      <div className="flex items-center space-x-1 lg:space-x-2">
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
            ? "text-amber-100 underline decoration-2 decoration-amber-200 underline-offset-4 bg-white/20"
            : "text-white";

          return (
            shouldUseAnchor ? (
              <a
                key={item.href}
                href={href}
                className={`group relative flex items-center gap-1.5 px-2 lg:px-3 py-2 rounded-lg font-bold text-xs lg:text-sm ${activeClass} drop-shadow-[0_2px_0_rgba(0,0,0,0.45)] transition-all duration-300 hover:bg-white/30 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] whitespace-nowrap">
                  {item.name}
                </span>
              </a>
            ) : (
              <Link
                key={item.href}
                href={href}
                className={`group relative flex items-center gap-1.5 px-2 lg:px-3 py-2 rounded-lg font-bold text-xs lg:text-sm ${activeClass} drop-shadow-[0_2px_0_rgba(0,0,0,0.45)] transition-all duration-300 hover:bg-white/30 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] whitespace-nowrap">
                  {item.name}
                </span>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
}
