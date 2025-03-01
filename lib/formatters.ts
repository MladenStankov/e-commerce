import { Category } from "@prisma/client";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatPrice(priceInCents: number) {
  return `€${priceInCents / 100}`;
}

export function formatSize(size: string, category: Category) {
  const categoryFormatted =
    category === "MEN" ? "M" : category === "WOMEN" ? "W" : "K";
  return `EU ${categoryFormatted} ${size.split("_")[1]}`;
}
