<script lang="ts">
  import ActionWarning from "./lib/ActionWarning.svelte";
  import { Motor } from "./lib/motor.svelte";
  import MotorProperties from "./lib/MotorProperties.svelte";
  import MotorTile from "./lib/MotorTile.svelte";
  import Tab from "./lib/Tab.svelte";
  import type { TabData } from "./lib/tabdata.svelte";
  import Warning from "./lib/Warning.svelte";

  const tabLimit: number = 12;

  let tabs: TabData[] = $state([]);
  let activeTab: TabData = $derived(tabs[0]);

  let selectedIds: number[] = $derived(
    tabs
      .map((t) => t.selectedMotor?.id)
      .filter((id): id is number => id !== undefined),
  );

  let motors: Motor[] = $state([]);
  let currentMotors: Motor[] = $derived(
    motors.filter((m) => !selectedIds.includes(m.id)),
  );

  let ntConnected: boolean = $state(false);
  let dsEnabled: boolean = $state(false);

  $effect(() => {
    // clears the effect and then applies the effect to the selected tab.
    tabs.forEach((t) => {
      if (t.selectedMotor != null) t.selectedMotor.disabled = true;
      t.selected = false;
    });

    activeTab.selected = true;
  });

  $effect(() => {
    const ms: Promise<Motor[]> = Motor.getMotors();

    const update: () => Promise<void> = async () => {
      motors = await ms;
      dsEnabled = await getEnabled();
      ntConnected = await getNetworkConnected();
    };

    update();
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

    tabs.splice(index, 1);
  }

  async function getNetworkConnected(): Promise<boolean> {
    const res = await fetch("/api/");
    const data = await res.json();

    return data.connected;
  }

  async function getEnabled(): Promise<boolean> {
    const res = await fetch("/api/");
    const data = await res.json();

    return data.enabled;
  }

  function setEnabled(enabled: boolean): void {
    fetch("/api/", {
      method: "POST",
      body: JSON.stringify({
        enabled: enabled,
      }),
    });
  }
</script>

<!-- handling warnings ---------------------------- -->

{#if !ntConnected}
  <Warning message="Network Tables are Disconnected!" />
{/if}

{#if !dsEnabled}
  <ActionWarning
    message="OpenDS is not Enabled, please press the warning to enable DS!"
    onEnable={() => setEnabled(true)}
  />
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
