import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const data = await prisma.project.findMany();
  return NextResponse.json({ data });
}
