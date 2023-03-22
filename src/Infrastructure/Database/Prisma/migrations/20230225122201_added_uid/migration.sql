/*
  Warnings:

  - Added the required column `uid` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uid" TEXT NOT NULL;
