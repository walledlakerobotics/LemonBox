<script lang="ts">
    import Motors from "./lib/Motors.svelte";
    import Tab from "./lib/Tab.svelte";
    import type { TabData } from "./lib/tabdata";

    let tabs: TabData[] = $state([]);
    let currentTabuuid: string = $state("");

    function addTab(): string {
        const tab: TabData = {
            uuid: crypto.randomUUID(),
            title: "Motors",
            currentComponent: Motors,
            onOpen: () => currentTabuuid == tab.uuid,
            onClose: () =>
                removeTab(tabs.findIndex((t) => t.uuid == tab.uuid).valueOf()),
        };

        tabs.push(tab);
        return tab.uuid;
    }

    function removeTab(index: number) {
        tabs.splice(index, 1);
    }

    currentTabuuid = addTab();
</script>

<div id="tabs-container">
    <div class="tabs">
        {#each tabs as data}
            <Tab tabData={data} />
        {/each}
    </div>

    <div id="tabs-utils">
        <button id="add" onclick={() => addTab()}>add</button>
    </div>
</div>

<div id="display-container">
    {#if tabs.find((tab) => tab.uuid === currentTabuuid)}
        {tabs.find((tab) => tab.uuid === currentTabuuid)?.currentComponent}
    {/if}
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
    }

    #tabs-container {
    }
</style>
