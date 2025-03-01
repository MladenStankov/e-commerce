import React from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
  title?: string;
}

export default function CartButton({ title }: IProps) {
  return (
    <div className="relative flex items-center gap-2 ml-2">
      <ShoppingCart size={30} className="relative hover:cursor-pointer" />
      <div
        className={cn(
          "absolute translate-x-1/2 -translate-y-1/2 right-0 w-5 h-5 bg-primary rounded-full text-foreground flex items-center justify-center text-sm p-1",
          title && "right-0 top-1/2 p-5 text-xl mr-4"
        )}
      >
        0
      </div>
      {title && <p className="text-foreground text-xl">{title}</p>}
    </div>
  );
}
