import { Layers, UtensilsCrossed, type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "nav.categories", href: "/dashboard/categories", icon: Layers },
  {
    label: "nav.menuItems",
    href: "/dashboard/menu-items",
    icon: UtensilsCrossed,
  },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [];
