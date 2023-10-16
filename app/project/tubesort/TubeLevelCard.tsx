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
      className="flex flex-col items-center justify-center gap-2 p-4 max-w-[300px] min-w-[280px] 2xs:min-w-[290px] sm:min-w-[300px] border border-zinc-200  bg-white cursor-pointer md:hover:shadow-md rounded-2xl">
      <div className="flex flex-row items-start justify-between w-full gap-4 p-2">
        <span className="h-full p-2 text-2xl font-extrabold rounded-xl bg-zinc-200">
          {`${props.tubeLevel.level}`}
        </span>
        <div className="flex flex-col items-center justify-center gap-4 ">
          <div className="flex flex-row flex-wrap gap-2">
            {props.tubeLevel.tubeColors.map((tubeColor) => (
              <div
                className="w-3 h-3 rounded-md"
                key={`${tubeColor.colorIndex}`}
                style={{
                  backgroundColor: `rgb(${tubeColor.red}, ${tubeColor.green}, ${tubeColor.blue})`,
                }}></div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-start w-full gap-2">
            <span className="px-2 py-1 text-xs font-semibold rounded-md bg-amber-100">
              Moves: {props.tubeLevel._count.tubeMoves}
            </span>

            <span className="px-2 py-1 text-xs font-semibold bg-blue-100 rounded-md">
              Tubes: {props.tubeLevel.tubes && props.tubeLevel.tubes.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
