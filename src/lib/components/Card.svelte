<script lang="ts">
  import type { ProjectCategory, ProjectType } from "$lib/types/projects.type";
  import { getTypeColor } from "$lib/types/projects.type";
  import Tag from "$lib/components/Tag.svelte";

  export let id: number;
  export let date: string | null;
  export let types: ProjectType[];
</script>

<div class="relative flex flex-col w-auto gap-24 bg-white border rounded-3xl">
  <span class="absolute z-10 text-xs font-medium top-4 left-6 text-zinc-600"
    >{`ID ${id}`}</span
  >
  <span class="absolute z-10 text-xs font-medium top-4 right-6 text-zinc-600"
    >{date}</span
  >
  {#if types && types.length > 0}
    <div
      class="absolute z-10 flex flex-row items-center justify-center gap-2 bottom-4 right-6"
    >
      {#each types as type, index}
        <Tag
          bg_color={getTypeColor(type).bg_color}
          txt_color={getTypeColor(type).txt_color}
        >
          <span class="text-xs">{type}</span>
        </Tag>
      {/each}
    </div>
  {/if}
  <slot />
</div>
