"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { TubeLevel } from "../../../types/tubes";

type TubeLevelCardProps = { tubeLevel: TubeLevel };

export default function TubeLevelCard(props: TubeLevelCardProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/project/tubesort/${props.tubeLevel.level}`);
      }}
      className="flex flex-col items-center justify-center w-auto gap-4 p-6 bg-white border cursor-pointer border-zinc-200 md:hover:shadow-md rounded-2xl">
      <div className="flex flex-row items-start justify-between w-full gap-4 px-2">
        <span className="h-full p-2 text-2xl font-extrabold rounded-xl bg-zinc-200">
          {`${props.tubeLevel.level}`}
        </span>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="flex flex-row flex-wrap items-center justify-start h-full gap-2 py-2">
            {props.tubeLevel.tubeColors.map((tubeColor) => (
              <div
                className="w-4 h-4 rounded-lg"
                key={`levelcolor-${tubeColor.colorIndex}`}
                style={{
                  backgroundColor: `rgb(${tubeColor.red}, ${tubeColor.green}, ${tubeColor.blue})`,
                }}></div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center justify-start w-full gap-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-md sm:text-sm bg-amber-100">
            Moves: {props.tubeLevel._count.tubeMoves}
          </span>

          <span className="px-2 py-1 text-xs font-semibold bg-blue-100 rounded-md sm:text-sm">
            Tubes: {props.tubeLevel.tubes && props.tubeLevel.tubes.length}
          </span>
        </div>
        <span className="px-2 py-1 text-xs font-bold rounded-md sm:text-sm bg-lime-200">
          {props.tubeLevel.type}
        </span>
      </div>
    </div>
  );
}
