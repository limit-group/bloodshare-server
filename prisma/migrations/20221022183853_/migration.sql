/*
  Warnings:

  - You are about to drop the column `street` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `streetName` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `streetNumber` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street` on table `FacilityAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `streetNumber` on table `FacilityAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `FacilityAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `FacilityAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateOfBirth` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bloodType` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'FACILITYUSER', 'FACILITYADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "street",
ADD COLUMN     "streetName" TEXT NOT NULL,
ALTER COLUMN "streetNumber" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL;

-- AlterTable
ALTER TABLE "FacilityAddress" ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "streetNumber" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "dateOfBirth" SET NOT NULL,
ALTER COLUMN "bloodType" SET NOT NULL;

-- DropTable
DROP TABLE "Admin";
