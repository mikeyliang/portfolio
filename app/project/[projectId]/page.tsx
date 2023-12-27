"use client";

import React, { useState, useEffect } from "react";
import { getTypeColor } from "@/components/ProjectCard";
import ProjectContentCard from "@/components/ProjectContentCard";
import {
  IconAbc,
  IconBrandGithubFilled,
  IconChevronDown,
  IconChevronUp,
  IconDeviceFloppy,
  IconEdit,
  IconEyeFilled,
  IconFile,
  IconFilePencil,
  IconHeading,
  IconLink,
  IconPhoto,
  IconPlus,
  IconPointFilled,
  IconRotateClockwise2,
  IconTrashFilled,
} from "@tabler/icons-react";
import { formatProjectDate } from "@/lib/project";
import Tag from "@/components/Tag";
import { useRouter } from "next/navigation";

import RedirectLink from "@/components/RedirectLink";
import { Project, ProjectContent } from "@/types/project";
import { handleUpload } from "@/lib/inputs/upload";
import { useSession } from "next-auth/react";

import dynamic from "next/dynamic";
const LoadingAnimation = dynamic(
  () => import("@/components/LoadingAnimation"),
  { ssr: false }
);

import toast, {Toaster} from "react-hot-toast"

export default function EditProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [projectContent, setProjectContent] = useState<ProjectContent[]>([]);
  const [projectInProgress, setProjectInProgress] = useState(false);

  const [tempProjectContent, setTempProjectContent] = useState<
    ProjectContent[]
  >([]);

  const [editingContentId, setEditingContentId] = useState<number | null>(null);
  const [editingMode, setEditingMode] = useState(false);

  function handleEditClick (contentId: number)  {
    setEditingContentId(contentId);
  };

  const [addContentPopupOrder, setAddContentPopupOrder] = useState<number | null>(
    null
  );

  function handleTempEditContent(
    contentOrder: number,
    updatedContent: ProjectContent
  ) {
    const updatedTempProjectContents = tempProjectContent.map((content) =>
      content.order === contentOrder
        ? { ...content, ...updatedContent }
        : content
    );
    setTempProjectContent(updatedTempProjectContents);
  }

  function tempMoveContent(index: number, direction: "up" | "down") {
    const newTempProjectContent = [...tempProjectContent];
    if (direction === "up" && index > 0) {
      [newTempProjectContent[index], newTempProjectContent[index - 1]] = [
        newTempProjectContent[index - 1],
        newTempProjectContent[index],
      ];
    } else if (
      direction === "down" &&
      index < newTempProjectContent.length - 1
    ) {
      [newTempProjectContent[index], newTempProjectContent[index + 1]] = [
        newTempProjectContent[index + 1],
        newTempProjectContent[index],
      ];
    }

    setTempProjectContent(newTempProjectContent);
  }

  function handleContentChange(contentOrder: number, newContent: ProjectContent) {
    handleTempEditContent(contentOrder, newContent);
  }

   function handleAddNewContent(newContent: ProjectContent) {
     if (addContentPopupOrder !== null) {
       const indexToAddAt = tempProjectContent.findIndex(
         (content) => content.order === addContentPopupOrder
       );

       newContent.order = addContentPopupOrder + 1;

       const updatedContents = [...tempProjectContent];
       updatedContents.splice(indexToAddAt + 1, 0, newContent);

       for (let i = indexToAddAt + 2; i < updatedContents.length; i++) {
         updatedContents[i].order = i;
       }

       setTempProjectContent(updatedContents);
       setAddContentPopupOrder(null); 
     }
   }


  function openAddContentPopup(contentOrder: number) {
    setAddContentPopupOrder(contentOrder); 
  }

  const handleDeleteContent = (contentId: number) => {
    const updatedContents = tempProjectContent.filter(
      (content) => content.id !== contentId
    );
    setTempProjectContent(updatedContents);
  };

  function handleCancelAddContent() {
    const updatedContents = tempProjectContent.filter(
      (content) => content.id !== addContentPopupOrder
    );
    setTempProjectContent(updatedContents);
    setAddContentPopupOrder(null);
  }

  async function handleSubmitChanges() {
    let updatedContents = [...tempProjectContent];

    for (let i = 0; i < updatedContents.length; i++) {
      const content = updatedContents[i];

      if (
        (content.contentType === "FILE" || content.contentType === "IMAGE") &&
        project
      ) {
        try {
          let fileToUpload: File | null = null;
          if (
            typeof content.content === "string" &&
            content.content.startsWith("blob:")
          ) {
            const response = await fetch(content.content);
            const blob = await response.blob();
            fileToUpload = new File([blob], "filename", { type: blob.type });
          }

          if (fileToUpload instanceof File) {
            const fileUrl = await handleUpload(
              fileToUpload,
              `projectcontent/${project.name.replaceAll(" ", "_")}_${
                content.contentType
              }_${content.order}.${fileToUpload.type.split("/")[1]}`
            );

            if (fileUrl) {
              updatedContents[i] = {
                ...content,
                content: fileUrl,
              };
            }
          }
        } catch (error) {
          console.error("Error uploading file: ", error);
        }
      }
    }

    const response = await fetch(
      `/api/project/${params.projectId}/projectContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContents),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update project contents");
    } else {
      toast.success("Project Contents Updated!");
      setProjectContent(updatedContents);
    }
  }

  useEffect(() => {
    setTempProjectContent(projectContent);
  }, [projectContent]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/project/${params.projectId}`);
        const data = await response.json();
        setProject(data);
        setProjectContent(data.projectContent);
        setProjectInProgress(
          !(data.project?.projectEndMonth && data.project?.projectEndYear)
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);


  return (
    <>
      <div>
        <Toaster position="bottom-right" reverseOrder={true} />
      </div>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="flex flex-col w-full gap-6 p-8 bg-white border shadow md:gap-12 lg:gap-16 sm:p-16 rounded-3xl">
          <div className="flex flex-col-reverse items-start justify-between gap-4 lg:flex-row lg:gap-0">
            <div className="flex flex-col items-start justify-center gap-4">
              <div className="flex flex-col-reverse items-start justify-center gap-4 xl:items-center xl:flex-row">
                <div className="flex flex-row flex-wrap items-center justify-start gap-2 md:gap-4">
                  {project?.type.map((t, index) => {
                    const colorInfo = getTypeColor(t.toString());
                    return (
                      <Tag
                        key={t.toString()}
                        bg_color={colorInfo.bg_color}
                        txt_color={colorInfo.txt_color}>
                        <span className="text-xs lg:text-base">
                          {t.toString()}
                        </span>
                      </Tag>
                    );
                  })}
                </div>
                <div className="flex flex-row items-center justify-center gap-4 text-base">
                  <span className="text-sm font-semibold md:text-base">{`ID ${project?.id}`}</span>
                  {projectInProgress ? (
                    <span className="flex flex-row items-center justify-center font-medium text-amber-500 ">
                      <IconPointFilled size={16} />
                      <span className="text-sm md:text-base">In Progress</span>
                    </span>
                  ) : (
                    <span className="flex flex-row items-center justify-center font-medium text-green-500 ">
                      <IconPointFilled size={16} />
                      Completed
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-4 md:items-end md:flex-row">
                <span className="text-3xl font-extrabold md:text-4xl sm:text-3xl xl:text-5xl text-zinc-700">
                  {`${project?.type.includes("Art") || project?.type.includes("Design") ? "🎨" : ""}${
                    project?.type.includes("Mechanical") ? "⚙️" : ""
                  } ${project?.type.includes("Electrical") ? "🔌" : ""} ${
                    project?.type.includes("Software") ? "👨‍💻" : ""
                  }   ${project?.name}`}
                </span>

                {project?.github && (
                  <Tag
                    hover_bg_color="hover:bg-zinc-200"
                    txt_color="text-zinc-600"
                    bg_color="bg-zinc-100">
                    <RedirectLink href={project.github}>
                      <div className="flex flex-row items-center justify-center">
                        <IconBrandGithubFilled className="p-1" />

                        <span className="text-base md:text-lg">
                          Github Repo
                        </span>
                      </div>
                    </RedirectLink>
                  </Tag>
                )}
              </div>
              <span className="mt-2 text-sm italic font-semibold sm:text-2xl text-zinc-500">
                {project?.description}
              </span>
            </div>

            <div className="flex flex-row items-end justify-between gap-4 text-xl font-semibold sm:gap-3 lg:flex-col whitespace-nowrap text-zinc-700">
              <span className="flex-grow font-bold text-zinc-800">{`📅 ${formatProjectDate(
                {
                  projectStartMonth: project?.projectStartMonth,
                  projectStartYear: project?.projectStartYear,
                  projectEndMonth: project?.projectEndMonth,
                  projectEndYear: project?.projectEndYear,
                },
                projectInProgress
              )}`}</span>
              <div className="flex flex-row items-end justify-end gap-1 sm:gap-2 ">
                {session?.user.role == "ADMIN" && !editingMode && (
                  <Tag
                    txt_color="text-yellow-500"
                    bg_color="bg-yellow-100"
                    hover_bg_color="hover:bg-yellow-200">
                    <button
                      onClick={() => setEditingMode(true)}
                      className="flex flex-row items-center justify-center gap-1 text-sm lg:text-lg">
                      <IconFilePencil size={18} />
                      <span>Edit</span>
                    </button>
                  </Tag>
                )}
                {session?.user.role == "ADMIN" && editingMode && (
                  <>
                    <button
                      onClick={handleSubmitChanges}
                      className="flex items-center justify-center p-1 text-blue-500 bg-blue-100 rounded-lg w-7 h-7 sm:w-8 sm:h-8 hover:bg-blue-300">
                      <IconDeviceFloppy stroke={2.5} />
                    </button>
                    <button
                      onClick={() => setTempProjectContent(projectContent)}
                      className="flex items-center justify-center p-1 text-red-500 bg-red-100 rounded-lg w-7 h-7 sm:w-8 sm:h-8 hover:bg-red-300">
                      <IconRotateClockwise2 stroke={2.5} />
                    </button>
                    <button
                      onClick={() => setEditingMode(false)}
                      className="flex items-center justify-center p-1 text-teal-500 bg-teal-100 rounded-lg cursor-pointer w-7 h-7 sm:w-8 sm:h-8 hover:bg-teal-300">
                      <IconEyeFilled stroke={2.5} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {editingMode && session?.user.role == "ADMIN" ? (
            <>
              <div className="flex flex-col items-start justify-center gap-12 md:gap-16">
                {project?.name &&
                  tempProjectContent?.map((content, index) => (
                    <>
                      <div
                        key={`${project.name}_content_${content.order}`}
                        className={`relative flex flex-col items-start ${
                          content.id == editingContentId ||
                          content.contentType == "FILE"
                            ? "w-full"
                            : "min-w-[300px] "
                        } justify-center gap-4 transition-all duration-300 ease-in-out group rounded-xl hover:bg-zinc-50 hover:border`}>
                        <div className="absolute left-0 flex flex-row items-center justify-center gap-2 p-4 transition-all duration-300 ease-in-out opacity-0 -top-10 group-hover:opacity-100 group-hover:top-0">
                          <button
                            onClick={() => {
                              if (content.id == editingContentId) {
                                setEditingContentId(null);
                              } else {
                                handleEditClick(content.id);
                              }
                            }}
                            type="button"
                            className="p-1 mb-2 rounded-lg bg-zinc-200 hover:bg-zinc-300">
                            <IconEdit />
                          </button>
                          <button
                            onClick={() => tempMoveContent(index, "up")}
                            type="button"
                            className="p-1 mb-2 rounded-lg bg-zinc-200 hover:bg-zinc-300">
                            <IconChevronUp />
                          </button>
                          <button
                            onClick={() => tempMoveContent(index, "down")}
                            type="button"
                            className="p-1 mb-2 rounded-lg bg-zinc-200 hover:bg-zinc-300">
                            <IconChevronDown />
                          </button>

                          <button
                            onClick={() => openAddContentPopup(content.order)}
                            type="button"
                            className="p-1 mb-2 rounded-lg bg-zinc-200 hover:bg-zinc-300">
                            <IconPlus />
                          </button>
                          <button
                            onClick={() => handleDeleteContent(content.id)}
                            type="button"
                            className="p-1 mb-2 rounded-lg bg-zinc-200 hover:bg-zinc-300">
                            <IconTrashFilled />
                          </button>
                        </div>
                        <div className="w-full duration-300 ease-in-out transform group-hover:mt-16 group-hover:p-6 indent-0">
                          <ProjectContentCard
                            content={{ ...content }}
                            projectName={project?.name}
                            editMode={editingContentId === content.id}
                            onChange={handleContentChange}
                          />
                        </div>
                      </div>

                      {content.order == addContentPopupOrder && (
                        <AddContentPopup
                          onAddContent={handleAddNewContent}
                          onCancel={handleCancelAddContent}
                          projectName={project.name}
                          newOrder={addContentPopupOrder + 1}
                        />
                      )}
                    </>
                  ))}
              </div>

              <div className="flex flex-row items-end justify-start gap-2 sm:gap-4 ">
                <Tag
                  txt_color="text-blue-500"
                  bg_color="bg-blue-100"
                  hover_bg_color="hover:bg-blue-200">
                  <button
                    onClick={handleSubmitChanges}
                    className="flex flex-row items-center justify-center gap-2 rounded-lg">
                    <IconDeviceFloppy stroke={2.5} />
                    <span>Save</span>
                  </button>
                </Tag>
                <Tag
                  txt_color="text-red-500"
                  bg_color="bg-red-100"
                  hover_bg_color="hover:bg-red-200">
                  <button
                    onClick={() => setTempProjectContent(projectContent)}
                    className="flex flex-row items-center justify-center gap-2 rounded-lg">
                    <IconRotateClockwise2 stroke={2.5} />
                    <span>Reset</span>
                  </button>
                </Tag>
                <Tag
                  txt_color="text-teal-500"
                  bg_color="bg-teal-100"
                  hover_bg_color="hover:bg-teal-200">
                  <button
                    onClick={() => setEditingMode(false)}
                    className="flex flex-row items-center justify-center gap-2 rounded-lg">
                    <IconEyeFilled stroke={2.5} />
                    <span>View Page</span>
                  </button>
                </Tag>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-start justify-center gap-12 md:gap-16">
              {project?.name &&
                projectContent?.map((content, index) => (
                  <ProjectContentCard
                    key={`project-content-${index}`}
                    content={{ ...content }}
                    projectName={project?.name}
                    editMode={false}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

type AddContentPopupProps = {
  projectName: string;
  onAddContent: (newContent: ProjectContent) => void;
  onCancel: () => void;
  newOrder: number;
};

type Content =
  | "TEXT"
  | "LINK"
  | "IMAGE"
  | "FILE"
  | "HEADING";

function AddContentPopup(props: AddContentPopupProps) {
  const [selectedContentType, setSelectedContentType] = useState<Content>("HEADING");
  // default new content props
  const [newContent, setNewContent] = useState<ProjectContent>({
    id: Date.now(), 
    order: 0,
    contentType: selectedContentType,
    content: "",
    projectId: 0, 
  });


  type ContentSelectionButtonProps = {
    content: Content;
    icon: React.ReactNode;
  };

  function ContentSelectionButton({
    content,
    icon,
  }: ContentSelectionButtonProps) {
    return (
      <button
        onClick={() => handleContentTypeChange(content)}
        className={`p-1.5 border rounded-lg shadow ${
          selectedContentType === content ? "bg-gray-200" : ""
        }`}>
        {icon}
      </button>
    );
  }

 function handleContentTypeChange(content: Content) {
   setSelectedContentType(content);
   setNewContent({ ...newContent, contentType: content });
 }


   function handleContentChange(contentOrder: number, newContent: ProjectContent) {
      setNewContent(newContent);
   }
  function handleAddClick() {
    toast.success("Content Added!");
    props.onAddContent(newContent);
  }

  function handleCancelClick() {
    props.onCancel();
  }

  return (
    <div className="flex flex-col items-start justify-center w-full gap-8 p-8 bg-white border shadow-lg rounded-2xl top-20 lg:w-3/4 xl:x-2/3">
      <h3 className="text-lg font-bold ">Add New Content</h3>
      <div className="flex flex-row items-center justify-start gap-2">
        <ContentSelectionButton
          content="HEADING"
          icon={<IconHeading size={20} />}
        />
        <ContentSelectionButton content="TEXT" icon={<IconAbc size={20} />} />
        <ContentSelectionButton content="LINK" icon={<IconLink size={20} />} />
        <ContentSelectionButton
          content="IMAGE"
          icon={<IconPhoto size={20} />}
        />
        <ContentSelectionButton content="FILE" icon={<IconFile size={20} />} />
      </div>

      {selectedContentType && (
        <div className="w-full">
          <ProjectContentCard
            content={{
              id: 0,
              order: props.newOrder,
              contentType: selectedContentType,
              content: newContent.content,
              projectId: 0,
            }}
            onChange={(order, updatedContent) =>
              handleContentChange(order, updatedContent)
            }
            editMode={true}
            projectName={props.projectName}
          />
        </div>
      )}

      <div className="flex flex-row items-center justify-center gap-2">
        <Tag
          bg_color="bg-blue-100"
          txt_color="text-blue-500"
          hover_bg_color="hover:bg-blue-200">
          <button onClick={handleAddClick}>Add</button>
        </Tag>

        <Tag
          bg_color="bg-red-100"
          txt_color="text-red-500"
          hover_bg_color="hover:bg-red-200">
          <button onClick={handleCancelClick}>Cancel</button>
        </Tag>
      </div>
    </div>
  );
}
