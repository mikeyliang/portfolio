import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextOptions } from "@/lib/next-auth";
import NextAuth, { AuthOptions, getServerSession } from "next-auth";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const session = await getServerSession(NextOptions);
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const data = {
    type: reqBody.projectTypes,
    name: reqBody.projectName,
    description: reqBody.projectDescription,
    img: reqBody.projectFile,
    github: reqBody.githubLink ?? null,
    projectStartYear: reqBody.projectStart
      ? parseInt(reqBody.projectStart.split("/")[0])
      : null,
    projectStartMonth: reqBody.projectStart
      ? parseInt(reqBody.projectStart.split("/")[1])
      : null,
    projectEndYear: reqBody.projectEnd
      ? parseInt(reqBody.projectEnd.split("/")[0])
      : null,
    projectEndMonth:
      reqBody.projectEnd ? parseInt(reqBody.projectEnd.split("/")[1]) : null,
  };

  const project = await prisma.project.create({
    data,
  });

  return NextResponse.json({ project, message: "Project created" });
}
