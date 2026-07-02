<script lang="ts">
  import FaultMessage from "./FaultMessage.svelte";
  import type { Motor } from "./motor.svelte.ts";
  let { motor, onClose }: { motor: Motor; onClose: () => void } = $props();

  let speed: number = $state(0);
  let brushless: boolean = $state(false);
  let disabled: boolean = $state(true);

  let amps: number = $state(0);
  let voltage: number = $state(0);

  setInterval(async () => {
    amps = await motor.amps;
    voltage = await motor.voltage;
  }, 100);

  $effect(() => {
    motor.speed = speed;
    motor.brushless = brushless;
  });

  $effect(() => {
    motor.disabled = disabled;
  });
</script>

<div id="wrapper">
  <div id="dashboard-container">
    <div id="display-container">
      {#await motor.getImageDir() then motorImage}
        <img src={motorImage} alt="/assets/imgs/placeholder.png" />
      {/await}

      {#await motor.getDisplayName() then displayName}
        <h1>{displayName}</h1>
      {/await}

      <h2>{motor.id}</h2>
    </div>

    <div id="faults-panel">
      {#await motor.faults then faults}
        {#each faults as f}
          <FaultMessage fault={f}></FaultMessage>
        {/each}
      {/await}
    </div>

    <div id="electrical-panel">
      <p>Applied Voltage: {voltage}</p>
      <p>Amps: {amps}</p>
    </div>
  </div>

  <div id="control-panel">
    <label for="speed-slider">Speed: {speed}</label>
    <div class="controls">
      <input
        id="speed-slider"
        type="range"
        step="0.01"
        min="-1"
        max="1"
        bind:value={speed}
      />

      <div id="check-boxes">
        {#await motor.type then t}
          {#if t == "sparkmax"}
            {@render brushlessSnip()}
          {/if}
        {/await}

        <label for="disabled-checkbox">disabled</label>
        <input
          id="disabled-checkbox"
          title="disabled"
          type="checkbox"
          bind:checked={disabled}
        />
      </div>
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
</div>

{#snippet brushlessSnip()}
  <label for="brushless-checkbox">brushless</label>
  <input
    id="brushless-checkbox"
    title="brushless"
    type="checkbox"
    bind:checked={brushless}
  />
{/snippet}

<style>
  #dashboard-container {
    display: flex;
    flex-direction: row;
    gap: 1vw;
    padding: 1vw;
    margin-bottom: 1vh;
  }

  #display-container img {
    width: 100%;
    max-width: 26vw;
    height: auto;
  }

  #display-container {
    background-color: var(--fg-color);
    padding: 1vw;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    color: var(--text-color);

    flex: auto;
  }

  #display-container h1,
  #display-container h2 {
    margin: 2px;
  }
  #speed-slider {
    display: flex;
    flex: 1;
    margin: 2vh;
  }

  .controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  #speed-slider {
    flex: 1;
    min-width: 0;
  }
  #faults-panel {
    background-color: var(--fg-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 5px;

    display: flex;
    flex-direction: column;

    overflow-y: scroll;
    overflow-x: hidden;
  }

  #electrical-panel {
    background-color: var(--fg-color);
    padding: 1vw;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    color: var(--text-color);

    height: auto;

    display: flex;
    flex-direction: column;
    gap: 5px;

    overflow-y: auto;
    overflow-x: hidden;

    flex: auto;
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

    gap: 1dvh;
    flex: 0 1 min-content;

    display: flex;
    flex-direction: column;

    margin-bottom: auto;
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

  #check-boxes {
    background-color: var(--button-color);
    display: flex;
    flex-direction: column;
    gap: 1vh;
    padding: 1vw;

    border-radius: 5px;
  }
</style>
