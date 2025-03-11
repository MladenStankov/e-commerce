import prisma from "@/lib/prisma";
import React from "react";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/formatters";
import { Description } from "@/components/products/Description";
import { PhotoGallery } from "@/components/products/PhotoGallery";
import { Category } from "@prisma/client";
import SizeSelector from "@/components/products/SizeSelector";
import { ScrollArea } from "@/components/ui/scroll-area";

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      productImages: true,
      productStocks: true,
    },
  });
  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 space-y-10">
      <div className="flex w-full h-[70svh] gap-5 max-md:flex-col">
        <PhotoGallery images={product.productImages} title={product.title} />
        <ScrollArea className="w-1/2">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">{product.title}</h1>
            <h2 className="text-muted-foreground break-words w-full text-xl">
              {product.category === Category.MEN
                ? "Men's Sneaker"
                : "Women's Sneaker"}
            </h2>
            <p className="text-primary font-semibold break-words w-full text-2xl">
              {formatPrice(product.priceInEuroCents)}
            </p>
            <SizeSelector
              productStocks={product.productStocks}
              category={product.category}
              productId={product.id}
              productTitle={product.title}
            />
            <Description text={product.description} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
