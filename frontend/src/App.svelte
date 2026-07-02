<script lang="ts">
  import { Motor } from "./lib/motor.svelte";
  import MotorProperties from "./lib/MotorProperties.svelte";
  import MotorTile from "./lib/MotorTile.svelte";
  import Tab from "./lib/Tab.svelte";
  import type { TabData } from "./lib/tabdata.svelte";
  import Warning from "./lib/Warning.svelte";

  let tabs: TabData[] = $state([]);
  let activeTab: TabData = $derived(tabs[0]);
  let currentMotors: Promise<Motor[]> = $state(Motor.getMotors());

  let isTableConnected: boolean = $state(false);

  setInterval(async () => {
    const res = await fetch("/api/connected");
    const data = await res.json();

    isTableConnected = data;
  }, 300);

  $effect(() => {
    tabs.forEach((t) => (t.selected = false));
    activeTab.selected = true;
  });

  $effect(() => {
    currentMotors = Motor.getMotors();
  });

  addTab();

  function addTab() {
    if (tabs.length >= 6) return;

    const tab: TabData = {
      uuid: crypto.randomUUID(),
      title: "Motors",
      selected: false,
      selectedMotor: null,
      onOpen: () => {
        activeTab = tabs.find((t) => t.uuid == tab.uuid) ?? activeTab;
      },
      onClose: () => {
        if (tab.selectedMotor != null) tab.selectedMotor.disabled = true;
        removeTab(tabs.findIndex((t) => t.uuid == tab.uuid));
      },
    };

    tabs.push(tab);
  }

  function removeTab(index: number) {
    if (tabs.length <= 1) return;
    tabs.splice(index, 1);
  }
</script>

{#if !isTableConnected}
  <Warning message="Network Tables are Disconnected!"></Warning>
{/if}

<div id="tabs-container">
  <!-- creates tabs -->
  <div class="tabs">
    {#each tabs as data}
      <Tab tabData={data} />
    {/each}

    <button id="add-button" onclick={addTab}>+</button>
  </div>
</div>

{#snippet motorProperties(m: Motor)}
  <MotorProperties
    motor={m}
    onClose={() => {
      activeTab.selectedMotor = null;
    }}
  ></MotorProperties>
{/snippet}

{#snippet Motors()}
  <div id="motor-grid">
    {#await currentMotors then motors}
      <!-- need to check if this filter algorithm work UwU -->
      {#each motors as motor}
        <MotorTile
          {motor}
          onOpen={() => {
            activeTab.selectedMotor = motor;
          }}
        ></MotorTile>
      {/each}
    {/await}
  </div>
{/snippet}

<div id="content">
  {#if activeTab.selectedMotor != null}
    {@render motorProperties(activeTab.selectedMotor)}
  {/if}

  {#if activeTab.selectedMotor == null}
    {@render Motors()}
  {/if}
</div>

<style>
  .tabs {
    background-color: var(--fg-color);

    display: flex;
    flex-direction: row;
    gap: 5px;

    padding: 5px 10px;

    overflow-x: scroll;
    overflow-y: hidden;
    height: 30px;

    scrollbar-width: 1px;
    scrollbar-color: var(--border-color);
    scroll-behavior: smooth;
    scrollbar-width: none;
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
    height: 100%;
    aspect-ratio: 1;
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

  #motor-grid {
    gap: 5px;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;

    scrollbar-width: none;
  }

  #content {
    display: flex;
    flex-direction: column;

    transition: 0.2s;
  }
</style>
