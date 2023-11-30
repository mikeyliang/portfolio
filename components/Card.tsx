import React from "react";
import Tag from "./Tag";
import type { Tag as TagType } from "../types/project";
import { IconPointFilled, IconEye } from "@tabler/icons-react";

// Define a function to map ProjectTag to corresponding bg_color and txt_color
export function getTypeColor(tag: string) {
  switch (tag) {
    case "Art":
      return { bg_color: "bg-red-100", txt_color: "text-red-500" };
    case "Design":
      return { bg_color: "bg-blue-100", txt_color: "text-blue-500" };
    case "Software":
      return { bg_color: "bg-green-100", txt_color: "text-green-500" };
    case "Electrical":
      return { bg_color: "bg-orange-100", txt_color: "text-orange-500" };
    case "Mechanical":
      return { bg_color: "bg-purple-100", txt_color: "text-purple-500" };
    default:
      return { bg_color: "bg-gray-100", txt_color: "text-gray-00" };
  }
}

type CardProps<T extends { toString(): string }> = {
  id: number;
  date: string | null;
  inProgress?: boolean;
  types: T[];
  children: React.ReactNode;
};

export default function Card<T extends { toString(): string }>(
  props: CardProps<T>
) {
  return (
    <div
      key={props.id}
      className="relative flex flex-col w-full gap-24 bg-white border max-w-fit rounded-3xl">
      <div className="absolute z-10 flex flex-col items-start justify-start gap-2 text-xs font-medium top-4 left-6 text-zinc-500">
        <div className="flex flex-row gap-2">
          {`ID ${props.id}`}
          {props.inProgress ? (
            <span className="flex flex-row items-center justify-center text-xs font-medium text-amber-500 ">
              <IconPointFilled size={16} />
              In Progress
            </span>
          ) : (
            <span className="flex flex-row items-center justify-center text-xs font-medium text-green-500 ">
              <IconPointFilled size={16} />
              Completed
            </span>
          )}
        </div>
        {/* {props.link && (
          <div className="flex flex-row items-center justify-center gap-1 px-2 py-1 text-xs bg-blue-200 rounded-full hover:bg-blue-300 text-zinc-700">
            <span>Preview</span>
            <IconEye size={12} />
          </div>
        )} */}
      </div>

      <span className="absolute z-10 flex flex-col items-end justify-start gap-2 text-xs font-medium top-4 right-6 text-zinc-500">
        {props.date}
      </span>

      {props.types && props.types.length > 0 && (
        <div className="absolute z-10 flex flex-row flex-wrap items-center justify-end gap-2 bottom-4 right-6">
          {props.types.map((type, index) => {
            const colorInfo = getTypeColor(type.toString());
            return (
              <Tag
                key={type.toString()}
                bg_color={colorInfo.bg_color}
                txt_color={colorInfo.txt_color}>
                <span className="text-xs">{type.toString()}</span>
              </Tag>
            );
          })}
        </div>
      )}
      {props.children}
    </div>
  );
}
