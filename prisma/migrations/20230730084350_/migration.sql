/*
  Warnings:

  - You are about to drop the column `date` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "date",
ADD COLUMN     "projectTime" TEXT;
