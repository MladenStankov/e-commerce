import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, X } from "lucide-react";
import { Session } from "@/lib/auth";
import AuthButtons from "./AuthButtons";
import { adminNavigation } from "../admin/SideNavigation";
import Link from "next/link";
import { Separator } from "../ui/separator";
import CartButton from "./CartButton";

interface IProps {
  session: Session | null;
}

export default function MobileNavigation({ session }: IProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>

      <SheetContent className="w-full [&>button]:hidden min-h-svh h-full">
        <div className="flex justify-between items-center">
          <SheetHeader>
            <SheetTitle className="text-2xl">Menu</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <SheetClose asChild>
            <X size={40} />
          </SheetClose>
        </div>
        <div className="h-full flex flex-col gap-4">
          <Separator />
          {session?.user.role === "admin" && (
            <div className="flex flex-col gap-6 ml-3">
              {adminNavigation.map((nav, i) =>
                nav.children ? (
                  nav.children.map((child, childIndex) => (
                    <SheetClose key={`child-${childIndex}`} asChild>
                      <Link
                        href={child.href ?? "#"}
                        className="text-xl flex gap-2"
                      >
                        <child.icon size={30} />
                        <p>{child.text}</p>
                      </Link>
                    </SheetClose>
                  ))
                ) : (
                  <SheetClose key={i} asChild>
                    <Link href={nav.href ?? "#"} className="text-xl flex gap-2">
                      <nav.icon size={30} />
                      <p>{nav.text}</p>
                    </Link>
                  </SheetClose>
                )
              )}
            </div>
          )}

          <Separator />
          <CartButton title="Shopping Cart" />

          <div className="gap-6 flex w-full justify-center mt-auto mb-10">
            <AuthButtons session={session} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
