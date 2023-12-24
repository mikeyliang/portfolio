"use client";

import React, { useState, useEffect } from "react";
import { getTypeColor } from "@/components/ProjectCard";
import ProjectContentCard from "@/components/ProjectContentCard";
import {
  IconBrandGithubFilled,
  IconChevronDown,
  IconChevronUp,
  IconDeviceFloppy,
  IconEdit,
  IconEyeFilled,
  IconPointFilled,
  IconRotateClockwise2,
} from "@tabler/icons-react";
import { formatProjectDate } from "@/lib/project";
import Tag from "@/components/Tag";
import { useRouter } from "next/navigation";

import RedirectLink from "@/components/RedirectLink";
import { Project, ProjectContent } from "@/types/project";

export default function EditProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [projectContent, setProjectContent] = useState<ProjectContent[]>([]);
  const [projectInProgress, setProjectInProgress] = useState(false);

  const [tempProjectContent, setTempProjectContent] = useState<
    ProjectContent[]
  >([]);

  const [editingContentId, setEditingContentId] = useState<number | null>(null);

  const handleEditClick = (contentId: number) => {
    setEditingContentId(contentId);
  };

  useEffect(() => {
    setTempProjectContent(projectContent);
  }, [projectContent]);

  function handleTempEditContent(
    contentId: number,
    updatedContent: ProjectContent
  ) {
    const updatedTempProjectContents = tempProjectContent.map((content) =>
      content.id === contentId ? { ...content, ...updatedContent } : content
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

  async function handleSubmitChanges() {
    setProjectContent(tempProjectContent);

    for (const content of tempProjectContent) {
      await fetch(`/api/project/content/${content.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
    }
  }

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`/api/project/${params.projectId}`);
        const data = await response.json();
        setProject(data);
        setProjectContent(data.projectContent);
        setProjectInProgress(
          !(data.project?.projectEndMonth && data.project?.projectEndYear)
        );
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, []);

  return (
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
                    <span className="text-xs lg:text-base">{t.toString()}</span>
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
              {`${project?.type.includes("Art") ? "🎨" : ""}${
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

                    <span className="text-base md:text-lg">Github Repo</span>
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
            <RedirectLink href={`/project/${project?.id}`}>
              <div className="flex items-center justify-center p-1 text-teal-500 bg-teal-100 rounded-lg w-7 h-7 sm:w-8 sm:h-8 hover:bg-teal-300">
                <IconEyeFilled stroke={2.5} />
              </div>
            </RedirectLink>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center gap-12 md:gap-16">
        {project?.name &&
          tempProjectContent?.map((content, index) => (
            <div className="relative flex flex-col items-start min-w-[300px] justify-center gap-4 transition-all duration-300 ease-in-out group rounded-xl hover:bg-zinc-50 hover:border">
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
              </div>
              <div className="duration-300 ease-in-out transform group-hover:mt-16 group-hover:p-6 indent-0">
                <ProjectContentCard
                  content={{
                    content: content.content,
                    contentType: content.contentType,
                    order: content.order,
                  }}
                  projectName={project?.name}
                  editMode={editingContentId === content.id}
                />
              </div>
            </div>
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
          <RedirectLink href={`/project/${project?.id}`}>
            <div className="flex flex-row items-center justify-center gap-2 rounded-lg">
              <IconEyeFilled stroke={2.5} />
              <span>View Page</span>
            </div>
          </RedirectLink>
        </Tag>
      </div>
    </div>
  );
}
