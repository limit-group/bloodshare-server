/*
  Warnings:

  - You are about to drop the column `donorId` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_donorId_fkey";

-- DropIndex
DROP INDEX "Donation_donorId_key";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "donorId",
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
