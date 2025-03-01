import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Size } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSizesForCategory(category: string): Size[] {
  console.log("asd");
  switch (category) {
    case "MEN":
      return [
        Size.SIZE_38,
        Size.SIZE_39,
        Size.SIZE_40,
        Size.SIZE_41,
        Size.SIZE_42,
        Size.SIZE_43,
        Size.SIZE_44,
        Size.SIZE_45,
        Size.SIZE_46,
        Size.SIZE_47,
        Size.SIZE_48,
        Size.SIZE_49,
        Size.SIZE_50,
      ];
    case "WOMEN":
      return [
        Size.SIZE_35,
        Size.SIZE_36,
        Size.SIZE_37,
        Size.SIZE_38,
        Size.SIZE_39,
        Size.SIZE_40,
        Size.SIZE_41,
        Size.SIZE_42,
        Size.SIZE_43,
        Size.SIZE_44,
        Size.SIZE_45,
      ];
    case "KIDS":
      return [
        Size.SIZE_16,
        Size.SIZE_17,
        Size.SIZE_18,
        Size.SIZE_19,
        Size.SIZE_20,
        Size.SIZE_21,
        Size.SIZE_22,
        Size.SIZE_23,
        Size.SIZE_24,
        Size.SIZE_25,
        Size.SIZE_26,
        Size.SIZE_27,
        Size.SIZE_28,
        Size.SIZE_29,
        Size.SIZE_30,
        Size.SIZE_31,
        Size.SIZE_32,
        Size.SIZE_33,
        Size.SIZE_34,
        Size.SIZE_35,
      ];
    default:
      return [];
  }
}
