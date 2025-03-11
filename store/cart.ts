import { Size } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface CartItem {
  productId: string;
  size: Size;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, size: Size) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set) => ({
      items: [],
      addItem: (productId: string, size: Size) => {
        set((state) => {
          const item = state.items.find(
            (item) => item.productId === productId && item.size === size
          );
          if (item) {
            item.quantity += 1;
          } else {
            state.items.push({
              productId,
              size,
              quantity: 1,
            });
          }
        });
      },
      removeItem: (productId: string, size: Size) => {
        set((state) => {
          state.items = state.items.filter(
            (item) => item.productId !== productId || item.size !== size
          );
        });
      },
      updateQuantity: (
        productId: string,
        size: Size,
        addedQuantity: number
      ) => {
        set((state) => {
          const item = state.items.find(
            (item) => item.productId === productId && item.size === size
          );
          if (item) {
            item.quantity += addedQuantity;

            if (item.quantity <= 0) {
              state.items = state.items.filter(
                (item) => item.productId !== productId || item.size !== size
              );
            }
          }
        });
      },
      clearCart: () => {},
    })),
    { name: "cart", storage: createJSONStorage(() => localStorage) }
  )
);
