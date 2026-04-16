<script lang="ts">
    import type { Tab } from "$lib";

    let {
        tabs,
        currentIndex = $bindable(),
        newTab,
        removeTab,
    }: {
        tabs: Tab[];
        currentIndex: number;
        newTab: () => void;
        removeTab: (tab: Tab) => void;
    } = $props();
</script>

<div class="tab-container">
    {#each tabs as tab, index (tab.id)}
        <div>
            <button
                aria-label={tab.title}
                onclick={() => (currentIndex = index)}
                >{tab.title}
            </button>
            <button
                onclick={() => {
                    removeTab(tab);
                    currentIndex = currentIndex;
                }}
            >
                X
            </button>
        </div>
    {/each}

    <button onclick={() => newTab()}> + </button>
</div>

<div class="page">
    {#each tabs as tab, index}
        {#if currentIndex == index}
            <tab.page />
        {/if}
    {/each}
</div>

<style>
    .tab-container {
        display: flex;
        flex-direction: row;
    }
</style>
