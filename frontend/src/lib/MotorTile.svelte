<script lang="ts">
    import { Motor } from "./motor";
    let { motor, onOpen }: { motor: Motor; onOpen: () => void } = $props();
</script>

<button id="motor-tile" onclick={onOpen}>
    <img src={motor.motorImage} alt="/imgs/placeholder.png" />
    <h1>{motor.type}</h1>
    <h2>{motor.id}</h2>
</button>

<style>
    #motor-tile {
        background-color: var(--fg-color);
        color: var(--text-color);
        padding: 10vh;

        border: solid;
        border-width: 1px;
        border-radius: 5px;

        transition: 0.2s;
    }

    #motor-tile:hover {
        background-color: var(--border-color);
        color: var(--bg-color);
    }
</style>
