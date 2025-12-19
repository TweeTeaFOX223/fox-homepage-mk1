import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu } from "lucide-react";
import { NavBarItem, NavBarItemConfig } from "../types/navbar-type";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HamburgerNavProps {
  config: NavBarItemConfig;
}

export default function HamburgerNavButton({ config }: HamburgerNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-white/25 transition-all duration-300">
        <Menu className="w-6 h-6 text-white drop-shadow-md" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-xl">
        {config.navBarItem.map((item: NavBarItem) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem
              key={item.href}
              className="focus:bg-emerald-100 hover:bg-emerald-100"
            >
              <Link
                href={item.href}
                className="flex items-center w-full py-2 px-1 rounded-md transition-colors duration-200"
              >
                <Icon className="w-5 h-5 mr-3 text-emerald-600" />
                <span className="font-bold text-emerald-900">{item.name}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
