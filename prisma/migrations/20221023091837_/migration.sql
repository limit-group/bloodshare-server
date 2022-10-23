/*
  Warnings:

  - You are about to drop the column `facilityId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Facility` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_facilityId_fkey";

-- DropIndex
DROP INDEX "User_facilityId_key";

-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "facilityId";

-- CreateIndex
CREATE UNIQUE INDEX "Facility_userId_key" ON "Facility"("userId");

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
