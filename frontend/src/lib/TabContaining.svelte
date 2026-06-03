<script lang="ts">
    import { onMount } from "svelte";
    import { Motor } from "./motor";
    import MotorProperties from "./MotorProperties.svelte";
    import MotorTile from "./MotorTile.svelte";

    // this will only return the updated array, but it might cause some issues with replicas
    let motors: Motor[] = $state([]);

    // runs when loaded to DOM.
    onMount(async () => {
        motors = await Motor.getMotors();
    });

    let selectedMotor: Motor | null = $state(null);
</script>

{#snippet motorProperties(m: Motor)}
    <MotorProperties
        motor={m}
        onClose={() => {
            selectedMotor == null;
        }}
    ></MotorProperties>
{/snippet}

{#snippet Motors()}
    <div id="motor-grid">
        {#each motors as m}
            <MotorTile motor={m} onOpen={() => {}}></MotorTile>
        {/each}

        <MotorTile motor={new Motor(0)} onOpen={() => (selectedMotor = null)}
        ></MotorTile>
    </div>
{/snippet}

{#if selectedMotor != null}
    {@render motorProperties(selectedMotor)}
{/if}

<!-- if motor equals null -->
{@render Motors()}

<p>{crypto.randomUUID()}</p>

<style>
    #motor-grid {
        gap: 5px;
        display: flex;
        flex-direction: row;

        overflow-x: scroll;

        scrollbar-width: 5px;
    }
</style>
