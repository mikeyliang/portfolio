"use client";
import {
  IconPointFilled,
  IconBrandLinkedin,
  IconBrandGithubFilled,
  IconBrandInstagram,
  IconCircleFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";

import Image from "next/image";

import React, { useState, useEffect } from "react";

import Tag from "../components/Tag";
import ProjectCard from "../components/ProjectCard";
import Clock from "../components/Clock";

import { Project, ProjectType } from "../types/project";

const typeOptions = [
  "All",
  "Art",
  "Design",
  "Software",
  "Mechanical",
  "Electrical",
] as ProjectType[];

export default function Home() {
  const [typeFilter, setTypeFilter] = useState<ProjectType[]>(typeOptions);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [typeFilter]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col w-full gap-12 p-8 bg-white border sm:p-12 lg:gap-24 md:p-16 rounded-3xl">
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
                <span className="text-xs md:text-sm">🏠 ADRE Licensed (soon)</span>
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
          <div className="flex flex-row items-center justify-between gap-1 text-lg font-semibold whitespace-nowrap sm:gap-3 lg:flex-col xl:flex-row text-zinc-700">
            <span className="flex-grow font-bold text-zinc-800">
              🌵 PHX, AZ
            </span>
            <Clock timeZone="America/Phoenix" />
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="w-full text-base font-semibold md:text-lg lg:text-xl sm:w-3/4 text-zinc-800">
            This is the process 🎨. Engineering, web development, design, art!
            Inspiring others drives me, so join my creative and ambitious
            journey!
          </p>
        </div>
        <div className="flex flex-col items-start justify-start gap-1 sm:flex-row md:gap-2">
          <span className="text-lg font-bold text-zinc-700 whitespace-nowrap">
            My works:
          </span>
          <div className="flex flex-row flex-wrap items-center justify-start gap-0 text-xs md:text-sm md:gap-1">
            <button onClick={() => toggleTypeFilter("All")}>
              {typeFilter.length === typeOptions.length ? (
                <Tag>
                  <div className="flex flex-row items-center justify-center gap-0 md:gap-1">
                    <IconCircleCheckFilled className="p-0.5 text-zinc-600" />
                    <span>All</span>
                  </div>
                </Tag>
              ) : (
                <Tag>
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
      </div>
      <div className="grid w-full h-full grid-flow-row-dense grid-cols-1 aspect-square md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-4 gap-y-6">
        {filteredProjects &&
          filteredProjects.map((project) => {
            return (
              <a
                key={project.name}
                className={`w-full col-span-1 cursor-pointer`}
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
                <ProjectCard
                  types={project.type as ProjectType[]}
                  id={project.id}
                  projectStartYear={project.projectStartYear}
                  projectEndYear={project.projectEndYear}
                  projectStartMonth={project.projectStartMonth}
                  projectEndMonth={project.projectEndMonth}>
                  <div
                    className={` ${
                      project.type.some((type) => type == "Art")
                        ? "vignette_art"
                        : "vignette"
                    } h-full flex-col justify-center items-center`}>
                    {project.img && (
                      <div className="flex flex-col justify-center h-full">
                      <Image
                        className="object-cover rounded-4xl"
                        width={1000}
                        height={1000}
                        src={project.img}
                        alt={project.name}
                      />
                      </div>
            
                    )}
                  </div>
                </ProjectCard>
              </a>
            );
          })}
      </div>
    </div>
  );
}
