<script lang="ts">
  import ActionWarning from "./lib/ActionWarning.svelte";
  import {
    getEnabled,
    getNetworkConnected,
    setEnabled,
  } from "./lib/driverStation";
  import { Motor } from "./lib/motor.svelte";
  import MotorProperties from "./lib/MotorProperties.svelte";
  import Motors from "./lib/Motors.svelte";
  import type { TabData } from "./lib/tabData";
  import TabsBar from "./lib/TabsBar.svelte";

  import Warning from "./lib/Warning.svelte";

  let tabs: TabData[] = $state([]);
  let activeTab: TabData = $derived(tabs[0]);

  let motors: Motor[] = $state([]);

  let connected: boolean = $state(false);
  let enabled: boolean = $state(false);

  setInterval(async () => {
    connected = await getNetworkConnected();
    enabled = await getEnabled();

    if (motors.length != (await Motor.getUpdatedMotorIDs()).length) {
      Motor.refresh();
      motors = await Motor.getMotors();
    }

    const motor: Motor | null = activeTab.selectedMotor;
    if (motor != null) motor.updateData();
  }, 300);
</script>

<!-- handling warnings ---------------------------- -->

{#if !connected}
  <Warning message="Network Tables are Disconnected!" />
{/if}

{#if !enabled}
  <ActionWarning
    message="OpenDS is not Enabled, please press the warning to enable DS!"
    onEnable={() => {
      setEnabled(true);
    }}
  />
{/if}

<TabsBar bind:tabs bind:activeTab />

<div id="content">
  {#if activeTab.selectedMotor != null}
    {@render motorProperties(activeTab.selectedMotor)}
  {/if}

  {#if activeTab.selectedMotor == null}
    {@render motorGrid(activeTab, tabs)}
  {/if}
</div>

{#snippet motorProperties(motor: Motor)}
  <MotorProperties
    {motor}
    onClose={() => {
      activeTab.selectedMotor = null;
      activeTab.title = "Motors";
    }}
  ></MotorProperties>
{/snippet}

{#snippet motorGrid(activeTab: TabData, tabs: TabData[])}
  <Motors {activeTab} {tabs} {motors}></Motors>
{/snippet}

<style>
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
