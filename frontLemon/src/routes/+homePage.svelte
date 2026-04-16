<script lang="ts">
    import type { Tab } from "$lib";
    import Motors from "$lib/Motors.svelte";
    import Tabs from "$lib/Tabs.svelte";

    const tabs: Tab[] = $state([]);

    let currentIndex = $state(0);

    function newTab() {
        tabs.push({
            id: crypto.randomUUID(),
            page: Motors,
            title: "",
        });
    }

    function removeTab(tab: Tab) {
        tabs.splice(tabs.map((t) => t.id).indexOf(tab.id), 1);
    }

    newTab();
</script>

<main>
    <Tabs {tabs} bind:currentIndex {newTab} {removeTab} />
</main>
