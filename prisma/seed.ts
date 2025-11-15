import { Prisma, type Product, type ProductImage } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";

const CLASSES: Record<string, string[]> = {
  Electronics: [
    "Phones & Tablets",
    "Laptops & Computers",
    "Accessories",
    "Audio",
    "Gaming",
    "Wearables",
  ],
  Fashion: ["Men", "Women", "Accessories", "Kids"],
  HomeFurniture: [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Office",
    "Outdoor",
    "Decor",
  ],
  Beauty: ["Skincare", "Haircare", "Fragrances", "Makeup", "Grooming Tools"],
  Groceries: ["Fresh Food", "Snacks", "Drinks", "Cleaning", "Baby Products"],
  BooksMedia: ["Books", "Magazines", "Music", "Movies"],
  SportsOutdoor: [
    "Fitness Equipment",
    "Camping",
    "Cycling",
    "Sport Accessories",
  ],
  Automotive: [
    "Car Accessories",
    "Motorcycle Accessories",
    "Tools & Maintenance",
  ],
  Appliances: [
    "Kitchen Appliances",
    "Laundry Appliances",
    "Cooling & Heating",
    "Cleaning Appliances",
  ],
  ToysBaby: [
    "Educational Toys",
    "Dolls & Figures",
    "Baby Care",
    "Outdoor Toys",
  ],
};

// --------------------------------------------
// SLUG GENERATOR
// --------------------------------------------
function makeSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "") + "-mikel-tenant";
}

// --------------------------------------------
// SPECS GENERATOR
// --------------------------------------------
function generateSpecs() {
  return {
    weight: `${faker.number.float({ min: 0.2, max: 10, fractionDigits: 1 })}kg`,
    color: faker.color.human(),
    warranty: faker.helpers.arrayElement(["6 months", "1 year", "2 years"]),
    material: faker.commerce.productMaterial(),
    dimensions: `${faker.number.int({ min: 5, max: 120 })} x ${faker.number.int(
      {
        min: 5,
        max: 120,
      },
    )} cm`,
  };
}

// --------------------------------------------
// PRODUCT GENERATOR
// --------------------------------------------
function generateProduct(classId: string, categoryId: string) {
  return {
    classId,
    categoryId,
    name: faker.commerce.productName(),
    brand: faker.company.name(),
    description: faker.commerce.productDescription(),
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    stock: faker.number.int({ min: 0, max: 500 }),
    specs: generateSpecs(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    price: new Prisma.Decimal(faker.commerce.price({ min: 5, max: 2000 })),
  } satisfies Omit<Product, "id">;
}

// --------------------------------------------
// PRODUCT IMAGES (2 each)
// --------------------------------------------
function generateImages(productId: string) {
  return [
    {
      productId,
      url: faker.image.urlLoremFlickr({ category: "product" }),
    },
    {
      productId,
      url: faker.image.urlLoremFlickr({ category: "product" }),
    },
  ] satisfies Omit<ProductImage, "id">[];
}

// --------------------------------------------
// MAIN SEED FUNCTION
// --------------------------------------------
async function main() {
  console.info("🌱 Seeding database...");

  // 1. Insert Product Classes
  console.info("🧩 Creating product classes...");
  const classKeys = Object.keys(CLASSES);

  const classResults = await prisma.productClass.createManyAndReturn({
    data: classKeys.map((name) => ({
      name,
      slug: makeSlug(name), // ← IMPORTANT
    })),
    select: { id: true, name: true, slug: true },
  });

  console.info(`✔️ Created ${classResults.length} product classes.`);
  const classMap = Object.fromEntries(classResults.map((c) => [c.name, c.id]));

  // 2. Insert Categories
  console.info("📂 Creating categories...");
  const categories = Object.entries(CLASSES).flatMap(([className, cats]) =>
    cats.map((category) => ({
      name: category,
      classId: classMap[className],
    })),
  );

  const categoryResults = await prisma.category.createManyAndReturn({
    data: categories,
    select: { id: true, name: true, classId: true },
  });

  console.info(`✔️ Created ${categoryResults.length} categories.`);

  // 3. Insert Products (100 per category)
  console.info("📦 Generating 100 products per category...");
  const products = categoryResults.flatMap((category) =>
    Array.from({ length: 100 }).map(() =>
      generateProduct(category.classId, category.id),
    ),
  );

  console.info(`📦 Total products to insert: ${products.length}`);
  const productResults = await prisma.product.createManyAndReturn({
    data: products,
    select: { id: true },
  });

  console.info(`✔️ Inserted ${productResults.length} products.`);

  // 4. Insert images
  console.info("🖼 Generating images (2 each)...");
  const imageData = productResults.flatMap((p) => generateImages(p.id));

  console.info(`🖼 Total images to insert: ${imageData.length}`);
  await prisma.productImage.createMany({ data: imageData });

  console.info("✔️ Inserted all product images.");
  console.info("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
