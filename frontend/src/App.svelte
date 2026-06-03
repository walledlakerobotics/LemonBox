<script lang="ts">
    import Tab from "./lib/Tab.svelte";
    import TabContaining from "./lib/TabContaining.svelte";
    import type { TabData } from "./lib/tabdata";

    let tabs: TabData[] = $state([]);

    addTab();

    let activeTab: TabData = $state(tabs[0]);

    function addTab() {
        const tab: TabData = {
            uuid: crypto.randomUUID(),
            title: "Motors",
            component: TabContaining,
            onOpen: () =>
                (activeTab = tabs.find((t) => t.uuid == tab.uuid) ?? activeTab),
            onClose: () => removeTab(tabs.findIndex((t) => t.uuid == tab.uuid)),
        };

        tabs.push(tab);
    }

    function removeTab(index: number) {
        // prevent removing last tab
        if (tabs.length <= 1) return;

        tabs.splice(index, 1);

        tabs = [...tabs];
    }
</script>

<div id="tabs-container">
    <!-- creates tabs -->
    <div class="tabs">
        {#each tabs as data}
            <Tab tabData={data} />
        {/each}

        <button id="add-button" onclick={() => addTab()}>+</button>
    </div>
</div>

<div id="active-tab">
    <!-- renders active tab content :3-->

    {#each tabs as t}
        {#if t.uuid == activeTab.uuid}
            <t.component />
        {/if}
    {/each}
</div>

<style>
    .tabs {
        background-color: var(--fg-color);

        display: flex;
        flex-direction: row;
        gap: 5px;

        padding: 5px;

        overflow-x: scroll;
        overflow-y: hidden;

        scrollbar-width: 1px;
        scrollbar-color: var(--border-color);
        scroll-behavior: smooth;
    }

    #add-button {
        background-color: var(--button-color);
        border: solid;
        border-radius: 5px;
        border-width: 1px;

        padding-left: 1vw;
        padding-right: 1vw;

        color: var(--text-color);

        border-color: var(--border-color);

        transition: 0.2s;

        position: relative;

        margin-left: auto;
    }

    #add-button:active {
        background-color: var(--border-color);
        color: var(--button-color);
    }

    #tabs-container {
        position: relative;
        margin: 0;
        padding: 0;
    }
</style>
