<script lang="ts">
    import type { Motor } from "./motor.svelte";
    import Tab from "./Tab.svelte";
    import type { TabData } from "./tabData";

    let {
        tabs = $bindable(),
        activeTab = $bindable(),
    }: { tabs: TabData[]; activeTab: TabData } = $props();

    const tabLimit: number = 12;

    $effect(() => {
        // clears the effect and then applies the effect to the selected tab.
        tabs.forEach((t) => {
            if (t.selectedMotor != null) t.selectedMotor.disabled = true;
            t.selected = false;
        });

        activeTab.selected = true;
    });

    addTab();

    function addTab(): void {
        if (tabLimit <= tabs.length) return;
        const tab: TabData = {
            uuid: crypto.randomUUID(),
            title: "Motors",
            selectedMotor: null,
            selected: false,
            onOpen: () => {
                activeTab = tabs.find((t) => t.uuid == tab.uuid) ?? activeTab;
            },
            onClose: () => removeTab(tabs.findIndex((t) => t.uuid == tab.uuid)),
        };

        tabs.push(tab);
    }

    function removeTab(index: number): void {
        // cannot have zero tabs open.
        if (tabs.length <= 1) return;

        if (activeTab === tabs[index] && index > 0) {
            activeTab = tabs[index - 1];
        }

        tabs.splice(index, 1);
    }
</script>

<div id="tabs-container">
    <!-- creates tabs -->
    <div class="tabs">
        {#each tabs as data}
            <Tab tabData={data} />
        {/each}

        <button id="add-button" onclick={addTab}>+</button>
    </div>
</div>

<style>
    .tabs {
        background-color: var(--fg-color);

        display: flex;
        flex-direction: row;
        gap: 5px;

        padding: 5px 5px 5px 10px;

        overflow-x: scroll;
        overflow-y: hidden;
        height: 40px;

        scrollbar-width: thin;
        scrollbar-color: var(--border-color) transparent;
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

        margin-left: auto;
        height: 100%;
        aspect-ratio: 1;

        position: sticky;
        z-index: 100;
        right: 0;
        box-shadow: 0px 0px 5px 10px var(--fg-color);
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
