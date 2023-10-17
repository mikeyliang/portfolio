-- DropForeignKey
ALTER TABLE "TubeMoves" DROP CONSTRAINT "TubeMoves_from_fkey";

-- DropForeignKey
ALTER TABLE "TubeMoves" DROP CONSTRAINT "TubeMoves_to_fkey";

-- AddForeignKey
ALTER TABLE "TubeMoves" ADD CONSTRAINT "TubeMoves_from_fkey" FOREIGN KEY ("from") REFERENCES "Tube"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TubeMoves" ADD CONSTRAINT "TubeMoves_to_fkey" FOREIGN KEY ("to") REFERENCES "Tube"("id") ON DELETE CASCADE ON UPDATE CASCADE;
