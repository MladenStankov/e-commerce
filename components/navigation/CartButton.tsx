"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "../ui/sheet";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { getCartItems, CartItemWithDetails } from "@/app/actions/cart";
import { formatSize } from "@/lib/formatters";
interface IProps {
  title?: string;
}

export default function CartButton({ title }: IProps) {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (items.length > 0) {
        setLoading(true);
        try {
          const products = await getCartItems(items);
          setCartItems(products);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCartItems([]);
      }
    };

    fetchCartItems();
  }, [items]);

  const subtotal =
    cartItems.reduce((sum, item) => {
      return sum + item.priceInEuroCents * item.quantity;
    }, 0) / 100;

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative flex items-center gap-2 ml-2">
          <ShoppingCart size={30} className="relative hover:cursor-pointer" />
          <div
            className={cn(
              "absolute translate-x-1/2 -translate-y-1/2 right-0 w-5 h-5 bg-primary rounded-full text-foreground flex items-center justify-center text-sm p-1 text-white",
              title && "right-0 top-1/2 p-5 text-xl mr-4"
            )}
          >
            {items.length}
          </div>
          {title && <p className="text-foreground text-xl">{title}</p>}
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {loading
              ? "Loading cart..."
              : cartItems.length === 0
              ? "Your cart is empty"
              : `You have ${items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )} items in your cart`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p>Loading cart items...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add items to your cart to see them here
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((product) => (
                <li key={product.cartItemId} className="flex gap-4">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
                    {product.productImages?.[0] && (
                      <Image
                        src={
                          product.productImages[0].imagePath ||
                          "/placeholder.svg"
                        }
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{product.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          Size: {formatSize(product.size, product.category)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeItem(product.id, product.size)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      €{(product.priceInEuroCents / 100).toFixed(2)}
                    </p>
                    <div className="mt-auto flex items-center">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(product.id, product.size, -1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {product.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(product.id, product.size, 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <span className="ml-auto font-medium">
                        €
                        {(
                          (product.priceInEuroCents * product.quantity) /
                          100
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="space-y-4">
          <Separator />
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-sm">Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Shipping</span>
              <span>€{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
          <SheetFooter className="flex sm:flex-col gap-2 justify-between">
            <Button disabled={cartItems.length === 0} className="w-full">
              Checkout
            </Button>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </SheetTrigger>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
