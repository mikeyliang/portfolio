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
import Card from "../components/Card";
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
    if (category === "All") {
      setTypeFilter(
        typeFilter.length === typeOptions.length ? [] : [...typeOptions]
      );
    } else {
      if (typeFilter.includes(category)) {
        setTypeFilter(typeFilter.filter((c) => c !== category));
      } else {
        setTypeFilter([...typeFilter, category]);
      }

      if (
        typeOptions
          .filter((c) => c !== "All")
          .every((opt) => typeFilter.includes(opt))
      ) {
        setTypeFilter([...typeFilter, "All"]);
      } else {
        setTypeFilter(typeFilter.filter((c) => c !== "All"));
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/project");
      const projects = await response.json();

      setFilteredProjects(
        projects?.data.filter(
          (project: Project) =>
            typeFilter.includes("All") ||
            project.type.every((opt) => typeFilter.includes(opt as ProjectType))
        )
      );
    };

    fetchData();
  }, [typeFilter]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col w-full gap-12 p-8 bg-white border lg:gap-24 sm:p-16 rounded-3xl">
        <div className="flex flex-col-reverse items-start justify-between gap-4 lg:flex-row lg:gap-0">
          <div className="flex flex-col gap-8 bg-white rounded-2xl">
            <div className="flex flex-row flex-wrap items-center gap-1 text-2xl font-bold text-zinc-500">
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

            <div className="flex flex-col items-end gap-2 md:flex-row">
              <p className="text-4xl font-extrabold sm:text-5xl text-zinc-700">
                👋🏻 hi there! it&apos;s michael ✌🏻
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <Tag
                bg_color="bg-blue-200"
                txt_color="text-blue-900"
                hover_bg_color="hover:bg-blue-300"
                href={
                  "https://www.solidworks.com/certifications/mechanical-design-cswp-mechanical-design"
                }>
                <span className="text-sm">⚙️ CSWP</span>
              </Tag>
              <Tag
                bg_color="bg-amber-200"
                txt_color="text-amber-900"
                hover_bg_color="hover:bg-amber-300"
                href={"https://azre.gov/persona/licensees"}>
                <span className="text-sm">🏠 ADRE Licensed (soon)</span>
              </Tag>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-1 text-lg font-semibold sm:gap-3 sm:flex-row text-zinc-700">
            <span className="flex justify-end font-bold text-zinc-800">
              🌵 PHX, AZ
            </span>
            <Clock timeZone="America/Phoenix" />
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="w-full text-xl font-semibold sm:w-3/4 text-zinc-800">
            This is the process 🎨. Engineering, design, art! Inspiring others
            drives me, so join my creative and ambitious journey!
          </p>
        </div>
        <div className="flex flex-row items-start justify-start gap-2">
          <span className="text-lg font-bold text-zinc-700 whitespace-nowrap">
            My works:
          </span>
          <div className="flex flex-row flex-wrap items-center justify-start gap-2">
            <button onClick={() => toggleTypeFilter("All")}>
              {typeFilter.length === typeOptions.length ? (
                <Tag>
                  <div className="flex flex-row items-center justify-center gap-1">
                    <IconCircleCheckFilled className="p-0.5 text-zinc-600" />
                    <span className="text-sm">All</span>
                  </div>
                </Tag>
              ) : (
                <Tag>
                  <div className="flex flex-row items-center justify-center gap-1">
                    <IconCircleFilled className="p-0.5 text-zinc-600" />
                    <span className="text-sm">All</span>
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
                        <IconComponent className="p-0.5 text-zinc-600" />
                        <span className="text-sm">{category}</span>
                      </div>
                    </Tag>
                  </button>
                );
              }
              return null; // This line is necessary to satisfy React's requirement for a return value
            })}
          </div>
        </div>
      </div>
      <div className="grid w-full grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        {filteredProjects &&
          filteredProjects.map((project) => {
            return (
              <div key={project.name} className="w-full col-span-1">
                <style jsx>
                  {`
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
                        rgba(255, 255, 255, 1) 75%
                      );
                    }

                    .vignette:hover::before {
                      background: radial-gradient(
                        ellipse at center,
                        rgba(0, 0, 0, 0) 0%,
                        rgba(255, 255, 255, 1) 80%
                      );
                    }
                  `}
                </style>
                <Card
                  types={project.type as ProjectType[]}
                  id={project.id}
                  date={project.projectTime}>
                  <div className="cursor-pointer vignette">
                    {project.img && (
                      <Image
                        className="rounded-4xl"
                        width={500}
                        height={500}
                        src={project.img}
                        alt={project.name}
                      />
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}
