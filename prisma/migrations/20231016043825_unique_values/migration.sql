/*
  Warnings:

  - A unique constraint covering the columns `[level,tubeIndex]` on the table `Tube` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[level,colorIndex]` on the table `TubeColor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tubeId,tubeColorId,level,position]` on the table `TubeColorRelation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[level,step]` on the table `TubeMoves` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `level` to the `TubeColorRelation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `TubeColorRelation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TubeColorRelation" ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tube_level_tubeIndex_key" ON "Tube"("level", "tubeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "TubeColor_level_colorIndex_key" ON "TubeColor"("level", "colorIndex");

-- CreateIndex
CREATE UNIQUE INDEX "TubeColorRelation_tubeId_tubeColorId_level_position_key" ON "TubeColorRelation"("tubeId", "tubeColorId", "level", "position");

-- CreateIndex
CREATE UNIQUE INDEX "TubeMoves_level_step_key" ON "TubeMoves"("level", "step");

-- AddForeignKey
ALTER TABLE "TubeColorRelation" ADD CONSTRAINT "TubeColorRelation_level_fkey" FOREIGN KEY ("level") REFERENCES "TubeLevel"("level") ON DELETE CASCADE ON UPDATE CASCADE;
