<script lang="ts">
    let { fault }: { fault: string } = $props();
</script>

<div id="fault">
    <p>{fault}</p>
</div>

<style>
    #fault {
        display: flex;
        flex-direction: column;

        background-color: var(--warning-bg);
        color: var(--warning-text);

        border: solid;
        border-width: 1px;
        border-radius: 5px;
        border-color: var(--warning-border);
    }
</style>
