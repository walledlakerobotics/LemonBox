<script lang="ts">
  import type { Motor } from "./motor.svelte";

  let { motor, onOpen }: { motor: Motor; onOpen: () => void } = $props();
</script>

<button id="motor-tile" onclick={onOpen}>
  {#key motor.getImageDir()}
    {#await motor.getImageDir()}
      <img src="assets/imgs/placeHolder.png" alt="" />
    {:then dir}
      <img src={dir} alt="" />
    {:catch}
      <img src="assets/imgs/placeHolder.png" alt="" />
    {/await}
  {/key}

  {#key motor.getDisplayName()}
    {#await motor.getDisplayName()}
      <h1>Loading...</h1>
    {:then display}
      <h1>{display}</h1>
    {:catch}
      <h1>Unknown</h1>
    {/await}
  {/key}
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
    flex-shrink: 0.13;
    gap: 5px;

    display: flex;
    flex-direction: column;

    width: fit-content;
    min-width: 275px;

    transition: 0.2s;

    animation: tile-fade-in ease both;
    animation-timeline: view(inline);
    animation-range: entry 0% entry 60%;

    font-size: clamp(0.75rem, 2.5dvh, 1.5rem);

    align-items: center;
    overflow: hidden;
  }

  #motor-tile img {
    display: block;
    align-self: stretch;
    width: 0;
    min-width: 100%;
    object-fit: contain;
    flex: 1 1 auto;
    min-height: 0;
  }

  #motor-tile h1 {
    margin: 0;
    flex-shrink: 0;
  }

  #motor-tile h2 {
    margin: 5px 5px 0;
    opacity: 0.7;
    flex-shrink: 0;
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
