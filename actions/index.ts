"use server";

import { prisma } from "@/lib/prisma";
import type { AppProduct } from "@/types";

export async function getProductClassBySlug(slug: string) {
  try {
    const result = await prisma.productClass.findUnique({
      where: {
        slug,
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching product class:", error);
    throw error;
  }
}

export async function getCategoriesByClass(classId: string) {
  try {
    const result = await prisma.category.findMany({
      where: {
        classId,
      },
      orderBy: {
        name: "asc",
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getProductsByClass(
  classId: string,
): Promise<AppProduct[]> {
  try {
    const result = await prisma.product.findMany({
      where: {
        classId,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return result.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));
  } catch (error) {
    console.error("Error fetching products by class:", error);
    throw error;
  }
}

export async function getProductsByCategory(
  categoryId: string,
): Promise<AppProduct[]> {
  try {
    const result = await prisma.product.findMany({
      where: {
        categoryId,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return result.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}

export async function getAllProductClasses(exclude: string) {
  try {
    const results = await prisma.productClass.findMany({
      where: {
        slug: {
          not: exclude,
        },
      },
    });
    return results;
  } catch (error) {
    console.error("Error fetching product classes:", error);
    throw error;
  }
}
