<script lang="ts">
  import type { Motor } from "./motor.svelte";

  let { motor, onOpen }: { motor: Motor; onOpen: () => void } = $props();
</script>

<button id="motor-tile" onclick={onOpen}>
  {#await motor.getImageDir()}
    <img src="assets/imgs/placeHolder.png" alt="" />
  {:then dir}
    <img src={dir} alt="" />
  {/await}

  {#await motor.getDisplayName()}
    <h1>Loading...</h1>
  {:then display}
    <h1>{display}</h1>
  {:catch}
    <img src="assets/imgs/placeHolder.png" alt="" />
  {/await}

  <h2>{motor.id}</h2>
</button>

<style>
  #motor-tile {
    background-color: var(--fg-color);
    color: var(--text-color);

    border: 1px solid;
    border-radius: 5px;
    box-sizing: border-box;

    padding: 2vh;

    display: flex;
    flex-direction: column;

    width: 100%;
    min-width: 0;

    transition: 0.2s;

    animation: tile-fade-in ease both;
    animation-timeline: view(inline);
    animation-range: entry 0% entry 60%;

    font-size: clamp(0.75rem, 2.5dvh, 1.5rem);
  }

  #motor-tile img {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    flex-grow: 1;
    height: auto;
  }

  #motor-tile h1 {
    margin: 5px 5px 0;
  }

  #motor-tile h2 {
    margin: 5px 5px 0;
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
