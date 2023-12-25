import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ProjectContent } from "@/types/project";
import {NextOptions} from "@/lib/next-auth";
import NextAuth, { AuthOptions, getServerSession } from "next-auth";



  

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
const session = await getServerSession(NextOptions);
if (session?.user.role !== "ADMIN") {
    return NextResponse.redirect("/api/auth/signin");
}

  try {
    const reqBody = await req.json();

    await prisma.projectContent.deleteMany({
      where: { projectId: parseInt(params.id) },
    });

    const projectContent = await prisma.projectContent.createMany({
      data: reqBody.map((content: ProjectContent) => {
        const { id, ...restOfContent } = content; 
        return {
          ...restOfContent, 
          projectId: parseInt(params.id),
        };
      }),
    });

    return NextResponse.json(projectContent);
  } catch (error) {
    console.error("Error in POST API: ", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
