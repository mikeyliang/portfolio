<script lang="ts">
  import "../app.css";
  import Nav from "$lib/components/Nav.svelte";

  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });
</script>

<main class="h-auto px-4 py-24 sm:px-16 lg:p-52 lg:px-52 dark:bg-zinc-700">
  <Nav />
  <slot />
</main>
