<script lang="ts">
    import { onMount } from "svelte";
    import { Motor } from "./motor";
    import MotorTile from "./MotorTile.svelte";

    // this will only return the updated array, but it might cause some issues with replicas
    let motors: Motor[] = $state([]);

    // runs when loaded to DOM.
    onMount(async () => {
        motors = await Motor.getMotors();
    });
</script>

<div id="motor-grid">
    {#each motors as m}
        <MotorTile motor={m} onOpen={() => {}}></MotorTile>
    {/each}
</div>

<style>
    #motor-grid {
        gap: 5px;
        display: flex;
        flex-direction: row;

        overflow-x: scroll;

        scrollbar-width: 5px;
    }
</style>
