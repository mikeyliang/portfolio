import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

import { Tube, TubeColor } from "../../../../types/tubes";

export async function GET(req: Request) {
  const data = await prisma.tubeLevel.findMany({
    include: {
      tube: true,
      tubeColors: true,
      _count: {
        select: { tubeMoves: true },
      }
    }
  })
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

    for (const [tubeIdx, tube] of data.tubes.entries()) {
      for (const colorIdx of tube) {
        const tubePromise = prisma.tube.findFirst({
          where: { tubeIndex: tubeIdx, level: tubeLevel.level },
        });

        const colorPromise = prisma.tubeColor.findFirst({
          where: { colorIndex: parseInt(colorIdx), level: tubeLevel.level },
        });

        tubePromise.then((t) =>
          colorPromise.then((c) => {
            if (t && c) {
              return prisma.tubeColorRelation.create({
                data: {
                  tubeId: t.id,
                  tubeColorId: c.id,
                },
              });
            }
          })
        );
      }

      for (const [moveIdx, move] of data.moves.entries()) {
        const [fromTubeIndex, toTubeIndex] = move;

        prisma.tube
          .findFirst({
            where: { tubeIndex: fromTubeIndex, level: tubeLevel.level },
          })
          .then((fromTube) =>
            prisma.tube
              .findFirst({
                where: { tubeIndex: toTubeIndex, level: tubeLevel.level },
              })
              .then((toTube) => {
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
              })
          );
      }
    }

    return NextResponse.json({
      message: "Success in creating tube level!",
      data: { tubeLevel, tubeColors, tubes },
    });
  } catch (error) {
    await prisma.tubeLevel.delete({ where: { level: data.level } });

    return NextResponse.json({
      message: "Failed to create tube level!",
      data: null,
    });
  }
}
