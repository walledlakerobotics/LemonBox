<script lang="ts">
    import type { Motor } from "./motor";

    let { motor, onClose }: { motor: Motor; onClose: () => void } = $props();

    let amps = $derived(motor.amps);
    let voltage = $derived(motor.voltage);
</script>

<div id="dashboard">
    <div id="display-container">
        <img src={motor.motorImage} alt="" />

        <div id="properties-container">
            <h1>{motor.id}</h1>
            <h2>{motor.displayName}</h2>
        </div>
    </div>

    <div id="electrical-panel">
        <h2>{amps}</h2>
        <h2>{voltage}</h2>
    </div>

    <div id="faults"></div>
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
        type="checkbox"
        bind:checked={motor.brushless}
    />
    <input
        id="disabled-checkbox"
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
</style>
