/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `TubeColorRelation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `level` to the `TubeMoves` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tube" DROP CONSTRAINT "Tube_level_fkey";

-- DropForeignKey
ALTER TABLE "TubeColor" DROP CONSTRAINT "TubeColor_level_fkey";

-- DropForeignKey
ALTER TABLE "TubeColorRelation" DROP CONSTRAINT "TubeColorRelation_tubeColorId_fkey";

-- DropForeignKey
ALTER TABLE "TubeColorRelation" DROP CONSTRAINT "TubeColorRelation_tubeId_fkey";

-- AlterTable
CREATE SEQUENCE tubecolorrelation_id_seq;
ALTER TABLE "TubeColorRelation" ALTER COLUMN "id" SET DEFAULT nextval('tubecolorrelation_id_seq');
ALTER SEQUENCE tubecolorrelation_id_seq OWNED BY "TubeColorRelation"."id";

-- AlterTable
ALTER TABLE "TubeMoves" ADD COLUMN     "level" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TubeColorRelation_id_key" ON "TubeColorRelation"("id");

-- AddForeignKey
ALTER TABLE "TubeMoves" ADD CONSTRAINT "TubeMoves_level_fkey" FOREIGN KEY ("level") REFERENCES "TubeLevel"("level") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tube" ADD CONSTRAINT "Tube_level_fkey" FOREIGN KEY ("level") REFERENCES "TubeLevel"("level") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TubeColorRelation" ADD CONSTRAINT "TubeColorRelation_tubeId_fkey" FOREIGN KEY ("tubeId") REFERENCES "Tube"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TubeColorRelation" ADD CONSTRAINT "TubeColorRelation_tubeColorId_fkey" FOREIGN KEY ("tubeColorId") REFERENCES "TubeColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TubeColor" ADD CONSTRAINT "TubeColor_level_fkey" FOREIGN KEY ("level") REFERENCES "TubeLevel"("level") ON DELETE CASCADE ON UPDATE CASCADE;
