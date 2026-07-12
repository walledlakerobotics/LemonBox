<script lang="ts">
  import FaultMessage from "./FaultMessage.svelte";
  import { Motor } from "./motor.svelte";
  let { motor, onClose }: { motor: Motor; onClose: () => void } = $props();

  $effect(() => {
    motor.speed = motor.speedState;
    motor.brushless = motor.brushlessState;
  });

  $effect(() => {
    const update: () => Promise<void> = async () => {
      motor.ampsState = await motor.amps;
      motor.voltageState = await motor.voltage;
    };

    update();
  });
</script>

<div id="dashboard-container">
  <div id="display-container">
    {#await motor.getImageDir()}
      <img src="assets/imgs/placeHolder.png" alt="" />
    {:then i}
      <img src={i} alt="" />
    {:catch}
      <img src="assets/imgs/placeHolder.png" alt="" />
    {/await}
    <div style="margin-top: 5px;">
      {#await motor.getDisplayName()}
        <h1>Loading...</h1>
      {:then display}
        <h1>{display}</h1>
      {:catch}
        <h1>Unknown</h1>
      {/await}

      <h2>{motor.id}</h2>
    </div>
  </div>

  <div id="faults-container">
    <div class="faults">
      {#await motor.faults then faults}
        {#each faults as f}
          <FaultMessage fault={f}></FaultMessage>
        {/each}
      {/await}
    </div>
  </div>

  <div id="electrical-container">
    <p>Applied Voltage: {motor.voltageState}</p>
    <p>Amps: {motor.ampsState}</p>
  </div>
</div>

<div id="control-container">
  <div id="controls">
    <p>Speed: <br /> <b>{motor.speedState}</b></p>
    <input
      id="speed-slider"
      type="range"
      step="0.01"
      min="-1"
      max="1"
      bind:value={motor.speedState}
    />

    <div id="check-boxes">
      {#await motor.type then t}
        {#if t == "sparkmax"}
          {@render brushlessSnip()}
        {/if}
      {/await}

      <!-- {@render brushlessSnip()} -->
      <div class="checkbox-option">
        <label for="disabled-checkbox">disabled</label>
        <input
          id="disabled-checkbox"
          title="disabled"
          type="checkbox"
          bind:checked={motor.disabled}
        />
      </div>
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

{#snippet brushlessSnip()}
  <div class="checkbox-option">
    <label for="brushless-checkbox">brushless</label>
    <input
      id="brushless-checkbox"
      title="brushless"
      type="checkbox"
      bind:checked={motor.brushlessState}
    />
  </div>
{/snippet}

<style>
  .checkbox-option {
    display: flex;
    flex-direction: column;
  }
  #dashboard-container {
    display: flex;
    flex-direction: row;
    gap: 1vw;

    flex: 1;
    min-height: 0;
  }

  #display-container {
    display: flex;
    flex-direction: column;

    min-height: 0;

    background-color: var(--fg-color);
    border: solid;
    border-color: var(--border-color);
    border-radius: 5px;
    border-width: 1px;
    padding: 1vw;

    color: var(--text-color);
  }

  #display-container h2,
  #display-container h1 {
    margin: 0;
  }
  #display-container img {
    width: 26vw;
    flex: 1;
    min-height: 0;
    object-fit: contain;
  }
  #faults-container {
    display: flex;
    flex-direction: column;
    flex: 1;

    background-color: var(--fg-color);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 1vw;
    color: var(--text-color);

    min-height: 0;
  }

  .faults {
    display: flex;
    flex-direction: column;
    gap: 5px;

    flex: 1;
    min-height: 0;
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #electrical-container {
    display: flex;
    flex-direction: column;

    flex: 1;

    background-color: var(--fg-color);
    border: solid;
    border-color: var(--border-color);
    border-radius: 5px;
    border-width: 1px;
    padding: 1vw;
    color: var(--text-color);
  }

  #control-container {
    display: flex;
    flex-direction: column;

    flex: 2;
    box-sizing: border-box;
    max-height: 112px;
    min-height: 112px;
    background-color: var(--fg-color);
    border: solid;
    border-color: var(--border-color);
    border-radius: 5px;
    border-width: 1px;
    padding: 1vw;
    color: var(--text-color);
  }

  #controls {
    display: flex;
    flex-direction: row;

    gap: 1vh;
  }
  #controls p {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: 10px;
  }
  button {
    background-color: var(--button-color);
    color: var(--text-color);
    border: solid;
    border-radius: 5px;
    border-width: 1px;
    border-color: var(--border-color);

    transition: 0.2s;
  }

  button:active {
    color: var(--button-color);
    background-color: var(--border-color);
  }

  #check-boxes {
    background-color: var(--button-color);

    display: flex;
    flex-direction: row;
    gap: 1vh;
    padding: 1vw;
    gap: 5px;

    margin: 1vw;

    border-radius: 5px;
  }

  #speed-slider {
    flex: 1;
    min-width: 0;
  }
</style>
