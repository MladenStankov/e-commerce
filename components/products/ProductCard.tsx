"use client";

import React, { useState, useRef } from "react";
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
import { FastForward, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: IProduct }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.productImages || [];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to cycle through images
  const startImageCycle = () => {
    if (images.length <= 1) return; // Don't cycle if there's only one image

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 800); // Change image every 800ms

    return interval;
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <Card
        className="border-0 shadow-none h-70 transition-transform duration-300 hover:scale-[1.02] hover:shadow-md"
        onMouseEnter={() => {
          intervalRef.current = startImageCycle() || null;
        }}
        onMouseLeave={() => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setCurrentImageIndex(0); // Reset to first image
        }}
      >
        <CardContent className="flex flex-col m-0 p-0">
          <div className="w-full relative aspect-video h-40">
            <Image
              src={
                images.length > 0 ? images[currentImageIndex]?.imagePath : ""
              }
              alt={product.title}
              fill
              className="object-cover rounded-t-lg transition-opacity duration-300"
              loading="lazy"
            />
            <ShoppingCart className="absolute top-2 right-2 bg-background/60 rounded-full p-1 hover:scale-110 transition-all duration-300" />
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
