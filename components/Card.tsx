import React from "react";
import Tag from "./Tag";
import type { Tag as TagType } from "../types/project";

// Define a function to map ProjectTag to corresponding bg_color and txt_color
export function getTypeColor(tag: string) {
  switch (tag) {
    case "Art":
      return { bg_color: "bg-red-100", txt_color: "text-red-400" };
    case "Design":
      return { bg_color: "bg-blue-100", txt_color: "text-blue-400" };
    case "Software":
      return { bg_color: "bg-green-100", txt_color: "text-green-400" };
    case "Mechanical":
      return { bg_color: "bg-orange-100", txt_color: "text-orange-400" };
    case "Electrical":
      return { bg_color: "bg-purple-100", txt_color: "text-purple-400" };
    default:
      return { bg_color: "bg-gray-100", txt_color: "text-gray-00" };
  }
}

type CardProps<T extends { toString(): string }> = {
  id: number;
  date: string | null;
  types: T[];
  children: React.ReactNode;
};

export default function Card<T extends { toString(): string }>(
  props: CardProps<T>
) {
  return (
    <div className="relative flex flex-col w-full gap-24 bg-white border max-w-fit rounded-3xl">
      <span className="absolute z-10 text-xs font-medium top-4 left-6 text-zinc-500">
        {`ID ${props.id}`}
      </span>
      <span className="absolute z-10 text-xs font-medium top-4 right-6 text-zinc-500">
        {props.date}
      </span>
      {props.types && props.types.length > 0 && (
        <div className="absolute z-10 flex flex-row items-center justify-center gap-2 bottom-4 right-6">
          {props.types.map((type, index) => {
            const colorInfo = getTypeColor(type.toString());
            return (
              <Tag
                key={index}
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
