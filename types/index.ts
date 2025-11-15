import type { Product } from "@/generated/prisma";

export type AppProduct = {
  images: {
    url: string;
  }[];
} & Omit<Product, "price"> & {
    price: number;
  };
