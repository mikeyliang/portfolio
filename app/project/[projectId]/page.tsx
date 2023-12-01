import { getTypeColor } from "@/components/Card";
import prisma from "../../../lib/prisma";
import Tag from "@/components/Tag";
import Image from "next/image";
import { IconBrandGithubFilled, IconPointFilled } from "@tabler/icons-react";
import PDF from "@/components/PDF";

async function getProjectData(projectId: number) {
  console.log(projectId);
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  const projectContent = await prisma.projectContent.findMany({
    where: {
      projectId: projectId,
    },
    orderBy: {
      order: "asc",
    },
  });

  console.log(projectContent);
  console.log(project);

  return { project, projectContent };
}

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { project, projectContent } = await getProjectData(
    parseInt(params.projectId)
  );
  return (
    <div className="flex flex-col w-full gap-12 p-8 bg-white border lg:gap-16 sm:p-16 rounded-3xl">
      <div className="flex flex-col-reverse items-start justify-between gap-4 lg:flex-row lg:gap-0">
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="flex flex-row items-center justify-start gap-4">
              {project?.type.map((t, index) => {
                const colorInfo = getTypeColor(t.toString());
                return (
                  <Tag
                    key={t.toString()}
                    bg_color={colorInfo.bg_color}
                    txt_color={colorInfo.txt_color}>
                    <span className="text-base">{t.toString()}</span>
                  </Tag>
                );
              })}
            </div>
            <div className="flex flex-row items-center justify-center gap-4 text-base">
              <span className="font-semibold">{`ID ${project?.id}`}</span>
              {project?.inProgress ? (
                <span className="flex flex-row items-center justify-center font-medium text-amber-500 ">
                  <IconPointFilled size={16} />
                  In Progress
                </span>
              ) : (
                <span className="flex flex-row items-center justify-center font-medium text-green-500 ">
                  <IconPointFilled size={16} />
                  Completed
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row items-end justify-center gap-4">
            <span className="text-4xl font-extrabold sm:text-5xl text-zinc-700">
              {`${project?.type.includes("Art") ? "🎨" : ""}${
                project?.type.includes("Mechanical") ? "⚙️" : ""
              } ${project?.type.includes("Electrical") ? "🔌" : ""} ${
                project?.type.includes("Software") ? "👨‍💻" : ""
              }   ${project?.name}`}
            </span>

            {project?.github && (
              <a href={project?.github ?? ""} target="_blank">
                <Tag
                  hover_bg_color="hover:bg-zinc-200"
                  txt_color="text-zinc-600"
                  bg_color="bg-zinc-100">
                  <div className="flex flex-row items-center justify-center">
                    <IconBrandGithubFilled className="p-1" />

                    <span>Github Repo</span>
                  </div>
                </Tag>
              </a>
            )}
          </div>
          <span className="mt-2 text-sm italic font-semibold sm:text-2xl text-zinc-500">
            {project?.description}
          </span>
        </div>

        <div className="flex flex-row items-center justify-between gap-1 text-xl font-semibold whitespace-nowrap sm:gap-3 lg:flex-col xl:flex-row text-zinc-700">
          <span className="flex-grow font-bold text-zinc-800">{`📅 ${project?.projectTime}`}</span>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center gap-12 md:gap-16">
        {projectContent?.map((content, index) => {
          console.log(content.contentType);
          if (content.contentType == "TEXT") {
            return (
              <span
                key={`${project?.name}_content_${content.order}`}
                className="ml-4 text-xl font-medium lg:ml-8 sm:w-3/4 text-zinc-700">
                {content.content}
              </span>
            );
          } else if (content.contentType == "LINK") {
            return (
              <div
                key={`${project?.name}_content_${content.order}`}
                className="flex flex-row items-center justify-start ml-12 sm:w-3/4">
                <a href={content.content} target="_blank">
                  <Tag
                    bg_color="bg-blue-100"
                    txt_color="text-blue-600"
                    hover_bg_color="hover:bg-blue-300">
                    <span className="text-lg">PROJECT LINK DEMO</span>
                  </Tag>
                </a>
              </div>
            );
          } else if (content.contentType == "IMAGE") {
            return (
              <div
                key={`${project?.name}_content_${content.order}`}
                className="flex flex-row items-center justify-start ml-16 sm:w-3/4">
                <Image
                  alt={`${project?.name}`}
                  src={content.content}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            );
          } else if (content.contentType == "HEADING") {
            return (
              <span
                key={`${project?.name}_content_${content.order}`}
                className="text-2xl font-bold underline text-zinc-800">
                {content.content}
              </span>
            );
          } else if (content.contentType == "FILE") {
            return (
              <div
                key={`${project?.name}_content_${content.order}`}
                className="w-full md:w-3/4 lg:w-1/2">
                <PDF src={content.content} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
