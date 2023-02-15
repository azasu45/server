/*
  Warnings:

  - You are about to drop the column `email` on the `PersonalData` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `PersonalData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "email" TEXT;
ALTER TABLE "User" ADD COLUMN "password" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PersonalData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstname" TEXT,
    "secondname" TEXT,
    "lastname" TEXT,
    "identity" TEXT,
    "address" TEXT,
    "localNumber" INTEGER,
    "phone" INTEGER,
    "whatsapp" INTEGER,
    "telegram" INTEGER,
    "emailVerified" DATETIME,
    "userId" TEXT NOT NULL,
    CONSTRAINT "PersonalData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PersonalData" ("address", "emailVerified", "firstname", "id", "identity", "lastname", "localNumber", "phone", "secondname", "telegram", "userId", "whatsapp") SELECT "address", "emailVerified", "firstname", "id", "identity", "lastname", "localNumber", "phone", "secondname", "telegram", "userId", "whatsapp" FROM "PersonalData";
DROP TABLE "PersonalData";
ALTER TABLE "new_PersonalData" RENAME TO "PersonalData";
CREATE UNIQUE INDEX "PersonalData_userId_key" ON "PersonalData"("userId");
CREATE UNIQUE INDEX "PersonalData_firstname_secondname_lastname_key" ON "PersonalData"("firstname", "secondname", "lastname");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
