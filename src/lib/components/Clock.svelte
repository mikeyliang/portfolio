<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let timeZone: string = "UTC";
  let time: string = "";

  function updateClock() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // Use 12-hour format with AM/PM
    };

    time = date.toLocaleString("en-US", options);
  }

  let interval: NodeJS.Timeout;

  onMount(() => {
    // Update the clock every second
    interval = setInterval(updateClock, 1000);
  });

  onDestroy(() => {
    // Clear the interval when the component is unmounted
    clearInterval(interval);
  });
</script>

<div>
  {time}
</div>
