<script lang="ts">
  let { message }: { message: string } = $props();
</script>

<div id="warning">
  <p>{message}</p>
</div>

<style>
  #warning {
    color: var(--warning-text);
    background-color: var(--warning-bg);
    border: solid;
    border-width: 1px;
    border-color: var(--warning-border);

    position: relative;
    text-align: center;
  }
  #warning p {
    font-size: 1.5dvh;
    margin: 10px;
  }
</style>
