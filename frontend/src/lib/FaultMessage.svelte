<script lang="ts">
    let { fault }: { fault: string } = $props();
</script>

<div id="fault">
    <p>fault | sticky fault</p>
    <p>{fault}</p>
</div>

<style>
    #fault {
        display: flex;
        flex-direction: column;

        text-align: center;

        background-color: var(--warning-bg);
        color: var(--warning-text);

        border: solid;
        border-width: 1px;
        border-radius: 5px;
        border-color: var(--warning-border);

        position: relative;
    }
</style>
