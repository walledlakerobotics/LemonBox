<script lang="ts">
    import type { TabData } from "./tabdata";

    let { tabData }: { tabData: TabData } = $props();
</script>

<div id="tab">
    <button id={tabData.uuid} onclick={tabData.onOpen}>
        {tabData.title};
    </button>

    <button id="remove-button" onclick={tabData.onClose}> X </button>
</div>

<style>
    #tab {
        background-color: var(--fg-color);
        padding: 1vw;
    }
</style>
