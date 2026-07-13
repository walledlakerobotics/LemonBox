<script lang="ts">
    import type { TabData } from "./tabdata.svelte";

    let { tabData }: { tabData: TabData } = $props();
</script>

<div id="tab" class:selected={tabData.selected}>
    <button id="tab-button" onclick={tabData.onOpen}>
        {tabData.title}
    </button>

    <button
        id="remove-button"
        onclick={() => {
            if (tabData.selectedMotor != null) {
                tabData.selectedMotor.disabled = true;
            }

            tabData.onClose();
        }}
        aria-label="Close tab"
    >
        ×
    </button>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        color: var(--border-color);

        font-size: 1em;

        background-color: var(--button-color);
        border: solid;
        border-color: var(--border-color);
        border-width: 1px;
        border-radius: 5px;
        padding: 5px;

        gap: 1vw;

        transition: 0.2s;
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

    .selected {
        color: var(--button-color);
        background-color: var(--border-color);
        border-color: var(--border-color);

        button {
            color: var(--button-color);
        }
    }
</style>
