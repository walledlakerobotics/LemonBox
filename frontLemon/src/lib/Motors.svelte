<script lang="ts">
    type Motor = {
        id: number;
        speed: number;
        amps: number;
        voltage: number;

        inverted: boolean;
        brushless: boolean;
        disabled: boolean;

        type: string;
        faults: string;
        stickyFaults: string;

        tile: HTMLElement;
    };
</script>

<div id="tile-grid">
    <p>hello there ballers</p>
</div>
