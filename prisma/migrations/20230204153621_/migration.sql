/*
  Warnings:

  - You are about to drop the column `description` on the `Request` table. All the data in the column will be lost.
  - Added the required column `patientName` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationship` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Req" AS ENUM ('SELF', 'OTHERS');

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "description",
ADD COLUMN     "bloodUnits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "patientName" VARCHAR(255) NOT NULL,
ADD COLUMN     "relationship" VARCHAR(255) NOT NULL,
ADD COLUMN     "requestType" "Req" NOT NULL DEFAULT 'OTHERS';
