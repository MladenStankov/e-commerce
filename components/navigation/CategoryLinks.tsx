import Link from "next/link";
import React from "react";

interface INavLink {
  title: string;
  href: string;
}

const navLinks: INavLink[] = [
  {
    title: "All",
    href: "/",
  },
  {
    title: "Men",
    href: "/men",
  },
  {
    title: "Women",
    href: "/women",
  },
  {
    title: "Kids",
    href: "/kids",
  },
];

export default function CategoryLinks() {
  return (
    <ul className="text-lg w-full flex justify-center gap-4 font-medium overflow-x-auto">
      {navLinks.map((link, _) => {
        return (
          <Link
            key={_}
            href={link.href}
            className="w-fit h-full relative p-2 after:absolute after:h-[2px] after:bg-foreground 
             after:w-0 after:bottom-0 after:left-1/2 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
          >
            {link.title}
          </Link>
        );
      })}
    </ul>
  );
}
