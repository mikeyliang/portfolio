import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextOptions } from "@/lib/next-auth";
import NextAuth, { AuthOptions, getServerSession } from "next-auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  const session = await getServerSession(NextOptions);
  if (session?.user.role !== "ADMIN") {
    return NextResponse.redirect("/api/auth/signin");
  }
  
  const reqBody = await req.json();

  const data = {
    type: reqBody.projectTypes,
    name: reqBody.projectName,
    description: reqBody.projectDescription,
    img: reqBody.projectFile,
    github: reqBody.githubLink ?? null,
    projectStartYear: reqBody.projectStart
      ? parseInt(reqBody.projectStart.split("/")[1])
      : null,
    projectStartMonth: reqBody.projectStart
      ? parseInt(reqBody.projectStart.split("/")[0])
      : null,
    projectEndYear: reqBody.projectEnd
      ? parseInt(reqBody.projectEnd.split("/")[1])
      : null,
    projectEndMonth: reqBody.projectEnd
      ? parseInt(reqBody.projectEnd.split("/")[0])
      : null,
  };


  const project = await prisma.project.update({
    where: { id: parseInt(params.id) },
    data: data,
  });

  return NextResponse.json(project);
}
