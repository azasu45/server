-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "number" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderId" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "price" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_inventoryItemId_key" ON "OrderItem"("orderId", "inventoryItemId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
