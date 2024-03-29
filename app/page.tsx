"use client";
import {
  IconPointFilled,
  IconBrandLinkedin,
  IconBrandGithubFilled,
  IconBrandInstagram,
  IconCircleFilled,
  IconCircleCheckFilled,
  IconLayoutGridAdd,
  IconCircleXFilled,
} from "@tabler/icons-react";

import Image from "next/image";

import React, { useState, useEffect } from "react";

import Tag from "../components/Tag";
import ProjectCard from "../components/ProjectCard";
import Clock from "../components/Clock";

import { Project, ProjectFormValues, ProjectType } from "../types/project";

import { useSession } from "next-auth/react";

import dynamic from "next/dynamic";
import { Toaster, toast } from "react-hot-toast";

const ProjectForm = dynamic(
  () => import("@/components/ProjectForm"),
  { ssr: false } 
);

const LoadingAnimation = dynamic(
  () => import("@/components/LoadingAnimation"),
  { ssr: false }
);

const typeOptions = [
  "All",
  "Art",
  "Design",
  "Software",
  "Mechanical",
  "Electrical",
] as ProjectType[];


const defaultForm = {
  projectName: "",
  projectDescription: "",
  projectTypes: [],
  projectStart: null,
  projectEnd: null,
  projectFile: null,
  projectGithub: null,
};

export default function Home() {
  const [typeFilter, setTypeFilter] = useState<ProjectType[]>(typeOptions);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [projectModalOpen, setProjectModalOpen] =
    useState<boolean>(false);

  const { data: session } = useSession();

  const [projectFormData, setProjectFormData] = useState <ProjectFormValues>(defaultForm)
      
  const [projectFormType, setProjectFormType] = useState<"create" | "edit">("create")

  const [editingProjectID, setEditingProjectID] = useState<number>(-1);

  function toggleTypeFilter(category: ProjectType) {
    setTypeFilter((prevTypeFilter) => {
      let newTypeFilter: ProjectType[];
      if (category === "All") {
        newTypeFilter =
          prevTypeFilter.length === typeOptions.length ? [] : [...typeOptions];
      } else {
        if (prevTypeFilter.includes(category)) {
          newTypeFilter = prevTypeFilter.filter((c) => c !== category);
        } else {
          newTypeFilter = [...prevTypeFilter, category];
        }

        const allButAll = typeOptions.filter((c) => c !== "All");

        if (allButAll.every((opt) => newTypeFilter.includes(opt))) {
          newTypeFilter = [...newTypeFilter, "All"];
        } else {
          newTypeFilter = newTypeFilter.filter((c) => c !== "All");
        }
      }

      return newTypeFilter;
    });
  }

  function handleProjectUpdate(updatedProject: Project) {
    setFilteredProjects((prevProjects) => {
      const existingIndex = prevProjects.findIndex(
        (p) => p.id === updatedProject.id
      );
      if (existingIndex !== -1) {
        return [
          ...prevProjects.slice(0, existingIndex),
          updatedProject,
          ...prevProjects.slice(existingIndex + 1),
        ];
      } else {
        return [...prevProjects, updatedProject];
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch("/api/project");
      const projects = await response.json();

      setFilteredProjects(
        projects?.data.filter(
          (project: Project) =>
            typeFilter.includes("All") ||
            // select some not all from project type selection
            project.type.some((opt) => typeFilter.includes(opt as ProjectType))
        )
      );

      setIsLoading(false);
    };

    fetchData();
  }, [typeFilter]);


  // clicked on edit for individual project card
  useEffect(() => {
    const formData = filteredProjects.find(
      (project) => project.id === editingProjectID
    );

    if (formData) {
      setProjectFormData({
        projectName: formData.name || "",
        projectDescription: formData.description || "",
        projectTypes: (formData.type as ProjectType[]) || [],
        projectStart:
          formData.projectStartMonth && formData.projectStartYear ? new Date(formData.projectStartYear, formData.projectStartMonth-1, 1) : null,
        projectEnd:
          formData.projectEndMonth && formData.projectEndYear ? new Date(formData.projectEndYear, formData.projectEndMonth-1, 1) : null,
        projectFile: formData.img || null,
        projectGithub: formData.github || null,
      });

    }
  }, [editingProjectID, filteredProjects]);

  useEffect(() => {
    if (editingProjectID !== -1) {
      setProjectModalOpen(true);
      setProjectFormType("edit");
    } else {
      setProjectModalOpen(false);
    }
  }, [editingProjectID]);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      {isLoading ? (
        <LoadingAnimation></LoadingAnimation>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col w-full gap-12 p-8 bg-white border shadow sm:p-12 lg:gap-20 md:p-16 rounded-3xl">
            <div className="flex flex-col-reverse items-start justify-between gap-4 lg:flex-row lg:gap-0">
              <div className="flex flex-col gap-8 bg-white rounded-2xl">
                <div className="flex flex-row flex-wrap items-center gap-1 text-base font-bold md:text-lg lg:text-xl sm:text-2xl text-zinc-500">
                  <a
                    href="https://linkedin.com"
                    className="flex flex-row items-center gap-1 hover:underline hover:text-blue-500 underline-offset-8">
                    <IconBrandLinkedin stroke={2.5} />
                    <span>linkedin</span>
                  </a>
                  <IconPointFilled size={12} />
                  <a
                    href="https://github.com"
                    className="flex flex-row items-center gap-1 hover:underline hover:text-zinc-900 underline-offset-8">
                    <IconBrandGithubFilled stroke={2.5} size={20} />
                    <span>github</span>
                  </a>
                  <IconPointFilled size={12} />
                  <a
                    href="https://twitter.com"
                    className="flex flex-row items-center gap-1 hover:underline hover:text-rose-400 underline-offset-8">
                    <IconBrandInstagram stroke={2.5} />
                    <span>instagram</span>
                  </a>
                </div>

                <div className="flex flex-col items-start gap-2 md:items-end md:flex-row">
                  <p className="text-3xl font-extrabold sm:text-4xl xl:text-5xl text-zinc-700">
                    👋🏻 hi there! it&apos;s michael ✌🏻
                  </p>
                </div>
                <div className="flex flex-row flex-wrap gap-3">
                  <Tag
                    bg_color="bg-blue-200"
                    txt_color="text-blue-900"
                    hover_bg_color="hover:bg-blue-300"
                    href={
                      "https://www.solidworks.com/certifications/mechanical-design-cswp-mechanical-design"
                    }>
                    <span className="text-xs md:text-sm">⚙️ CSWP</span>
                  </Tag>
                  <Tag
                    bg_color="bg-amber-200"
                    txt_color="text-amber-900"
                    hover_bg_color="hover:bg-amber-300"
                    href={"https://azre.gov/persona/licensees"}>
                    <span className="text-xs md:text-sm">
                      🏠 ADRE Licensed (soon)
                    </span>
                  </Tag>
                  <Tag
                    bg_color="bg-red-300"
                    txt_color="text-red-900"
                    hover_bg_color="hover:bg-red-400"
                    href={
                      "https://gb.abrsm.org/en/our-exams/diplomas/music-performance/arsm-associate-of-the-royal-schools-of-music/"
                    }>
                    <span className="text-xs md:text-sm">🎹 ARSM Merit</span>
                  </Tag>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between gap-1 text-lg font-semibold whitespace-nowrap sm:gap-3 lg:gap-0 xl:gap-3 lg:flex-col xl:flex-row text-zinc-700">
                <span className="flex-grow font-bold text-zinc-800">
                  🌵 PHX, AZ
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p className="w-full text-base font-semibold md:text-lg lg:text-xl sm:w-3/4 text-zinc-800">
                This is the process 🎨. Engineering, web development, design,
                art! Inspiring others drives me, so join my creative and
                ambitious journey!
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 sm:flex-row md:gap-2">
              <span className="text-lg font-bold text-zinc-700 whitespace-nowrap">
                My works:
              </span>
              <div className="flex flex-row flex-wrap items-center justify-start gap-2 text-xs md:text-sm md:gap-4">
                <button onClick={() => toggleTypeFilter("All")}>
                  {typeFilter.length === typeOptions.length ? (
                    <Tag hover_bg_color="hover:bg-zinc-50">
                      <div className="flex flex-row items-center justify-center gap-0 md:gap-1">
                        <IconCircleCheckFilled className="p-0.5 text-zinc-600" />
                        <span>All</span>
                      </div>
                    </Tag>
                  ) : (
                    <Tag hover_bg_color="hover:bg-zinc-50">
                      <div className="flex flex-row items-center justify-center gap-1">
                        <IconCircleFilled className="p-0.5 text-zinc-600" />
                        <span>All</span>
                      </div>
                    </Tag>
                  )}
                </button>

                {typeOptions.map((category) => {
                  if (category !== "All") {
                    const IconComponent = typeFilter.includes(category)
                      ? IconCircleCheckFilled
                      : IconCircleFilled;

                    return (
                      <button
                        key={category}
                        onClick={() => toggleTypeFilter(category)}>
                        <Tag>
                          <div className="flex flex-row items-center justify-center gap-1">
                            <IconComponent className="p-0.5 text-zinc-600 hover:text-zinc-500" />
                            <span className="text-sm">{category}</span>
                          </div>
                        </Tag>
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
            {session?.user.role === "ADMIN" && (
              <>
                <Tag
                  hover_bg_color="hover:bg-green-200"
                  bg_color="bg-green-50"
                  txt_color="text-green-600">
                  <button
                    onClick={() => {
                      setProjectFormType("create");
                      setProjectFormData(defaultForm);
                      setProjectModalOpen(true);
                    }}
                    type="button"
                    className="flex flex-row items-center justify-center">
                    <IconLayoutGridAdd className="p-1" stroke={2.5} />
                    <span className="text-sm">Add Work | Project</span>
                  </button>
                </Tag>
              </>
            )}
          </div>
          <div className="grid w-full h-full grid-flow-row-dense grid-cols-1 aspect-square md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-4 gap-y-6">
            {filteredProjects &&
              filteredProjects.map((project) => {
                return (
                  <ProjectCard
                    key={`proj_${project.id}`}
                    types={project.type as ProjectType[]}
                    id={project.id}
                    editable={session?.user.role === "ADMIN"}
                    projectStartYear={project.projectStartYear}
                    projectEndYear={project.projectEndYear}
                    projectStartMonth={project.projectStartMonth}
                    projectEndMonth={project.projectEndMonth}
                    setEditingProjectID={setEditingProjectID}>
                    <a
                      key={project.name}
                      className={`w-full col-span-1 cursor-pointer h-full`}
                      href={`/project/${project.id}`}>
                      <style jsx>
                        {`
                          .vignette_art {
                            position: relative;
                            overflow: hidden;
                            border-radius: 1.5rem;
                          }

                          .vignette_art::before {
                            content: "";
                            position: absolute;

                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: radial-gradient(
                              ellipse at center,
                              rgba(0, 0, 0, 0) 0%,
                              rgba(255, 255, 255, 1) 75%
                            );
                          }

                          .vignette_art:hover::before {
                            background: radial-gradient(
                              ellipse at center,
                              rgba(0, 0, 0, 0) 0%,
                              rgba(255, 255, 255, 1) 80%
                            );
                          }

                          .vignette {
                            position: relative;
                            overflow: hidden;
                            border-radius: 1.5rem;
                          }

                          .vignette::before {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: radial-gradient(
                              ellipse at center,
                              rgba(0, 0, 0, 0) 0%,
                              rgba(255, 255, 255, 0.2) 65%
                            );
                          }

                          .vignette:hover::before {
                            background: radial-gradient(
                              ellipse at center,
                              rgba(0, 0, 0, 0) 0%,
                              rgba(255, 255, 255, 0.2) 80%
                            );
                          }
                        `}
                      </style>
                      <div
                        className={` ${
                          project.type.some((type) => type == "Art")
                            ? "vignette_art"
                            : "vignette"
                        } h-full shadow`}>
                        {project.img && (
        <div className="flex flex-col justify-center h-full">
                            <Image
                              className="w-full h-auto "
                              width={800}
                              height={800}
                              src={project.img}
                              alt={project.name}
                             
                            />
              </div>
                        )}
                      </div>
                    </a>
                  </ProjectCard>
                );
              })}
          </div>
        </div>
      )}

      <ProjectForm
        projectModalOpen={projectModalOpen}
        setProjectModalOpen={setProjectModalOpen}
        projectUpdate={handleProjectUpdate}
        data={projectFormData}
        formType={projectFormType}
        projectId={editingProjectID}
      />
    </>
  );
}
