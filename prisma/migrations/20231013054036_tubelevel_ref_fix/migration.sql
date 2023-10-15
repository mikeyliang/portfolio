-- DropForeignKey
ALTER TABLE "Tube" DROP CONSTRAINT "Tube_id_fkey";

-- AddForeignKey
ALTER TABLE "Tube" ADD CONSTRAINT "Tube_level_fkey" FOREIGN KEY ("level") REFERENCES "TubeLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;
