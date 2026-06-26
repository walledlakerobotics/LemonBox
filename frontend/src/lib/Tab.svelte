<script lang="ts">
    import type { TabData } from "./tabdata";

    let { tabData }: { tabData: TabData } = $props();
</script>

<div id="tab">
    <button id="tab-button" onclick={tabData.onOpen}>
        {tabData.title}
    </button>

    <button id="remove-button" onclick={tabData.onClose} aria-label="Close tab">
        ×
    </button>
</div>

<style>
    #tab {
        display: flex;
        flex-direction: row;
        color: var(--border-color);

        background-color: var(--button-color);
        border: solid;
        border-color: var(--border-color);
        border-width: 1px;
        border-radius: 5px;
        padding: 5px;

        gap: 1vw;

        transition: 0.2s;
    }

    #tab:active {
        color: var(--button-color);
        background-color: var(--border-color);
    }

    #remove-button {
        transition: 0.2s;
        background-color: rgba(0, 0, 0, 0);
    }
    #remove-button:active {
        color: white;
        background-color: rgb(202, 0, 67);
        border-radius: 5px;
    }

    button {
        color: var(--text-color);
        border: none;
        background-color: #00000000;
    }
</style>
