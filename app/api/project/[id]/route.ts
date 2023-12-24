import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
 
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
    include: {
        projectContent: true
    }
  });
  // Send response
  return NextResponse.json(project);
}


