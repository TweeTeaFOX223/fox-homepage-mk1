export type NavBarItem = {
  name: string;
  href: string;

  // lucide-react icon name
  iconName:
    | "CircleUserRound"
    | "Sparkles"
    | "Swords"
    | "Apple"
    | "BookText"
    | "AppWindow";
};

export type NavBarItemConfig = {
  navBarItem: NavBarItem[];
};
