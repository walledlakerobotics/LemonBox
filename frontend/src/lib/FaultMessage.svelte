<script lang="ts">
    let { fault }: { fault: string } = $props();
</script>

<div id="fault">
    <p>{fault}</p>
</div>

<style>
    #fault {
        padding-bottom: 1vh;
        padding-top: 1vh;
        padding-left: 1vw;
        padding-right: 1vw;

        background-color: var(--warning-bg);
        color: var(--warning-text);

        border: solid;
        border-width: 1px;
        border-radius: 5px;
        border-color: var(--warning-border);
    }
</style>
