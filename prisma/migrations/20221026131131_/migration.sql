/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FacilityAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Facility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Facility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Facility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "FacilityAddress" DROP CONSTRAINT "FacilityAddress_facilityId_fkey";

-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "streetNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "streetName" TEXT,
ADD COLUMN     "streetNumber" TEXT;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "FacilityAddress";
