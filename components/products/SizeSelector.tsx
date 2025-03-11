"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Category, ProductStock, Size } from "@prisma/client";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { cn, getSizesForCategory } from "@/lib/utils";
import { formatSize } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";

interface IProps {
  productStocks: ProductStock[];
  category: Category;
  productId: string;
  productTitle: string;
}

export default function SizeSelector({
  productStocks,
  category,
  productId,
  productTitle,
}: IProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const categorySizes = getSizesForCategory(category);
  const { toast } = useToast();

  const sizes = categorySizes.map((size) => {
    const stock = productStocks.find((stock) => stock.size === size);
    return {
      size,
      available: stock !== undefined,
    };
  });

  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      useCartStore.getState().addItem(productId, selectedSize);
      toast({
        title: "Added to cart",
        description: ` ${productTitle} - ${formatSize(
          selectedSize,
          category
        )} added to cart`,
      });
    }
  };

  const handleBuyNow = () => {
    if (selectedSize) {
      console.log(`Buying size ${selectedSize} now`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 my-5">
      <div className="space-y-2">
        <h3 className="text-lg">Select Size</h3>
        <p className="text-sm text-muted-foreground">
          {selectedSize
            ? `Selected: ${formatSize(selectedSize, category)}`
            : "Please select a size"}
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {sizes.map((sizeOption) => (
          <button
            key={sizeOption.size}
            onClick={() =>
              sizeOption.available && handleSizeSelect(sizeOption.size)
            }
            disabled={!sizeOption.available}
            className={cn(
              "h-12 border rounded-md flex items-center justify-center text-sm font-medium transition-colors",
              sizeOption.available
                ? "hover:bg-muted cursor-pointer"
                : "opacity-50 cursor-not-allowed bg-muted/50",
              selectedSize === sizeOption.size && "border-primary bg-primary/10"
            )}
            aria-label={`Size ${sizeOption.size}${
              sizeOption.available ? "" : " - Not available"
            }`}
          >
            {formatSize(sizeOption.size, category)}
            {!sizeOption.available && (
              <span className="sr-only"> - Not available</span>
            )}
          </button>
        ))}
      </div>

      <div className="pt-4 space-y-2">
        <Button
          onClick={handleBuyNow}
          disabled={!selectedSize}
          className="w-full"
        >
          Buy Now
        </Button>
        <Button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          variant="outline"
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>

      {!selectedSize && (
        <p className="text-sm text-muted-foreground text-center">
          Please select a size to continue
        </p>
      )}
    </div>
  );
}
