<script lang="ts">
  import {
    IconPointFilled,
    IconBrandLinkedin,
    IconBrandGithubFilled,
    IconBrandInstagram,
    IconCircleFilled,
    IconCircleCheckFilled,
  } from "@tabler/icons-svelte";

  import Tag from "$lib/components/Tag.svelte";
  import Clock from "$lib/components/Clock.svelte";
  import Card from "$lib/components/Card.svelte";

  import type { ProjectCategory, ProjectType } from "$lib/types/projects.type";

  import type { PageData } from "./$types";
  export let data: PageData;

  let typeOptions = ["Art", "Design", "Software", "Mechanical", "Electrical"];

  let typeFilter = [...typeOptions];

  function toggleTypeFilter(category: string) {
    if (category === "All") {
      typeFilter =
        typeFilter.length === typeOptions.length ? [] : [...typeOptions];
    } else {
      if (typeFilter.includes(category)) {
        typeFilter = typeFilter.filter((c) => c !== category);
      } else {
        typeFilter = [...typeFilter, category];
      }

      if (
        typeOptions
          .filter((c) => c !== "All")
          .every((opt) => typeFilter.includes(opt))
      ) {
        typeFilter = [...typeFilter, "All"];
      } else {
        typeFilter = typeFilter.filter((c) => c !== "All");
      }
    }
  }

  $: filteredProjects = data.projects?.filter(
    (project) =>
      typeFilter.includes("All") ||
      project.type.every((opt) => typeFilter.includes(opt))
  );
</script>

<div class="flex flex-col items-center justify-center gap-6">
  <div
    class="flex flex-col w-full gap-12 p-8 bg-white border lg:gap-24 sm:p-16 rounded-3xl"
  >
    <div
      class="flex flex-col-reverse items-start justify-between gap-4 lg:flex-row lg:gap-0"
    >
      <div class="flex flex-col gap-8 bg-white rounded-2xl">
        <div
          class="flex flex-row flex-wrap items-center gap-1 text-2xl font-bold text-zinc-500"
        >
          <a
            href="https://linkedin.com"
            class="flex flex-row items-center gap-1 hover:underline hover:text-blue-500 underline-offset-8"
          >
            <IconBrandLinkedin stroke={2.5} />
            <span>linkedin</span>
          </a>
          <IconPointFilled size={12} />
          <a
            href="https://github.com"
            class="flex flex-row items-center gap-1 hover:underline hover:text-zinc-900 underline-offset-8"
          >
            <IconBrandGithubFilled stroke={2.5} size={20} />
            <span>github</span>
          </a>
          <IconPointFilled size={12} />
          <a
            href="https://twitter.com"
            class="flex flex-row items-center gap-1 hover:underline hover:text-rose-400 underline-offset-8"
          >
            <IconBrandInstagram stroke={2.5} />
            <span>instagram</span>
          </a>
        </div>

        <div class="flex flex-col items-end gap-2 md:flex-row">
          <p class="text-4xl font-extrabold sm:text-5xl text-zinc-700">
            👋🏻 hi there! it's michael ✌🏻
          </p>
        </div>
        <div class="flex flex-row gap-3">
          <Tag
            bg_color="bg-blue-200"
            txt_color="text-blue-900"
            hover_bg_color="hover:bg-blue-300"
            href={"https://www.solidworks.com/certifications/mechanical-design-cswp-mechanical-design"}
            ><span class="text-sm">⚙️ CSWP</span></Tag
          >
          <Tag
            bg_color="bg-amber-200"
            txt_color="text-amber-900"
            hover_bg_color="hover:bg-amber-300"
            href={"https://azre.gov/persona/licensees"}
            ><span class="text-sm line-through">🏠 ADRE Licensed</span></Tag
          >
        </div>
      </div>
      <div
        class="flex flex-col justify-between gap-1 text-lg font-semibold sm:gap-3 sm:flex-row text-zinc-700"
      >
        <span class="flex justify-end font-bold text-zinc-800">🌵 PHX, AZ</span>
        <Clock timeZone="America/Phoenix" />
      </div>
    </div>
    <div class="flex flex-row justify-between w-full">
      <p class="w-full text-xl font-semibold sm:w-3/4 text-zinc-800">
        This is the process 🎨. Engineering, design, art—my daily passion.
        Inspiring others drives me. Join my creative and ambitious journey!
      </p>
    </div>
    <div class="flex flex-row items-start justify-start gap-2">
      <span class="text-lg font-bold text-zinc-700 whitespace-nowrap"
        >My works:</span
      >
      <div class="flex flex-row flex-wrap items-center justify-start gap-2">
        <button on:click={() => toggleTypeFilter("All")}>
          {#if typeFilter.length === typeOptions.length}
            <Tag>
              <div class="flex flex-row items-center justify-center gap-1">
                <IconCircleCheckFilled class="p-0.5 text-zinc-600" />
                <span class="text-sm">All</span>
              </div>
            </Tag>
          {:else}
            <Tag>
              <div class="flex flex-row items-center justify-center gap-1">
                <IconCircleFilled class="p-0.5 text-zinc-600" />
                <span class="text-sm">All</span>
              </div>
            </Tag>
          {/if}
        </button>
        {#each typeOptions as category}
          {#if category !== "All"}
            <button on:click={() => toggleTypeFilter(category)}>
              <Tag>
                <div class="flex flex-row items-center justify-center gap-1">
                  <svelte:component
                    this={typeFilter.includes(category)
                      ? IconCircleCheckFilled
                      : IconCircleFilled}
                    class="p-0.5 text-zinc-600"
                  />
                  <span class="text-sm">{category}</span>
                </div>
              </Tag>
            </button>
          {/if}
        {/each}
      </div>
    </div>
  </div>
  <div
    class="grid w-full grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6"
  >
    {#if filteredProjects}
      {#each filteredProjects as project}
        <div class="w-full col-span-1">
          <Card types={project.type} id={project.id} date={project.projectTime}>
            <div class="cursor-pointer vignette">
              <img class="rounded-4xl" src={project.img} alt={project.name} />
            </div>
          </Card>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
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

  /* Hover style */
  .vignette:hover::before {
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(255, 255, 255, 1) 80%
    );
  }
</style>
