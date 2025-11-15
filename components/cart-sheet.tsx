"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCart } from "../hooks/use-cart";
import Image from "next/image";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Your cart is empty
            </p>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="size-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                      >
                        −
                      </Button>
                      <span className="text-sm font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button className="w-full">Checkout</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
