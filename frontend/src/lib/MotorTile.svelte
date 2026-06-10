<script lang="ts">
    import { Motor } from "./motor";
    let { motor, onOpen }: { motor: Motor; onOpen: () => void } = $props();
    let displayName: string = $state("unknown");
    let motorImagePath: string = $state("assets/imgs/placeHolder.png");

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
</script>

<button id="motor-tile" onclick={onOpen}>
    <img src={motorImagePath} alt="/imgs/placeholder.png" />
    <h1>Type: {displayName}</h1>
    <h2>Id: {motor.id}</h2>
</button>

<style>
    #motor-tile {
        background-color: var(--fg-color);
        color: var(--text-color);

        border: solid;
        border-width: 1px;
        border-radius: 5px;

        transition: 0.2s;

        padding: 5px;

        display: flex;
        flex-direction: column;

        height: 100%;

        animation: tile-fade-in ease both;
        animation-timeline: view(inline);
        animation-range: entry 0% entry 60%;

        font-size: clamp(0.75rem, 2.5dvh, 1.5rem);

        img {
            display: block;
            margin-top: auto;

            max-width: 100%;
            object-fit: cover;
            aspect-ratio: 1/1;
        }
    }

    @keyframes tile-fade-in {
        from {
            opacity: 0;
            transform: scale(0.8);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    #motor-tile:active {
        background-color: var(--border-color);
        color: var(--bg-color);
    }
</style>
