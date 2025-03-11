"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type ProductImage = {
  id: string;
  imagePath: string;
};

interface PhotoGalleryProps {
  images: ProductImage[];
  title: string;
}

export function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="grid grid-cols-8 gap-5 w-full">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none rounded-t-lg"></div>
        <ScrollArea className="w-full rounded-lg overflow-hidden grid grid-cols-1">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden aspect-square my-1 rounded-sm cursor-pointer ${
                index === currentImageIndex ? "border-2 border-primary" : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image.imagePath}
                alt={title}
                fill
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          ))}
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none rounded-b-lg"></div>
      </div>
      <div className="relative rounded-lg overflow-hidden col-span-7">
        <Image
          src={images[currentImageIndex].imagePath}
          alt={title}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            onClick={handlePrevImage}
            className="w-10 h-10 bg-background rounded-full p-1 hover:bg-background/80 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-full h-full" />
          </button>
          <button
            onClick={handleNextImage}
            className="w-10 h-10 bg-background rounded-full p-1 hover:bg-background/80 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
