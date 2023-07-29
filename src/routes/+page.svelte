<script>
  import {
    IconPointFilled,
    IconBrandLinkedin,
    IconBrandGithubFilled,
    IconBrandInstagram,
    IconSchool,
    IconChargingPile,
  } from "@tabler/icons-svelte";

  import Tag from "$lib/components/Tag.svelte";
  import Clock from "$lib/components/Clock.svelte";
</script>

<div class="flex flex-col gap-24 p-16 bg-white border rounded-3xl">
  <div class="flex flex-row items-start justify-between">
    <div class="flex flex-col gap-8 bg-white rounded-2xl">
      <div
        class="flex flex-row items-center gap-1 text-2xl font-bold text-zinc-500"
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
        <p class="text-5xl font-extrabold text-zinc-700">
          👋🏻 hi there! its michael ✌🏻
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
          ><span class="text-sm">🏠 AZRE Licensed</span></Tag
        >
      </div>
    </div>
    <div
      class="flex flex-row justify-between gap-3 text-lg font-semibold text-zinc-700"
    >
      <span class="flex justify-end font-bold text-zinc-800">🌵 PHX, AZ</span>
      <Clock timeZone="America/Phoenix" />
    </div>
  </div>
  <div class="flex flex-row justify-between w-full">
    <p class="w-3/4 text-xl font-semibold text-zinc-800">
      This is the process 🎨. Engineering, design, art—my daily passion.
      Inspiring others drives me. Join my creative and ambitious journey!
    </p>
  </div>
  <div class="flex flex-row items-center justify-start gap-2">
    <span class="text-xl font-bold text-zinc-700">My works:</span>
    <div class="flex flex-row items-center justify-start gap-1">
      <button> <Tag><div>All</div></Tag> </button>

      <button><Tag><div>Art</div></Tag></button>

      <button><Tag><div>Design</div></Tag></button>
      <button><Tag><div>Software</div></Tag></button>
      <button><Tag><div>Mechanical</div></Tag></button>
      <button><Tag><div>Electrical</div></Tag></button>
    </div>
  </div>
</div>
