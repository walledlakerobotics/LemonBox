<script lang="ts">
    import { Motor } from "./components/motor";

    let { motor }: { motor: Motor } = $props();
</script>

<div id="motor-dashboard">
    <div id="image-container"></div>

    <div id="faults-container"></div>

    <div id="sticky-faults-container"></div>
</div>

<div id="motor-control-panel">
    <h1>{motor.displayName}</h1>
    <h2>{motor.id}</h2>

    <input type="slider" step="0.01" bind:value={motor.speed} />
    <input type="checkbox" bind:checked={motor.brushless} />

    <button>back</button>
</div>
