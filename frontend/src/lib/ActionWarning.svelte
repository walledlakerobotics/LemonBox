<script lang="ts">
    let { message, onEnable }: { message: string; onEnable: () => void } =
        $props();
</script>

<button id="warning" onclick={onEnable}>
    <p>{message}</p>
</button>

<style>
    #warning {
        color: var(--warning-text);
        background-color: var(--warning-bg);
        border: solid;
        border-width: 1px;
        border-color: var(--warning-border);

        position: relative;
        text-align: center;

        transition: 0.2s;
    }

    #warning:active {
        background-color: var(--warning-border);
        color: var(--warning-bg);
    }
</style>
