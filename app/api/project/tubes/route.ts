import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

import { Tube, TubeColor } from "../../../../types/tubes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const take = parseInt(searchParams.get("take") || "100");
  const skip = parseInt(searchParams.get("skip") || "0");
  const cursorString = searchParams.get("cursor");
  const cursor = cursorString ? parseInt(cursorString) : undefined;

  const data = await prisma.tubeLevel.findMany({
    include: {
      tubes: true,
      tubeColors: true,
      _count: {
        select: { tubeMoves: true },
      },
    },
    take: take,
    skip: skip,
    cursor: cursor ? { level: cursor } : undefined,
  });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const data = await req.json();

  await prisma.tubeLevel.deleteMany();

  try {
    //creating tube level
    const tubeLevel = await prisma.tubeLevel.create({
      data: {
        level: data.level,
      },
    });
    // transactional queries for colors and tubes
    const [tubeColors, tubes] = await prisma.$transaction([
      // try to first create tube colors
      prisma.tubeColor.createMany({
        data: data.colors.map((color: TubeColor, idx: number) => ({
          colorIndex: idx,
          red: color.red,
          green: color.green,
          blue: color.blue,
          level: tubeLevel.level,
        })),
      }),
      // try to store all tubes
      prisma.tube.createMany({
        data: data.tubes.map((tube: Tube, idx: number) => ({
          tubeIndex: idx,
          level: tubeLevel.level,
        })),
      }),
    ]);
    const tubeColorRelationPromises = [];
    const tubeMovesPromises = [];

    // First Loop Optimization
    for (const [tubeIdx, tube] of data.tubes.entries()) {
      for (const [colorIdx, color] of tube.entries()) {
        tubeColorRelationPromises.push(
          (async () => {
            const t = await prisma.tube.findFirst({
              where: { tubeIndex: tubeIdx, level: tubeLevel.level },
            });
            const c = await prisma.tubeColor.findFirst({
              where: { colorIndex: parseInt(color), level: tubeLevel.level },
            });
            if (c && t) {
              return prisma.tubeColorRelation.create({
                data: {
                  tubeId: t.id,
                  tubeColorId: c.id,
                  level: tubeLevel.level,
                  position: parseInt(colorIdx),
                },
              });
            }
            return null;
          })()
        );
      }
    }

    // Second Loop Optimization
    for (const [moveIdx, move] of data.moves.entries()) {
      const [fromTubeIndex, toTubeIndex] = move;
      tubeMovesPromises.push(
        (async () => {
          const fromTube = await prisma.tube.findFirst({
            where: { tubeIndex: fromTubeIndex, level: tubeLevel.level },
          });
          const toTube = await prisma.tube.findFirst({
            where: { tubeIndex: toTubeIndex, level: tubeLevel.level },
          });
          if (fromTube && toTube) {
            return prisma.tubeMoves.create({
              data: {
                from: fromTube.id,
                to: toTube.id,
                level: tubeLevel.level,
                step: moveIdx,
              },
            });
          }
          return null;
        })()
      );
    }

    await Promise.all(tubeColorRelationPromises);
    await Promise.all(tubeMovesPromises);

    return NextResponse.json({
      message: "Success in creating tube level!",
      data: { tubeLevel, tubeColors, tubes },
    });
  } catch (error) {
    console.log(error);
    await prisma.tubeLevel.delete({ where: { level: data.level } });

    return NextResponse.json({
      message: "Failed to create tube level!",
      data: null,
    });
  }
}
