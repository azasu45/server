/*
  Warnings:

  - You are about to drop the `ItemDetail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inventoryItemId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inventoryItemId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ItemDetail";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ImageFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "priceDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" REAL NOT NULL DEFAULT 0,
    "price" REAL NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL DEFAULT '',
    "inventoryItemId" TEXT,
    CONSTRAINT "priceDetail_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_inventoryItemId_key" ON "Inventory"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_inventoryItemId_key" ON "Item"("inventoryItemId");
