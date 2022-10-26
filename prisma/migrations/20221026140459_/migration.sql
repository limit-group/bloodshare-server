/*
  Warnings:

  - A unique constraint covering the columns `[licenseNumber]` on the table `Facility` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `licenseNumber` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "license" TEXT,
ADD COLUMN     "licenseNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Facility_licenseNumber_key" ON "Facility"("licenseNumber");
