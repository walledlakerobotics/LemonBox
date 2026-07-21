<script lang="ts">
    import { Motor } from "./motor.svelte";
    import MotorTile from "./MotorTile.svelte";
    import type { TabData } from "./tabData";

    let {
        tabs = $bindable(),
        activeTab = $bindable(),
        motors = $bindable(),
    }: { tabs: TabData[]; activeTab: TabData; motors: Motor[] } = $props();

    // selected motors to filter
    let selectedIds: number[] = $derived(
        tabs
            .map((t) => t.selectedMotor?.id)
            .filter((id): id is number => id !== undefined),
    );

    // gets current motors loaded and filters the selected ones.
    let currentMotors: Motor[] = $derived(
        motors.filter((m) => !selectedIds.includes(m.id)),
    );

    // need to use an effect instead of an interval.

    setInterval(async () => {
        const newMotorLength: number = (await Motor.getUpdatedMotorIDs())
            .length;

        if (motors.length != newMotorLength) updateMotors();
    }, 500);

    async function updateMotors() {
        Motor.refresh();
        motors = await Motor.getMotors();
    }
</script>

<div id="motor-grid">
    {#each currentMotors as motor}
        <MotorTile
            {motor}
            onOpen={() => {
                activeTab.selectedMotor = motor;
                activeTab.title = `Motor: ${motor.id}`;
            }}
        ></MotorTile>
    {/each}
</div>

<style>
    #motor-grid {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 5px;
        flex-grow: 1;
        width: 100%;
        padding: 5px;

        overflow-x: scroll;
        overflow-y: hidden;
        scrollbar-width: none;
    }
</style>
