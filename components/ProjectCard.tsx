import React from "react";
import Tag from "./Tag";
import type { Tag as TagType } from "../types/project";
import {
  IconPointFilled,
  IconEyeEdit,
  IconEditCircle,
  IconTrashXFilled
} from "@tabler/icons-react";



import { formatProjectDate } from "../lib/project";

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

type ProjectCardProps<T extends { toString(): string }> = {
  id: number;
  projectStartYear?: number | null;
  projectEndYear?: number | null;
  projectStartMonth?: number | null;
  projectEndMonth?: number | null;
  types: T[];
  editable: boolean;
  setEditingProjectID: (id: number) => void;
  children: React.ReactNode;
};


export default function ProjectCard<T extends { toString(): string }>(
  props: ProjectCardProps<T>
) {

  const inProgress = !(props.projectEndYear && props.projectEndMonth);

    
  return (
    <div
      
      className="relative flex flex-col items-center justify-center w-full h-full max-w-full max-h-full gap-24 bg-white border rounded-3xl">
      <div className="absolute z-10 flex flex-col items-start justify-start gap-2 text-xs font-medium top-4 left-4 text-zinc-500">
        <Tag bg_color="bg-white shadow">
          <div className="flex flex-row gap-2">
            {`ID ${props.id}`}
            {inProgress ? (
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
        </Tag>
      </div>

      <span className="absolute z-10 flex flex-col items-end justify-start gap-4 text-xs font-medium top-4 right-4 text-zinc-500">
        <Tag bg_color="bg-white shadow">
          {formatProjectDate(
            {
              projectStartMonth: props.projectStartMonth,
              projectStartYear: props.projectStartYear,
              projectEndMonth: props.projectEndMonth,
              projectEndYear: props.projectEndYear,
            },
            inProgress
          )}
        </Tag>
        {props.editable &&
        <div className="flex flex-col items-end justify-center gap-2">
          <Tag
            bg_color="bg-yellow-200"
            hover_bg_color="hover:bg-yellow-300"
            txt_color="text-yellow-700">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation(); 
                
                props.setEditingProjectID(-1);
                setTimeout(() => props.setEditingProjectID(props.id), 0);
              }}
              className="flex items-center justify-center w-5 h-6 p-0.5">
              <IconEyeEdit stroke={2.5} />
            </button>
          </Tag>
          {/* TODO: add in delete for project (confirmation screen) TODO: <Tag
            bg_color="bg-red-200"
            hover_bg_color="hover:bg-red-300"
            txt_color="text-red-700">
            <button
              type="button"
              className="flex items-center justify-center w-5 h-6 p-0.5">
              <IconTrashXFilled stroke={2.5} />
            </button>
          </Tag> */}
        
        </div>
}
      </span>

      {props.types && props.types.length > 0 && (
        <div className="absolute z-10 flex flex-row flex-wrap items-center justify-end gap-2 bottom-4 right-4">
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
