/*
  Warnings:

  - You are about to drop the `Acounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Acounts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AccountsC" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL DEFAULT 0,
    "descripcion" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccountingEntries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL DEFAULT 0,
    "descripcion" TEXT NOT NULL,
    "debit" REAL NOT NULL,
    "credit" REAL NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acountsId" TEXT,
    CONSTRAINT "AccountingEntries_acountsId_fkey" FOREIGN KEY ("acountsId") REFERENCES "AccountsC" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AccountingEntries" ("acountsId", "createAt", "credit", "debit", "descripcion", "id", "number") SELECT "acountsId", "createAt", "credit", "debit", "descripcion", "id", "number" FROM "AccountingEntries";
DROP TABLE "AccountingEntries";
ALTER TABLE "new_AccountingEntries" RENAME TO "AccountingEntries";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
