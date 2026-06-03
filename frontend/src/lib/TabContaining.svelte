<script lang="ts">
    import { onMount } from "svelte";
    import { Motor } from "./motor";
    import MotorProperties from "./MotorProperties.svelte";
    import MotorTile from "./MotorTile.svelte";

    let id: string = $state(crypto.randomUUID());

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
            selectedMotor = null;
        }}
    ></MotorProperties>
{/snippet}

{#snippet Motors()}
    <div id="motor-grid">
        {#each motors as m}
            <MotorTile motor={m} onOpen={() => {}}></MotorTile>
        {/each}

        <MotorTile
            motor={new Motor(0)}
            onOpen={() => (selectedMotor = new Motor(0))}
        ></MotorTile>
    </div>
{/snippet}

{#if selectedMotor != null}
    {console.log("rendering motor properties")}
    {@render motorProperties(selectedMotor)}
{/if}

{#if selectedMotor == null}
    {console.log("rendering motors")}
    {@render Motors()}
{/if}

<!-- if motor equals null -->

<style>
    #motor-grid {
        gap: 5px;
        display: flex;
        flex-direction: row;

        overflow-x: scroll;

        scrollbar-width: 5px;
    }
</style>
