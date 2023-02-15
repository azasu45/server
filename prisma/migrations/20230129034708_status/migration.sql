/*
  Warnings:

  - Made the column `identity` on table `PersonalData` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PersonalData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identity" TEXT NOT NULL,
    "firstname" TEXT,
    "secondname" TEXT,
    "lastname" TEXT,
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
CREATE UNIQUE INDEX "PersonalData_identity_key" ON "PersonalData"("identity");
CREATE UNIQUE INDEX "PersonalData_userId_key" ON "PersonalData"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
