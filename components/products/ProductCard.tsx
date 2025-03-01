import React from "react";
import { IProduct } from "./ProductGrid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatters";
import { FastForward, Heart } from "lucide-react";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="border-0 shadow-none h-70">
        <CardContent className="flex flex-col m-0 p-0">
          <div className="w-full relative aspect-video h-40">
            <Image
              src={product.productImages[0]?.imagePath}
              alt={product.title}
              fill
              className="object-cover rounded-t-lg"
              loading="lazy"
            />
            <Heart className="absolute top-2 right-2" />
          </div>
          <CardHeader className="w-full text-center m-0 p-2">
            <CardTitle className="text-base font-normal line-clamp-3 text-left">
              {product.title}
            </CardTitle>
            <CardDescription className="text-primary font-semibold break-words w-full text-2xl text-left">
              {formatPrice(product.priceInEuroCents)}
            </CardDescription>
            <CardFooter className="text-foreground bg-muted text-sm italic w-fit p-2 space-x-1 rounded-sm shadow-sm">
              <FastForward
                strokeWidth={1}
                className="stroke-accent-foreground"
                size={15}
              />
              <p className="flex items-center gap-1 text-xs">
                Left in Stock:{" "}
                <span className="font-medium">
                  {" "}
                  {product._count.productStocks}
                </span>
              </p>
            </CardFooter>
          </CardHeader>
        </CardContent>
      </Card>
    </Link>
  );
}
