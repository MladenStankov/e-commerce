import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "@/lib/auth";
import SignoutButton from "./SignoutButton";
import { Lock } from "lucide-react";
import ThemeButtons from "./ThemeButtons";

interface IProps {
  session: Session | null;
}

export default function AuthButtons({ session }: IProps) {
  if (!session)
    return (
      <>
        <Button variant="outline" className="font-semibold w-full">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button className="font-semibold w-full">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </>
    );
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={session.user.image ?? "/default_user_image.jpg"}
            alt="User Image"
            className="relative w-full h-full rounded-full"
          />
          <AvatarFallback>
            <Skeleton className="h-full w-full rounded-full" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="space-y-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={session.user.image ?? "/default_user_image.jpg"}
              alt="User Image"
              className="relative w-full h-full rounded-full"
            />
            <AvatarFallback>
              <Skeleton className="h-full w-full rounded-full" />
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold">{session.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {session.user.role === "admin" && (
            <Link href="/admin/dashboard" className="">
              <Button className="w-full font-semibold">
                <Lock />
                Admin Dashboard
              </Button>
            </Link>
          )}
          <SignoutButton />
          <div className="flex justify-center">
            <ThemeButtons />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
