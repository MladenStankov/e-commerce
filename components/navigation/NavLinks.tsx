import {
  // BadgeCheck,
  CircleDollarSign,
  Clock,
  // Lightbulb,
  // Newspaper,
  NotepadText,
  // Package,
  Plus,
  // X,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface INavLink {
  title: React.ReactNode;
  href: string;
  innerLinks?: INavLink[];
}

export const navLinks: INavLink[] = [
  // {
  //   title: <h2>News</h2>,
  //   href: "/news",
  // },
  // {
  //   title: <h2>About</h2>,
  //   href: "/about",
  //   innerLinks: [
  //     {
  //       title: (
  //         <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
  //           <Lightbulb /> How StockX Works
  //         </div>
  //       ),
  //       href: "/about/how-stockx-works",
  //     },
  //     {
  //       title: (
  //         <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
  //           <Package /> Buying Guide
  //         </div>
  //       ),
  //       href: "/about/buying-guide",
  //     },
  //     {
  //       title: (
  //         <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
  //           <CircleDollarSign /> Selling Guide
  //         </div>
  //       ),
  //       href: "/about/selling-guide",
  //     },
  //     {
  //       title: (
  //         <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
  //           <BadgeCheck /> Verification
  //         </div>
  //       ),
  //       href: "/about/verification",
  //     },
  //     {
  //       title: (
  //         <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
  //           <Newspaper /> Newsroom
  //         </div>
  //       ),
  //       href: "/newsroom",
  //     },
  //     {
  //       title: (
  //         <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
  //           <X /> Company
  //         </div>
  //       ),
  //       href: "/about/company",
  //     },
  //   ],
  // },
  // {
  //   title: <h2>Help</h2>,
  //   href: "/help",
  // },
  {
    title: <h2 className="text-xl">Sell</h2>,
    href: "/sell",
    innerLinks: [
      {
        title: (
          <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
            <Plus /> New Listing
          </div>
        ),
        href: "/sell/new-listing",
      },
      {
        title: (
          <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
            <NotepadText /> Current Listings
          </div>
        ),
        href: "/sell/current-listings",
      },
      {
        title: (
          <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
            <Clock /> Pending Sales
          </div>
        ),
        href: "/sell/pending-sales",
      },
      {
        title: (
          <div className="flex items-center gap-2 hover:bg-muted p-2 py-3">
            <CircleDollarSign /> History
          </div>
        ),
        href: "/sell/history",
      },
    ],
  },
];

export default function NavLinks() {
  return (
    <ul className="flex gap-6">
      {navLinks.map((link, _) => {
        return (
          <HoverCard key={_} openDelay={100} closeDelay={10}>
            <HoverCardTrigger asChild>
              <Link href={link.href}>{link.title}</Link>
            </HoverCardTrigger>
            {}
            {link.innerLinks && (
              <HoverCardContent className="p-0">
                <div className="flex flex-col gap-0">
                  {link.innerLinks.map((innerLink, i) => {
                    return (
                      <Link href={innerLink.href} key={i}>
                        {innerLink.title}
                      </Link>
                    );
                  })}
                </div>
              </HoverCardContent>
            )}
          </HoverCard>
        );
      })}
    </ul>
  );
}
