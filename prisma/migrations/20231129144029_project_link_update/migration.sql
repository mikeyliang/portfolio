/*
  Warnings:

  - A unique constraint covering the columns `[projectId,order]` on the table `ProjectContent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProjectContent_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectContent_projectId_order_key" ON "ProjectContent"("projectId", "order");
