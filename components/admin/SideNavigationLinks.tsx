"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { adminNavigation, IAdminNavigation } from "./SideNavigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function SideNavigationLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-2 text-foreground text-xl p-5">
      {adminNavigation.map((nav, index) => (
        <React.Fragment key={`nav-${index}`}>
          {nav.children ? (
            <Accordion
              key={`accordion-${index}`}
              type="single"
              defaultValue={
                ["/admin/products", "/admin/products/create"].includes(pathname)
                  ? "item-product"
                  : undefined
              }
              collapsible
            >
              <AccordionItem
                key={`accordion-item-${index}`}
                value={`item-product`}
              >
                <AccordionTrigger>
                  <div className="flex items-center gap-2 p-5 px-8 text-xl">
                    <nav.icon />
                    <p>{nav.text}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="w-full m-0 p-0 ml-6">
                  {nav.children.map((child, childIndex) => (
                    <NavComponent
                      key={childIndex}
                      pathname={pathname}
                      nav={child}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <NavComponent key={index} pathname={pathname} nav={nav} />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}

function NavComponent({
  pathname,
  nav,
}: {
  pathname: string;
  nav: IAdminNavigation;
}) {
  return (
    <Link
      href={nav.href ?? "#"}
      className={cn(
        "flex items-center gap-2 p-5 px-8 transition-colors font-medium relative after:absolute after:bottom-0 after:left-1/2 after:w-0 hover:after:left-0 hover:after:w-full after:h-[2px] after:bg-muted-foreground after:transition-all after:duration-500",
        pathname === nav.href && "after:w-full after:left-0 after:bg-primary"
      )}
    >
      <nav.icon />
      <p>{nav.text}</p>
    </Link>
  );
}
