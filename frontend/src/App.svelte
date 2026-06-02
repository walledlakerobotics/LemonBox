<script lang="ts">
    import Motors from "./lib/Motors.svelte";
    import Tab from "./lib/Tab.svelte";
    import type { TabData } from "./lib/tabdata";

    let tabs: TabData[] = $state([]);
    let currentTabuuid: string = $state("");

    function addTab(): string {
        const tab: TabData = {
            uuid: crypto.randomUUID(),
            title: "ah",
            onOpen: () => currentTabuuid == tab.uuid,
            onClose: () => {},
        };

        tabs.push(tab);
        return tab.uuid;
    }

    currentTabuuid = addTab();
</script>

<div class="tabs">
    {#each tabs as data}
        <Tab tabData={data} />
    {/each}
</div>

<div id="tabs-utils">
    <button id="add" onclick={() => addTab()}>add</button>
</div>

<div id="display-container">
    {#if tabs.find((tab) => tab.uuid === currentTabuuid)}
        <Motors />
        <!-- need to load other content -->
    {/if}
</div>
