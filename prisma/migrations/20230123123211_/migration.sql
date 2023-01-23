/*
  Warnings:

  - You are about to drop the column `facilityId` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `DonationBroadCast` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmergencyBroadCast` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Facility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `donorNumber` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facility` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "DonationBroadCast" DROP CONSTRAINT "DonationBroadCast_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyBroadCast" DROP CONSTRAINT "EmergencyBroadCast_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyBroadCast" DROP CONSTRAINT "EmergencyBroadCast_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userId_fkey";

-- DropIndex
DROP INDEX "Donation_facilityId_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "facilityId",
ADD COLUMN     "donorNumber" TEXT NOT NULL,
ADD COLUMN     "facility" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "otp",
DROP COLUMN "phone",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "DonationBroadCast";

-- DropTable
DROP TABLE "EmergencyBroadCast";

-- DropTable
DROP TABLE "Facility";

-- DropTable
DROP TABLE "UserProfile";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationFeed" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "media" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyFeed" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyFeed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_bloodType_key" ON "Profile"("bloodType");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationFeed" ADD CONSTRAINT "DonationFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyFeed" ADD CONSTRAINT "EmergencyFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
