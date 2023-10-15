/*
  Warnings:

  - The primary key for the `TubeMoves` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
CREATE SEQUENCE tube_id_seq;
ALTER TABLE "Tube" ALTER COLUMN "id" SET DEFAULT nextval('tube_id_seq');
ALTER SEQUENCE tube_id_seq OWNED BY "Tube"."id";

-- AlterTable
CREATE SEQUENCE tubecolor_id_seq;
ALTER TABLE "TubeColor" ALTER COLUMN "id" SET DEFAULT nextval('tubecolor_id_seq');
ALTER SEQUENCE tubecolor_id_seq OWNED BY "TubeColor"."id";

-- AlterTable
ALTER TABLE "TubeMoves" DROP CONSTRAINT "TubeMoves_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TubeMoves_pkey" PRIMARY KEY ("id");
