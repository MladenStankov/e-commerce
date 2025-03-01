import prisma from "@/lib/prisma";
import React from "react";
import ProductGrid from "./ProductGrid";

export default async function NewestArrivals() {
  const newestArrivals = await prisma.product.findMany({
    select: {
      title: true,
      slug: true,
      priceInEuroCents: true,
      productImages: {
        select: {
          imagePath: true,
        },
      },
      _count: {
        select: { productStocks: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return <ProductGrid products={newestArrivals} title="Newest Arrivals" />;
}
