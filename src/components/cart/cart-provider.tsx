"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import {
  addLine,
  type CartLine,
  clearLines,
  getServerSnapshot,
  getSnapshot,
  removeLine,
  setLineQuantity,
  subscribe,
} from "@/lib/cart-store";
import { findProduct, type Size } from "@/lib/products";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (slug: string, size: Size, quantity?: number) => void;
  setQuantity: (slug: string, size: Size, quantity: number) => void;
  remove: (slug: string, size: Size) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((slug: string, size: Size, quantity = 1) => {
    addLine(slug, size, quantity);
    setIsOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = lines.reduce((total, line) => {
      const product = findProduct(line.slug);
      return product ? total + product.price * line.quantity : total;
    }, 0);

    return {
      lines,
      count,
      subtotal,
      isOpen,
      add,
      setQuantity: setLineQuantity,
      remove: removeLine,
      clear: clearLines,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, [lines, isOpen, add]);

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>");
  }
  return context;
}
