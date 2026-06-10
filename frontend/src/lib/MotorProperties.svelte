<script lang="ts">
    import type { Motor } from "./motor";

    let { motor, onClose }: { motor: Motor; onClose: () => void } = $props();

    let speed: number = $state(0);
    let voltage: number = $state(0);
    let amps: number = $state(0);
    let brushless: boolean = $state(false);

    let faults: string = $state("");
    let stickyFaults: string = $state("");
    let displayName: string = $state("unknown");
    let motorImagePath: string = $state("assets/imgs/placeHolder.png");

    $effect(() => {
        async () => {
            motor.speed = speed;
            speed = await motor.speed;
        };
    });

    $effect(() => {
        async () => {
            motor.brushless = brushless;
            brushless = await motor.brushless;
        };
    });

    $effect(() => {
        async () => {};
    });

    $effect(() => {
        async () => {
            voltage = await motor.voltage;
        };
    });

    $effect(() => {
        async () => {
            amps = await motor.amps;
        };
    });

    $effect(() => {
        async () => {
            faults = await motor.faults;
        };
    });

    $effect(() => {
        async () => {
            stickyFaults = await motor.stickyfaults;
        };
    });

    $effect(() => {
        async () => {
            displayName = await motor.displayName();
        };
    });

    $effect(() => {
        async () => {
            motorImagePath = await motor.motorImage();
        };
    });

    $effect(() => {
        async () => {
            stickyFaults = await motor.stickyfaults;
        };
    });
</script>

<div id="display-container">
    <img src={motorImagePath} alt="" />
    <h1>Id: {motor.id}</h1>
    <h2>{displayName}</h2>
</div>

<div id="control-panel">
    <input
        id="speed-slider"
        type="range"
        step="0.01"
        min="-1"
        max="1"
        bind:value={speed}
    />
    <input
        id="brushless-checkbox"
        title="brushless"
        type="checkbox"
        bind:value={brushless}
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
