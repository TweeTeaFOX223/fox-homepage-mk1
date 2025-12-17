import { LucideIcon } from "lucide-react";

export interface TechItem {
  name: string;
  description: string;
  proficiency: number;
  icon?: LucideIcon;
}

export interface TechCategory {
  title: string;
  description: string;
  style: {
    color: string;
    borderColor: string;
  };
  icon: LucideIcon;
  items: TechItem[];
}
