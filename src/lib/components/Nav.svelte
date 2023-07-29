<script lang="ts">
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
</script>

<nav
  class="fixed top-0 left-0 flex flex-row items-center gap-5 px-12 py-4 text-zinc-600 dark:text-zinc-50"
>
  <a
    href="/"
    style="font-family: 'Pacifico', cursive; font-size: 32px"
    class="hover:underline underline-offset-4">miko</a
  >
  <ThemeToggle />
</nav>
