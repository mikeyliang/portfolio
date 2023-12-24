import { Prisma, Project as PrismaProjectType, ProjectContent as PrismaProjectContentType } from "@prisma/client";

import { Group, Category, Attribute } from "./enums.d";

// project
export type Project = PrismaProjectType;
export type ProjectContent = PrismaProjectContentType


// TODO: fix tag and projecttypes for Tag component. using <T>

export type Tag = "Art" | "Design" | "Software" | "Mechanical" | "Electrical";

export type ProjectCategory = "image" | "video" | "audio" | "text";

export type ProjectType =
   "All"
  | "Art" // Color: bg-yellow-400 (Yellow)
  | "Design" // Color: bg-blue-400 (Blue)
  | "Software" // Color: bg-green-400 (Green)
  | "Mechanical" // Color: bg-red-500 (Red)
  | "Electrical"; // Color: bg-orange-400 (Orange)

export type ProjectFormValues = {
   projectName: string;
   projectDescription: string;
   projectTypes: ProjectType[];
   projectStart: string | Date | null;
   projectEnd: string | Date | null;
   projectFile: File | string | null;
   projectGithub: string | null;
};
