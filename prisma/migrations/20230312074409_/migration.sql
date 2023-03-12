/*
  Warnings:

  - You are about to drop the `_FacilityToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gender` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FacilityToUser" DROP CONSTRAINT "_FacilityToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FacilityToUser" DROP CONSTRAINT "_FacilityToUser_B_fkey";

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "facilityId" INTEGER;

-- DropTable
DROP TABLE "_FacilityToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;
