/*
  Warnings:

  - The `donationDate` column on the `Donation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "donationDate",
ADD COLUMN     "donationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
