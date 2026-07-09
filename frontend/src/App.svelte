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
  let selectedIds: number[] = $state([]);

  setInterval(async () => {
    const res = await fetch("/api/connected");
    const data = await res.json();

    isTableConnected = data;

    const enableRes = await fetch("/api/enabled");
    const enableData = await enableRes.json();

    if (isTableConnected && !enableData) {
      fetch("/api/enabled", {
        method: "POST",
      });
    }
  }, 300);

  $effect(() => {
    // clears the effect and then applies the effect to the selected tab.
    tabs.forEach((t) => (t.selected = false));
    activeTab.selected = true;
  });

  $effect(() => {
    // gets all the tabs selected motor ids, and filters the undefined ones.
    selectedIds = tabs
      .map((t) => t.selectedMotor?.id)
      .filter((id): id is number => id !== undefined);

    // updates the current motors and filters them by which motors are selected.
    currentMotors = Motor.getMotors().then((motors) =>
      motors.filter((m) => !selectedIds.includes(m.id)),
    );
  });

  addTab();

  function addTab(): void {
    const tab: TabData = {
      uuid: crypto.randomUUID(),
      title: "Motors",
      selected: false,
      selectedMotor: null,
      onOpen: () =>
        (activeTab = tabs.find((t) => t.uuid == tab.uuid) ?? activeTab),
      onClose: () => removeTab(tabs.findIndex((t) => t.uuid == tab.uuid)),
    };

    tabs.push(tab);
  }

  function removeTab(index: number): void {
    const tab = tabs[index];

    // cannot have zero tabs open.
    if (tabs.length <= 1) return;

    if (tab.selectedMotor != null) {
      tab.selectedMotor.disabled = true;
      tab.selectedMotor = null;
    }

    // if current tab is closed while being in it, it will go to the one backward.
    if (activeTab.uuid == tab.uuid) activeTab = tabs[index - 1];

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
      if (activeTab.selectedMotor != null)
        activeTab.selectedMotor.disabled = true;

      activeTab.selectedMotor = null;

      activeTab.title = "Motors";
    }}
  ></MotorProperties>
{/snippet}

{#snippet Motors()}
  <div id="motor-grid">
    {#await currentMotors then motors}
      {#each motors as motor}
        <MotorTile
          {motor}
          onOpen={() => {
            activeTab.selectedMotor = motor;
            activeTab.title = `Motor: ${motor.id}`;
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

    padding: 5px 5px 5px 10px;

    overflow-x: scroll;
    overflow-y: hidden;
    height: 30px;

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
    height: 30px;
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

  #motor-grid {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 5px;
    flex-grow: 1;
    width: 100%;
    padding: 5px;

    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: none;
  }

  #content {
    padding: 5px;
    gap: 1vw;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
</style>
