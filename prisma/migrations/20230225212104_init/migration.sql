-- CreateEnum
CREATE TYPE "MeasurementUnits" AS ENUM ('KG', 'LT', 'UNIT');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "image" TEXT,
    "roles" TEXT NOT NULL DEFAULT 'user|admin',
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalData" (
    "id" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "firstname" TEXT,
    "secondname" TEXT,
    "lastname" TEXT,
    "address" TEXT,
    "localNumber" INTEGER,
    "phone" INTEGER,
    "whatsapp" INTEGER,
    "telegram" INTEGER,
    "emailVerified" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "PersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "upadteAt" TIMESTAMPTZ(6),
    "createAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN DEFAULT true,
    "lastUpdateBy" VARCHAR(100),
    "name" VARCHAR(50) NOT NULL,
    "image" VARCHAR(200),
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemDetail" (
    "id" TEXT NOT NULL,
    "subName" TEXT,
    "itemId" TEXT NOT NULL,
    "createAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(6),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "autoUpdate" BOOLEAN DEFAULT false,
    "description" VARCHAR(255) DEFAULT '',
    "price" REAL NOT NULL DEFAULT 0,
    "quantity" REAL NOT NULL DEFAULT 0,
    "unit" "MeasurementUnits" NOT NULL,

    CONSTRAINT "ItemDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "itemId" TEXT,
    "inventoryId" TEXT,
    "Quantity" REAL NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(6),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyPrice" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "symbol" TEXT NOT NULL DEFAULT '',
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "CurrencyPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountingEntries" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number" INTEGER NOT NULL DEFAULT 0,
    "debit" DOUBLE PRECISION NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "acountsId" TEXT,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "AccountingEntries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountsC" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "AccountsC_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_identity_key" ON "PersonalData"("identity");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_userId_key" ON "PersonalData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_itemId_key" ON "InventoryItem"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_inventoryId_key" ON "InventoryItem"("inventoryId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalData" ADD CONSTRAINT "PersonalData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemDetail" ADD CONSTRAINT "ItemDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountingEntries" ADD CONSTRAINT "AccountingEntries_acountsId_fkey" FOREIGN KEY ("acountsId") REFERENCES "AccountsC"("id") ON DELETE SET NULL ON UPDATE CASCADE;
