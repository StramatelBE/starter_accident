/*
  Warnings:

  - You are about to drop the `UserSettings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `language` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserSettings";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "language" TEXT NOT NULL,
    "theme" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "password", "role", "username") SELECT "id", "password", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
