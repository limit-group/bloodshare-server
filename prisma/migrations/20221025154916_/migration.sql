/*
  Warnings:

  - You are about to drop the column `profileId` on the `Donation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[donorId]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `donorId` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_profileId_fkey";

-- DropIndex
DROP INDEX "Donation_profileId_key";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "profileId",
ADD COLUMN     "donorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DonationBroadCast" ADD COLUMN     "facilityId" INTEGER;

-- AlterTable
ALTER TABLE "EmergencyDonationBroadCast" ADD COLUMN     "facilityId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Donation_donorId_key" ON "Donation"("donorId");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationBroadCast" ADD CONSTRAINT "DonationBroadCast_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyDonationBroadCast" ADD CONSTRAINT "EmergencyDonationBroadCast_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;
