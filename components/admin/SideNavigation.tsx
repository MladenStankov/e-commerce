import React from "react";

import SideNavigationLinks from "./SideNavigationLinks";
import {
  Table2,
  NotepadText,
  Package,
  FolderKanban,
  PackagePlus,
  Users,
} from "lucide-react";

export interface IAdminNavigation {
  text: string;
  icon: typeof Table2;
  href?: string;
  children?: IAdminNavigation[];
}

export const adminNavigation: IAdminNavigation[] = [
  {
    text: "Dashboard",
    icon: Table2,
    href: "/admin/dashboard",
  },
  {
    text: "Orders",
    icon: NotepadText,
    href: "/admin/orders",
  },
  {
    text: "Products",
    icon: Package,
    href: "/",
    children: [
      {
        text: "Manage Products",
        icon: FolderKanban,
        href: "/admin/products",
      },
      {
        text: "Create Product",
        icon: PackagePlus,
        href: "/admin/products/create",
      },
    ],
  },
  {
    text: "Users",
    icon: Users,
    href: "/admin/users",
  },
];

export default function SideNavigation() {
  return (
    <div className="border-r-2 border-input min-h-screen h-screen left-0 overflow-hidden fixed w-64 max-md:hidden bg-secondary">
      <SideNavigationLinks />
    </div>
  );
}
