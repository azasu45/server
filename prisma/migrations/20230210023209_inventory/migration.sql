/*
  Warnings:

  - You are about to drop the column `idInventory` on the `Item` table. All the data in the column will be lost.
  - Added the required column `status` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PriceDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "itemId" TEXT,
    CONSTRAINT "PriceDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AccountingEntries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL DEFAULT 0,
    "descripcion" TEXT NOT NULL,
    "debit" REAL NOT NULL,
    "credit" REAL NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acountsId" TEXT,
    CONSTRAINT "AccountingEntries_acountsId_fkey" FOREIGN KEY ("acountsId") REFERENCES "Acounts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Acounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL DEFAULT 0,
    "descripcion" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateAt" DATETIME NOT NULL,
    "lastUpdateBy" TEXT,
    "idCategory" TEXT NOT NULL,
    "inventoryId" TEXT,
    CONSTRAINT "Item_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("createAt", "id", "idCategory", "lastUpdateAt", "lastUpdateBy", "name", "status") SELECT "createAt", "id", "idCategory", "lastUpdateAt", "lastUpdateBy", "name", "status" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
CREATE TABLE "new_Inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Inventory" ("id", "name") SELECT "id", "name" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
