/*
  Warnings:

  - You are about to drop the column `projectLink` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order]` on the table `ProjectContent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectLink",
ADD COLUMN     "github" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectContent_order_key" ON "ProjectContent"("order");
