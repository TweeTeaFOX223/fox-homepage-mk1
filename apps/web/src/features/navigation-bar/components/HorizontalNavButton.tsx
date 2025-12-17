import Link from "next/link";
import { NavBarItem, NavBarItemConfig } from "../types/navbar-type";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HorizontalNavBarProps {
  config: NavBarItemConfig;
}

export default function HorizontalNavButton({ config }: HorizontalNavBarProps) {
  return (
    <div className="flex items-center h-16 justify-between">
      <div className="flex items-center space-x-4">
        {config.navBarItem.map((item: NavBarItem) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md",
                "hover:bg-gray-50 transition-colors duration-200"
              )}
            >
              <Button className="lg:text-sm  font-medium ">
                <Icon className="w-5 h-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
