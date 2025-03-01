import React from "react";
import SearchBar from "./SearchBar";
import CategoryLinks from "./CategoryLinks";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AuthButtons from "./AuthButtons";
import CartButton from "./CartButton";
import MobileNavigation from "./MobileNavigation";

export default async function Navigation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="flex flex-col sticky top-0 z-50 bg-background/90 backdrop-blur-lg shadow-md">
      <div className="flex justify-between h-20 px-10 gap-6 items-center">
        <div className="flex w-full gap-6 items-center">
          <Link href="/" className="">
            <h1 className="tracking-wide text-primary text-2xl text-center">
              SNEAKERS
            </h1>
          </Link>
          <SearchBar />
        </div>

        <div className="flex items-center gap-8 max-md:hidden">
          <CartButton />
          <div className="flex gap-3">
            <AuthButtons session={session} />
          </div>
        </div>
        <div className="md:hidden">
          <MobileNavigation session={session} />
        </div>
      </div>
      <div className="w-full bg-muted border-t-[1px] border-accent">
        <CategoryLinks />
      </div>
    </nav>
  );
}
