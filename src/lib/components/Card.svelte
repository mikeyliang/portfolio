<script lang="ts">
  export let id = "";
  export let date: Date;

  
</script>

<div class="relative p-16">
  <span class="absolute top-1 left-1">{`ID ${id}`}</span>
  <span class="absolute top-1 right-1">{date}</span>
  <slot />
</div>
