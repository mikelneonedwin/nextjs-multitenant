/*
  Warnings:

  - Added the required column `slug` to the `ProductClass` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductClass" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ProductClass" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ProductClass";
DROP TABLE "ProductClass";
ALTER TABLE "new_ProductClass" RENAME TO "ProductClass";
CREATE UNIQUE INDEX "ProductClass_name_key" ON "ProductClass"("name");
CREATE UNIQUE INDEX "ProductClass_slug_key" ON "ProductClass"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
