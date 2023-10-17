import prisma from "../../../../lib/prisma";

import {
  Tube,
  TubeColorRelation,
  TubeLevel,
  TubeMove,
} from "../../../../types/tubes";

import TubeNavigator from "./TubeNavigator";

async function getTubeLevel(level: string) {
  try {
    const tubeLevel = await prisma.tubeLevel.findUnique({
      where: { level: parseInt(level) },
      include: {
        tubes: true,
        tubeColors: true,
        tubeMoves: {
          orderBy: {
            step: "asc",
          },
          include: {
            fromTube: true,
            toTube: true,
          },
        },
        tubeColorRelation: {
          orderBy: {
            position: "asc",
          },
          include: {
            tubeColor: true,
            tube: true,
          },
        },
      },
    });

    return tubeLevel;
  } catch (err) {
    return null;
  }
}

function calculateTubeLayout(
  relations: TubeColorRelation[] | null,
  numTubes: number
): number[][] | null {
  if (relations) {
    const layout: number[][] = Array.from({ length: numTubes }, () => []);

    relations.forEach((relation) => {
      if (layout[relation.tube.tubeIndex].length <= relation.position) {
        layout[relation.tube.tubeIndex].push(relation.tubeColor.colorIndex);
      } else {
        layout[relation.tube.tubeIndex][relation.position] =
          relation.tubeColor.colorIndex;
      }
    });

    return layout;
  }
  return null;
}

export default async function Page({
  params = { level: "0" },
}: {
  params: { level: string };
}) {
  const tubeLevel = await getTubeLevel(params.level);

  const layout = calculateTubeLayout(
    tubeLevel?.tubeColorRelation || null,
    tubeLevel?.tubes.length || 0
  );

  return (
    <div className="flex flex-col gap-16 p-8 bg-white md:p-12 rounded-2xl md:border md:border-zinc-200">
      <div className="flex flex-row items-end justify-start gap-4">
        <span className="px-4 py-2 text-4xl font-extrabold rounded-2xl bg-zinc-200 text-zinc-800">
          {tubeLevel?.level}
        </span>
        <span className="px-2 py-1 text-sm font-bold rounded-md bg-lime-200">
          {tubeLevel?.type}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-start gap-4">
          <span className="font-bold "> Level Statistics: </span>
          <span className="px-2 py-1 text-sm font-semibold rounded-md bg-amber-100">
            {tubeLevel?.tubeMoves && tubeLevel?.tubeMoves.length} Moves
          </span>

          <span className="px-2 py-1 text-sm font-semibold bg-blue-100 rounded-md">
            {tubeLevel?.tubes && tubeLevel?.tubes.length} Tubes
          </span>
        </div>

        <div className="flex flex-row items-center justify-start gap-4">
          <span className="px-2 py-1 text-sm font-semibold bg-red-100 rounded-md">
            {tubeLevel?.tubeColors && tubeLevel?.tubeColors.length} Colors:
          </span>

          <div className="flex flex-row flex-wrap items-center justify-start h-full gap-2 py-2">
            {tubeLevel?.tubeColors.map((tubeColor) => (
              <div
                className="w-4 h-4 rounded-lg"
                key={`color-${tubeColor.colorIndex}`}
                style={{
                  backgroundColor: `rgb(${tubeColor.red}, ${tubeColor.green}, ${tubeColor.blue})`,
                }}></div>
            ))}
          </div>
        </div>
      </div>

      {layout && tubeLevel && (
        <TubeNavigator
          tubeMoves={tubeLevel.tubeMoves}
          layout={layout}
          allColors={tubeLevel.tubeColors}
        />
      )}
    </div>
  );
}
