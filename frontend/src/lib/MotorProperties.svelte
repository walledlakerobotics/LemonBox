<script lang="ts">
  import type { Motor } from "./motor.ts";
  let { motor, onClose }: { motor: Motor; onClose: () => void } = $props();
</script>

<div id="display-container">
  {#await motor.imageDir then motorImage}
    <img src={motorImage} alt="" />
  {/await}

  {#await motor.displayName then displayName}
    <h1>{displayName}</h1>
  {/await}

  <h2>{motor.id}</h2>
</div>

<div id="control-panel">
  <label for="speed-slider">Speed: {motor.speed}</label>
  <div class="controls">
    <input
      id="speed-slider"
      type="range"
      step="0.01"
      min="-1"
      max="1"
      bind:value={motor.speed}
    />

    <label for="brushless-checkbox">brushless</label>
    <input
      id="brushless-checkbox"
      title="brushless"
      type="checkbox"
      bind:value={motor.brushless}
    />

    <label for="disabled-checkbox">disabled</label>
    <input
      id="disabled-checkbox"
      title="disabled"
      type="checkbox"
      bind:checked={motor.disabled}
    />
  </div>

  <button
    id="close-button"
    onclick={() => {
      motor.disabled = true;
      onClose();
    }}
    aria-label="close">Close</button
  >
</div>

<style>
  #display-container {
    background-color: var(--fg-color);
    padding: 1vw;
    border-radius: 5px;
    border: solid;
    border-width: 1px;
    border-color: var(--border-color);
    color: var(--text-color);
    margin: 0 10px 0 10px;

    img {
      width: 26vw;
      border-radius: 5px;
    }
  }

  #display-container h1,
  #display-container h2 {
    margin: 2px;
  }
  #speed-slider {
    display: flex;
    flex: 1;
  }
  .controls {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  #faults {
    background-color: var(--fg-color);
    padding: 1vw;
    border-radius: 5px;
    border: solid;
    border-width: 1px;
    border-color: var(--border-color);
    color: var(--text-color);
  }

  #electrical-panel {
    background-color: var(--fg-color);
    padding: 1vw;
    border-radius: 5px;
    border: solid;
    border-width: 1px;
    border-color: var(--border-color);
    color: var(--text-color);
  }

  #control-panel {
    background-color: var(--fg-color);
    padding: 1vw;
    border-radius: 5px;
    border: solid;
    border-width: 1px;
    border-color: var(--border-color);
    color: var(--text-color);
    margin: 0 10px 10px 10px;

    position: relative;

    gap: 1dvh;
    flex: 0 1 min-content;

    display: flex;
    flex-direction: column;
  }

  #close-button {
    padding: 5px;
    border: 1px solid rgba(var(--theme-rgb), 0.3);
  }
  button {
    background-color: var(--button-color);
    color: var(--text-color);
    border: none;
    border-radius: 5px;

    transition: 0.2s;
  }

  button:active {
    background-color: var(--border-color);
    color: var(--fg-color);
    border: none;
    border-radius: 5px;
  }
</style>
