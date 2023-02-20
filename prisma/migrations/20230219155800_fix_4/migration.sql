/*
  Warnings:

  - A unique constraint covering the columns `[inventoryId]` on the table `InventoryItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[itemId]` on the table `InventoryItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_inventoryId_key" ON "InventoryItem"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_itemId_key" ON "InventoryItem"("itemId");
