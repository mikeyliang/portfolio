import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextOptions } from "@/lib/next-auth"
import NextAuth, { AuthOptions, getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
 
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
  });
  // Send response
  return NextResponse.json(project);
}


