"use client";

import { Button } from "@/components/ui/button";
import { useGetProductClass } from "@/hooks/use-get-product-class";
import { ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCart } from "../hooks/use-cart";
import { CartSheet } from "./cart-sheet";

export function Header() {
  const { items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { domain } = useParams<{ domain: string }>();
  const { data } = useGetProductClass(domain);
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shop{data && ` - ${data.name}`}</h1>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {itemCount}
            </span>
          )}
        </Button>
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </header>
  );
}
