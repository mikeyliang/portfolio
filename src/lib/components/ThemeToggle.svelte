<script lang="ts">
  import { IconSun, IconMoon } from "@tabler/icons-svelte";

  import { browser } from "$app/environment";
  let darkMode = true;

  function handleSwitchDarkMode() {
    darkMode = !darkMode;

    localStorage.setItem("theme", darkMode ? "dark" : "light");

    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }

  if (browser) {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      darkMode = true;
    } else {
      document.documentElement.classList.remove("dark");
      darkMode = false;
    }
  }
</script>

<button
  class="relative flex items-center justify-center pt-2 cursor-pointer"
  on:click={handleSwitchDarkMode}
>
  <div
    class="absolute z-10 flex items-center justify-center p-1 transition-all duration-300 ease-in-out bg-white border-2 rounded-full shadow w-7 h-7 dot -left-1 border-zinc-300"
    class:translate-x-6={darkMode}
  >
    {#if darkMode}
      <IconMoon stroke={3} class="text-indigo-500" />
    {:else}
      <IconSun stroke={3} class="text-yellow-500" />
    {/if}
  </div>
  <div class="relative">
    <input type="checkbox" class="hidden" bind:checked={darkMode} />
    <div class="w-10 h-4 bg-white border-2 rounded-full shadow-inner" />
  </div>
</button>

<style>
  input:checked ~ .dot {
    transform: translateX(100%);
  }
</style>
