/*
  Warnings:

  - You are about to drop the column `inProgress` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectTime` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "inProgress",
DROP COLUMN "projectTime",
ADD COLUMN     "projectEndMonth" INTEGER,
ADD COLUMN     "projectEndYear" INTEGER,
ADD COLUMN     "projectStartMonth" INTEGER,
ADD COLUMN     "projectStartYear" INTEGER;
