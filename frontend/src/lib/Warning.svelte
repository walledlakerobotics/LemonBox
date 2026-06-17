<script lang="ts">
    let visable: boolean = $props();
</script>

<button id="warning" onclick={() => (visable = false)}>
    <p>Warning the Tables are Disconnected!</p>
</button>

<style>
    #warning {
        color: var(--warning-text);
        background-color: var(--warning-bg);
        border: solid;
        border-width: 1px;
        border-color: var(--warning-border);
        border-radius: 5px;
    }
</style>
