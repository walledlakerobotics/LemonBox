<script lang="ts">
    import type { Motor } from "./motor";

    let { motor, onClose }: { motor: Motor; onClose: () => void } = $props();

    let amps = $derived(motor.amps);
    let voltage = $derived(motor.voltage);
</script>

<div id="display-container">
    <img src={motor.motorImage} alt="" />

    <h1>Id: {motor.id}</h1>
    <h2>{motor.displayName}</h2>
</div>

<div id="electrical-panel">
    <h2>Amps: {amps}</h2>
    <h2>Voltage: {voltage}</h2>
</div>

<div id="control-panel">
    <input
        id="speed-slider"
        type="range"
        step="0.01"
        min="-1"
        max="1"
        bind:value={motor.speed}
    />
    <input
        id="brushless-checkbox"
        title="brushless"
        type="checkbox"
        bind:checked={motor.brushless}
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
