<script lang="ts">
  import "../app.css";
  import Nav from "$lib/components/Nav.svelte";
</script>

<main class="px-72 dark:bg-zinc-700 p-44 bg-zinc-100">
  <Nav />
  <slot />
</main>
