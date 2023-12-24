import Image from "next/image";
import { IconFileTypePdf, IconClipboardText } from "@tabler/icons-react";
import PDF from "./PDF"; 
import RedirectLink from "./RedirectLink"; 
import Tag from "./Tag";
import TextInput from "./inputs/TextInput";

type ProjectContentProps = {
  content: {
    contentType: string;
    content: string;
    order: number;
  };
  projectName: string;
  editMode?: boolean;
};

export default function ProjectContentCard(props: ProjectContentProps) {

  switch (props.content.contentType) {
    case "TEXT":
      return (
        <span
          key={`${props.projectName}_content_${props.content.order}`}
          className="w-full text-sm font-medium md:text-lg text-zinc-700 ">
          {props.content.content}
        </span>
      );

    case "LINK":
      return (
        <>
          {!props.editMode ? (
            <div
              className="flex flex-row items-center justify-start ml-4 md:ml-12 sm:w-3/4"
              key={`${props.projectName}_content_${props.content.order}`}>
              <Tag
                bg_color="bg-blue-100"
                txt_color="text-blue-600"
                hover_bg_color="hover:bg-blue-300">
                <RedirectLink href={props.content.content}>
                  <span className="text-sm lg:text-lg">PROJECT LINK DEMO</span>
                </RedirectLink>
              </Tag>
            </div>
          ) : (
            <div className="w-full">
              <TextInput
                label={"Project Link"}
                placeholder="Enter a project link URL"
                value={props.content.content}
              />
            </div>
          )}
        </>
      );

    case "IMAGE":
      return (
        <div
          key={`${props.projectName}_content_${props.content.order}`}
          className="flex flex-row items-center justify-start ml-4 md:ml-16 sm:w-3/4">
          <Image
            alt={`${props.projectName}`}
            src={props.content.content}
            width={400}
            height={400}
            className="h-auto rounded-xl"
          />
        </div>
      );

    case "HEADING":
      return (
        <span
          key={`${props.projectName}_content_${props.content.order}`}
          className="w-3/4 text-lg font-bold underline md:text-2xl text-zinc-800">
          {props.content.content}
        </span>
      );

    case "FILE":
      return (
        <div
          key={`${props.projectName}_content_${props.content.order}`}
          className="w-full md:w-3/4 lg:w-1/2">
          <PDF src={props.content.content} />
        </div>
      );

    default:
      return null;
  }
};