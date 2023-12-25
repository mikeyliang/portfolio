import { getTypeColor } from "@/components/ProjectCard";
import prisma from "@/lib/prisma";
import Tag from "@/components/Tag";
import { IconBrandGithubFilled, IconFilePencil, IconPointFilled } from "@tabler/icons-react";

import { formatProjectDate } from "@/lib/project";

import dynamic from "next/dynamic";
import ProjectContentCard from "@/components/ProjectContentCard";

const RedirectLink = dynamic(() => import("@/components/RedirectLink"), { ssr: false });

async function getProjectData(projectId: number) {
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

  const projectInProgress = !(
    project?.projectEndMonth && project?.projectEndYear
  );

  return { project, projectContent, projectInProgress };
}

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { project, projectContent, projectInProgress } = await getProjectData(
    parseInt(params.projectId)
  );

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

          <RedirectLink href={`/project/edit/${project?.id}`}>
            <Tag
              txt_color="text-yellow-500"
              bg_color="bg-yellow-100"
              hover_bg_color="hover:bg-yellow-200">
              <div className="flex flex-row items-center justify-center gap-1 text-sm">
                <IconFilePencil size={18} />
                <span>Edit</span>
              </div>
            </Tag>
          </RedirectLink>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center gap-12 md:gap-16">
        {project?.name &&
          projectContent?.map((content, index) => (
            <ProjectContentCard
              key={`project-content-${index}`}
              content={{ ...content }}
              projectName={project?.name}
            />
          ))}
      </div>
    </div>
  );
}

