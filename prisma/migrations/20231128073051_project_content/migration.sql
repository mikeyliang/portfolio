-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'HEADING', 'FILE', 'LINK');

-- CreateTable
CREATE TABLE "ProjectContent" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "contentType" "ContentType" NOT NULL,
    "content" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectContent" ADD CONSTRAINT "ProjectContent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
