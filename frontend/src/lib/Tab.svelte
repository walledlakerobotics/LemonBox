<script lang="ts">
    import type { TabData } from "./tabdata";

    let { tabData }: { tabData: TabData } = $props();
</script>

<div id="tab">
    <button id="tab-button" onclick={tabData.onOpen}>
        {tabData.title}
    </button>

    <button id="remove-button" onclick={tabData.onClose}> X </button>
</div>

<style>
    #tab {
        display: flex;
        flex-direction: row;

        background-color: var(--button-color);
        border: solid;
        border-color: var(--border-color);
        border-width: 1px;
        padding: 5px;
        border-radius: 5px;

        gap: 2vw;
    }

    button {
        border: none;
    }

    #tab-button {
        background-color: var(--button-color);
        color: var(--text-color);
    }

    #remove-button {
        background-color: rgb(207, 0, 62);
        border-radius: 2px;
    }
</style>
