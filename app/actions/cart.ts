"use server";

import prisma from "@/lib/prisma";
import { CartItem } from "@/store/cart";
import { Category, Size } from "@prisma/client";

export interface ICartItem {
  id: string;
  title: string;
  priceInEuroCents: number;
  productImages: { imagePath: string }[];
  category: Category;
}

export type CartItemWithDetails = ICartItem & {
  size: Size;
  quantity: number;
  cartItemId: string;
};

export async function getCartItems(
  items: CartItem[]
): Promise<CartItemWithDetails[]> {
  console.log(items);

  const cartItems = await prisma.product.findMany({
    where: {
      id: { in: items.map((item) => item.productId) },
    },
    select: {
      id: true,
      title: true,
      priceInEuroCents: true,
      productImages: { select: { imagePath: true }, take: 1 },
      category: true,
    },
  });

  // Create a new array that includes size information from the cart items
  const cartItemsWithSize = items
    .map((cartItem) => {
      const product = cartItems.find(
        (product) => product.id === cartItem.productId
      );
      if (!product) return null;

      return {
        ...product,
        size: cartItem.size,
        quantity: cartItem.quantity,
        cartItemId: `${cartItem.productId}-${cartItem.size}`, // Create a unique ID for each product+size combination
      };
    })
    .filter(Boolean) as (ICartItem & {
    size: Size;
    quantity: number;
    cartItemId: string;
  })[];

  return cartItemsWithSize;
}
