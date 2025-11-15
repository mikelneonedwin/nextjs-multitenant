"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AppProduct } from "@/types";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

export function ProductCard({ product }: { product: AppProduct }) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image:
        product.images?.[0]?.url || "/placeholder.svg?height=200&width=200",
      quantity: 1,
    });
    setIsAdding(false);
  };

  const imageUrl =
    product.images?.[0]?.url || "/diverse-products-still-life.png";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          fill
          src={imageUrl || "/placeholder.svg"}
          alt={product.name}
          className="size-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        {product.brand && (
          <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
        )}
        <h3 className="font-semibold text-base mb-2 line-clamp-2 text-balance">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-primary">
            ${Number(product.price).toFixed(2)}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {product.rating}
              </span>
            </div>
          )}
        </div>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
