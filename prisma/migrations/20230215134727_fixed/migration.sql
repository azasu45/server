/*
  Warnings:

  - You are about to drop the `PriceDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `inventoryId` on the `Item` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PriceDetail";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ItemDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" REAL NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inventoryItemId" TEXT,
    CONSTRAINT "ItemDetail_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inventoryItemId" TEXT,
    CONSTRAINT "Inventory_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "inventoryItemId" TEXT,
    CONSTRAINT "Item_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("createAt", "id", "idCategory", "lastUpdateAt", "lastUpdateBy", "name", "status") SELECT "createAt", "id", "idCategory", "lastUpdateAt", "lastUpdateBy", "name", "status" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
