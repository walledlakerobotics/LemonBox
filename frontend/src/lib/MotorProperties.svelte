<script lang="ts">
  import type { Motor } from "./motor";
  let { motor, onClose }: { motor: Motor; onClose: () => void } = $props();

  let speed = $derived(0);
  let brushless = $derived(false);

  async () => {
    speed = await motor.getSpeed();
    brushless = await motor.getBrushless();
  };

  $effect(() => {
    motor.setSpeed(speed);
    motor.setBrushless(brushless);
  });
</script>

<div id="display-container">
  {#await motor.getMotorImage() then image}
    <img src={image} alt="" />
  {/await}

  {#await motor.getDisplayName() then name}
    <h1>Type: {name}</h1>
  {/await}

  <h2>Id: {motor.id}</h2>
</div>

<div id="control-panel">
  <label for="speed-slider">Speed: {speed}</label>
  <input
    id="speed-slider"
    type="range"
    step="0.01"
    min="-1"
    max="1"
    bind:value={speed}
  />
  <input
    id="brushless-checkbox"
    title="brushless"
    type="checkbox"
    bind:checked={brushless}
  />

  <input
    id="disabled-checkbox"
    title="disabled"
    type="checkbox"
    bind:checked={motor.disabled}
  />

  <button
    id="close-button"
    onclick={() => {
      motor.disabled = true;
      onClose();
    }}
    aria-label="close">close</button
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

    img {
      width: 30vw;
      border-radius: 5px;
    }
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

    position: relative;

    gap: 1dvh;
    flex: 0 1 min-content;

    display: flex;
    flex-direction: column;
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
