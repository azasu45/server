/*
  Warnings:

  - You are about to drop the `priceDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `inventoryItemId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryItemId` on the `Item` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "priceDetail";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PriceDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" REAL NOT NULL DEFAULT 0,
    "price" REAL NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "autoUpdate" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL DEFAULT '',
    "inventoryItemId" TEXT,
    CONSTRAINT "PriceDetail_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Inventory" ("createAt", "id", "name", "status") SELECT "createAt", "id", "name", "status" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateAt" DATETIME NOT NULL,
    "lastUpdateBy" TEXT,
    "idCategory" TEXT NOT NULL,
    CONSTRAINT "Item_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("createAt", "id", "idCategory", "lastUpdateAt", "lastUpdateBy", "name", "status") SELECT "createAt", "id", "idCategory", "lastUpdateAt", "lastUpdateBy", "name", "status" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
CREATE TABLE "new_InventoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inventoryId" TEXT,
    "itemId" TEXT,
    CONSTRAINT "InventoryItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "InventoryItem_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_InventoryItem" ("id") SELECT "id" FROM "InventoryItem";
DROP TABLE "InventoryItem";
ALTER TABLE "new_InventoryItem" RENAME TO "InventoryItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
