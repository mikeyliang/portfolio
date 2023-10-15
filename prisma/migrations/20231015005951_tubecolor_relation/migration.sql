/*
  Warnings:

  - You are about to drop the `_TubeToTubeColor` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `TubeColor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `level` to the `TubeColor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TubeToTubeColor" DROP CONSTRAINT "_TubeToTubeColor_A_fkey";

-- DropForeignKey
ALTER TABLE "_TubeToTubeColor" DROP CONSTRAINT "_TubeToTubeColor_B_fkey";

-- AlterTable
ALTER TABLE "TubeColor" ADD COLUMN     "level" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_TubeToTubeColor";

-- CreateTable
CREATE TABLE "TubeColorRelation" (
    "id" INTEGER NOT NULL,
    "tubeId" INTEGER NOT NULL,
    "tubeColorId" INTEGER NOT NULL,

    CONSTRAINT "TubeColorRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TubeColor_id_key" ON "TubeColor"("id");

-- AddForeignKey
ALTER TABLE "TubeColorRelation" ADD CONSTRAINT "TubeColorRelation_tubeId_fkey" FOREIGN KEY ("tubeId") REFERENCES "Tube"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TubeColorRelation" ADD CONSTRAINT "TubeColorRelation_tubeColorId_fkey" FOREIGN KEY ("tubeColorId") REFERENCES "TubeColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TubeColor" ADD CONSTRAINT "TubeColor_level_fkey" FOREIGN KEY ("level") REFERENCES "TubeLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;
