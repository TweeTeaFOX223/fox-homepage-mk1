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
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>ジャンプ！</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        {config.navBarItem.map((item: NavBarItem) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem key={item.href}>
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 py-2 rounded-md",
                  "hover:bg-gray-50 transition-colors duration-200"
                )}
              >
                <Icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
