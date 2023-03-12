/*
  Warnings:

  - Added the required column `city` to the `Facility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
