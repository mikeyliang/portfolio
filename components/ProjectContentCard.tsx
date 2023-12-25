import Image from "next/image";
import {
  IconFileTypePdf,
  IconClipboardText,
  IconLink,
  IconTextSize,
  IconPhoto,
  IconHeading,
  IconFile,
} from "@tabler/icons-react";
import PDF from "./PDF";
import RedirectLink from "./RedirectLink";
import Tag from "./Tag";
import TextInput from "./inputs/TextInput";
import TextArea from "./inputs/TextArea";
import { ProjectContent } from "@/types/project";
import FileInput from "@/components/inputs/FileInput";

type ProjectContentProps = {
  content: ProjectContent;
  projectName: string;
  editMode?: boolean;
  onChange?: (id: number, value: ProjectContent) => void;
};

export default function ProjectContentCard(props: ProjectContentProps) {
  function handleTextChange(
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const updatedContent: ProjectContent = {
      ...props.content,
      content: e.target.value,
    };
    props.onChange?.(props.content.id, updatedContent);
  }

  function handleFileChange(eventOrFile: File | null) {
    let updatedContentValue;

    if (eventOrFile instanceof File) {
      updatedContentValue = eventOrFile;
      const fileURL = URL.createObjectURL(updatedContentValue);
      if (updatedContentValue) {
        const updatedContent: ProjectContent = {
          ...props.content,
          content: fileURL,
        };

        console.log(updatedContent);
        props.onChange?.(props.content.id, updatedContent);
      }
    }
  }

  switch (props.content.contentType) {
    case "TEXT":
      return (
        <>
          {props.editMode ? (
      
              <TextArea
                label={"Project Text"}
                placeholder="Enter text"
                value={props.content.content}
                leftSection={<IconTextSize />}
                onChange={(e) => {
                  handleTextChange(e);
                }}
              />
          ) : (
            <span
              className="w-full text-sm font-medium md:text-lg text-zinc-700 ">
              {props.content.content}
            </span>
          )}
        </>
      );

    case "LINK":
      return (
        <>
          {props.editMode ? (
        
              <TextInput
                label={"Project Link"}
                placeholder="Enter a project link URL"
                value={props.content.content}
                leftSection={<IconLink />}
              />
          ) : (
            <div
            
              className="flex flex-row items-center justify-start ml-4 md:ml-12 sm:w-3/4">
              <Tag
                bg_color="bg-blue-100"
                txt_color="text-blue-600"
                hover_bg_color="hover:bg-blue-300">
                <RedirectLink href={props.content.content}>
                  <button className="text-sm cursor-pointer lg:text-lg">PROJECT LINK DEMO</button>
                </RedirectLink>
              </Tag>
            </div>
          )}
        </>
      );

    case "IMAGE":
      return (
        <>
          {props.editMode ? (
            <FileInput
              label={"Project Image"}
              placeholder="Enter a project image URL"
              file={props.content.content}
              fileType="image/*"
              onFileChange={handleFileChange}
            />
          ) : (
            <div
              className="flex flex-col items-start justify-start ml-4 md:ml-8 sm:w-3/4">
              <Image
                alt={`${props.projectName}`}
                src={props.content.content}
                width={400}
                height={400}
                className="h-auto rounded-xl"
              />
            </div>
          )}
        </>
      );

    case "HEADING":
      return (
        <>
          {props.editMode ? (
          
              <TextInput
                label={"Project Heading"}
                placeholder="Enter a project heading"
                value={props.content.content}
                leftSection={<IconHeading />}
              />
          ) : (
            <span
              className="w-3/4 text-lg font-bold underline md:text-2xl text-zinc-800">
              {props.content.content}
            </span>
          )}
        </>
      );

    case "FILE":
      return (
        <>
          {props.editMode ? (
           
              <FileInput
                label={"Project File"}
                placeholder="Upload a project file"
                file={props.content.content}
                fileType="application/*"
                leftSection={<IconFile />}
                onFileChange={handleFileChange}
              />
          ) : (
            <div
              className="w-full md:w-3/4 lg:w-1/2">
              <PDF src={props.content.content} />
            </div>
          )}
        </>
      );

    default:
      return null;
  }
}
