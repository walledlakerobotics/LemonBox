<script lang="ts">
  import type { Motor } from "./motor.svelte";

  let { motor, onOpen }: { motor: Motor; onOpen: () => void } = $props();
</script>

<button id="motor-tile" onclick={onOpen}>
  {#await motor.getImageDir() then dir}
    <img src={dir} alt="" />
  {/await}

  {#await motor.getDisplayName() then display}
    <h1>{display}</h1>
  {/await}

  <h2>{motor.id}</h2>
</button>

<style>
  #motor-tile {
    background-color: var(--fg-color);
    color: var(--text-color);

    border: solid;
    border-width: 1px;
    border-radius: 5px;

    transition: 0.2s;

    padding: 2vh;

    display: block;

    height: 100%;

    animation: tile-fade-in ease both;
    animation-timeline: view(inline);
    animation-range: entry 0% entry 60%;

    font-size: clamp(0.75rem, 2.5dvh, 1.5rem);

    img {
      display: block;
      max-width: 100%;
      object-fit: cover;
      aspect-ratio: 1 / 1;
      flex-grow: 1;
      height: 70%;
    }
  }

  #motor-tile h1 {
    margin: 5px 5px 0 5px;
  }
  #motor-tile h2 {
    margin: 5px 5px 0 5px;
    opacity: 0.7;
  }
  @keyframes tile-fade-in {
    from {
      opacity: 0;
      transform: scale(0.8);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  #motor-tile:active {
    background-color: var(--border-color);
    color: var(--bg-color);
  }
</style>
