/*
  Warnings:

  - You are about to drop the column `userId` on the `Facility` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[facilityId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `facilityId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_userId_fkey";

-- DropIndex
DROP INDEX "Facility_userId_key";

-- AlterTable
ALTER TABLE "Facility" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "facilityId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_facilityId_key" ON "User"("facilityId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
