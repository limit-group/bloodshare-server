/*
  Warnings:

  - You are about to drop the column `facilityProfileId` on the `DonationBroadCast` table. All the data in the column will be lost.
  - You are about to drop the column `facilityProfileId` on the `EmergencyDonationBroadCast` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Facility` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Facility` table. All the data in the column will be lost.
  - You are about to drop the `FacilityProfile` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `facilityId` on table `DonationBroadCast` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facilityId` on table `EmergencyDonationBroadCast` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `mission` to the `Facility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetName` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DonationBroadCast" DROP CONSTRAINT "DonationBroadCast_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "DonationBroadCast" DROP CONSTRAINT "DonationBroadCast_facilityProfileId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyDonationBroadCast" DROP CONSTRAINT "EmergencyDonationBroadCast_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyDonationBroadCast" DROP CONSTRAINT "EmergencyDonationBroadCast_facilityProfileId_fkey";

-- DropForeignKey
ALTER TABLE "FacilityProfile" DROP CONSTRAINT "FacilityProfile_facilityId_fkey";

-- DropIndex
DROP INDEX "DonationBroadCast_facilityProfileId_key";

-- DropIndex
DROP INDEX "EmergencyDonationBroadCast_facilityProfileId_key";

-- AlterTable
ALTER TABLE "DonationBroadCast" DROP COLUMN "facilityProfileId",
ALTER COLUMN "facilityId" SET NOT NULL;

-- AlterTable
ALTER TABLE "EmergencyDonationBroadCast" DROP COLUMN "facilityProfileId",
ALTER COLUMN "facilityId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Facility" DROP COLUMN "description",
DROP COLUMN "street",
ADD COLUMN     "mission" TEXT NOT NULL,
ADD COLUMN     "streetName" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "FacilityProfile";

-- AddForeignKey
ALTER TABLE "DonationBroadCast" ADD CONSTRAINT "DonationBroadCast_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyDonationBroadCast" ADD CONSTRAINT "EmergencyDonationBroadCast_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
