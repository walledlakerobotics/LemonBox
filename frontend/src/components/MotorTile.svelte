<script lang="ts">
    import { Motor } from "./motor";

    let { motor, tileOpen }: { motor: Motor; tileOpen: () => void } = $props();
</script>

<button id="motor-tile" onclick={tileOpen}>
    <img src="${motor.motorImage}" alt="src/assets/imgs/placeHolder.png" />
    <h1>ID: {motor.id}</h1>
    <h2>{motor.displayName}</h2>
</button>

<style>
    #motor-tile {
        background-color: aqua;
    }
</style>
