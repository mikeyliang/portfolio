-- CreateEnum
CREATE TYPE "LevelType" AS ENUM ('REGULAR', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectLink" TEXT;

-- CreateTable
CREATE TABLE "TubeLevel" (
    "level" INTEGER NOT NULL,
    "type" "LevelType" NOT NULL DEFAULT 'REGULAR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TubeLevel_pkey" PRIMARY KEY ("level")
);

-- CreateTable
CREATE TABLE "TubeMoves" (
    "step" INTEGER NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,

    CONSTRAINT "TubeMoves_pkey" PRIMARY KEY ("step")
);

-- CreateTable
CREATE TABLE "Tube" (
    "id" INTEGER NOT NULL,
    "tubeIndex" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Tube_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TubeColor" (
    "id" INTEGER NOT NULL,
    "colorIndex" INTEGER NOT NULL,
    "tubeId" INTEGER NOT NULL,
    "red" INTEGER NOT NULL,
    "green" INTEGER NOT NULL,
    "blue" INTEGER NOT NULL,

    CONSTRAINT "TubeColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TubeToTubeColor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TubeLevel_level_key" ON "TubeLevel"("level");

-- CreateIndex
CREATE UNIQUE INDEX "_TubeToTubeColor_AB_unique" ON "_TubeToTubeColor"("A", "B");

-- CreateIndex
CREATE INDEX "_TubeToTubeColor_B_index" ON "_TubeToTubeColor"("B");

-- AddForeignKey
ALTER TABLE "TubeMoves" ADD CONSTRAINT "TubeMoves_from_fkey" FOREIGN KEY ("from") REFERENCES "Tube"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TubeMoves" ADD CONSTRAINT "TubeMoves_to_fkey" FOREIGN KEY ("to") REFERENCES "Tube"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tube" ADD CONSTRAINT "Tube_id_fkey" FOREIGN KEY ("id") REFERENCES "TubeLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TubeToTubeColor" ADD CONSTRAINT "_TubeToTubeColor_A_fkey" FOREIGN KEY ("A") REFERENCES "Tube"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TubeToTubeColor" ADD CONSTRAINT "_TubeToTubeColor_B_fkey" FOREIGN KEY ("B") REFERENCES "TubeColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
