<script lang="ts">
  import { Motor } from "./lib/motor.svelte";
  import MotorProperties from "./lib/MotorProperties.svelte";
  import MotorTile from "./lib/MotorTile.svelte";
  import Tab from "./lib/Tab.svelte";
  import type { TabData } from "./lib/tabdata";
  import TestMotor from "./lib/TestMotor.svelte";
  import Warning from "./lib/Warning.svelte";

  let tabs: TabData[] = $state([]);
  let activeTab: TabData = $derived(tabs[0]);

  // this will only return the updated array, but it might cause some issues with replicas
  let selectedMotorUuids: string[] = $state([]);

  addTab();

  function addTab() {
    const tab: TabData = {
      uuid: crypto.randomUUID(),
      title: "Motors",
      selectedMotor: null,
      onOpen: () =>
        (activeTab = tabs.find((t) => t.uuid == tab.uuid) ?? activeTab),
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

  async function isTableConnected(): Promise<boolean> {
    const res = await fetch("/api/connected");
    const data = await res.json();

    return data;
  }

  let testMotor = new Motor("0");
</script>

{#await isTableConnected() then tableConnected}
  {#if !tableConnected}
    <Warning></Warning>
  {/if}
{/await}

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
      selectedMotorUuids.filter((id) => m.uuid == id);
    }}
  ></MotorProperties>
{/snippet}

{#snippet Motors()}
  <div id="motor-grid">
    {#await Motor.getMotors() then motors}
      {#each motors as motor}
        <MotorTile
          {motor}
          onOpen={() => {
            activeTab.selectedMotor = motor;
            selectedMotorUuids.push(motor.uuid);
          }}
        ></MotorTile>
      {/each}
    {/await}

    <TestMotor
      onOpen={() => {
        activeTab.selectedMotor = testMotor;
        selectedMotorUuids.push(testMotor.uuid);
      }}
      motor={testMotor}
    ></TestMotor>
  </div>
{/snippet}

{#if activeTab.selectedMotor != null}
  <!--{(activeTab.title = `MotorId:${activeTab.selectedMotor.id}`)}-->
  {@render motorProperties(activeTab.selectedMotor)}
{/if}

{#if activeTab.selectedMotor == null}
  {@render Motors()}
{/if}

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

    scrollbar-width: 5px;
    padding: 0 10px 0 10px;
  }
</style>
