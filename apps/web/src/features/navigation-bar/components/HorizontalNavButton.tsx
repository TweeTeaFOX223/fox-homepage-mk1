import Link from "next/link";
import { NavBarItem, NavBarItemConfig } from "../types/navbar-type";

interface HorizontalNavBarProps {
  config: NavBarItemConfig;
}

export default function HorizontalNavButton({ config }: HorizontalNavBarProps) {
  return (
    <div className="flex items-center h-14 justify-between">
      <div className="flex items-center space-x-1 lg:space-x-2">
        {config.navBarItem.map((item: NavBarItem) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-1.5 px-2 lg:px-3 py-2 rounded-lg font-bold text-xs lg:text-sm text-white hover:text-white transition-all duration-300 hover:bg-white/25 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
