<script lang="ts">
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
</script>

<div id="wrapper">
  <div id="dashboard-container">
    <div id="display-container">
      {#await motor.getImageDir() then motorImage}
        <img src={motorImage} alt="" />
      {/await}

      {#await motor.getDisplayName() then displayName}
        <h1>{displayName}</h1>
      {/await}

      <h2>{motor.id}</h2>
    </div>

    <div id="faults-panel">
      {#await motor.faults then f}
        <p>{f}</p>
      {/await}

      <p>Stick-faults----</p>

      {#await motor.stickyFaults then f}
        <p>{f}</p>
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
        <label for="brushless-checkbox">brushless</label>
        <input
          id="brushless-checkbox"
          title="brushless"
          type="checkbox"
          bind:checked={brushless}
        />

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

<style>
  #dashboard-container {
    display: flex;
    flex-direction: row;
    gap: 1vw;
  }

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

  #faults-panel {
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

  #check-boxes {
    background-color: var(--button-color);
    display: flex;
    flex-direction: column;
    gap: 1vh;
    padding: 1vw;

    border-radius: 5px;
  }

  #wrapper {
    display: flex;
    flex-direction: column;

    gap: 1vh;
  }
</style>
