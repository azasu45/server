/*
  Warnings:

  - You are about to drop the `ImageFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "InventoryItem_inventoryId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ImageFile";
PRAGMA foreign_keys=on;
