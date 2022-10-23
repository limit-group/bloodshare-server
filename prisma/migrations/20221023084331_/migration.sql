/*
  Warnings:

  - Changed the type of `bloodType` on the `UserProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'AB_NEGATIVE', 'AB_POSITIVE', 'O_POSITIVE', 'O_NEGATIVE');

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "bloodType",
ADD COLUMN     "bloodType" "BloodType" NOT NULL;

-- CreateTable
CREATE TABLE "DonationBroadCast" (
    "id" SERIAL NOT NULL,
    "when" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "facilityProfileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationBroadCast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyDonationBroadCast" (
    "id" SERIAL NOT NULL,
    "facilityProfileId" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyDonationBroadCast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DonationBroadCast_facilityProfileId_key" ON "DonationBroadCast"("facilityProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyDonationBroadCast_facilityProfileId_key" ON "EmergencyDonationBroadCast"("facilityProfileId");

-- AddForeignKey
ALTER TABLE "DonationBroadCast" ADD CONSTRAINT "DonationBroadCast_facilityProfileId_fkey" FOREIGN KEY ("facilityProfileId") REFERENCES "FacilityProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyDonationBroadCast" ADD CONSTRAINT "EmergencyDonationBroadCast_facilityProfileId_fkey" FOREIGN KEY ("facilityProfileId") REFERENCES "FacilityProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
