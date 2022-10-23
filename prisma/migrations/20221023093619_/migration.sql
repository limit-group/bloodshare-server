/*
  Warnings:

  - You are about to drop the column `facilityId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_facilityId_fkey";

-- DropIndex
DROP INDEX "User_facilityId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "facilityId";
