<script lang="ts">
  export let bg_color: string = "bg-zinc-200";
  export let txt_color: string = "text-zinc-600";
  export let hover_bg_color: string | undefined = undefined;
  export let href: string | undefined = undefined;
</script>

<a
  {href}
  target="_blank"
  class={`flex flex-row h-fit ${
    href && "cursor-pointer"
  } justify-center items-center gap-2 font-bold px-2 py-1 rounded-lg w-fit bg-zinc-200 ${bg_color} ${txt_color} ${hover_bg_color}`}
>
  <slot />
</a>
