<script lang="ts">
  let { message, onEnable }: { message: string; onEnable: () => void } =
    $props();
</script>

<button id="warning" onclick={onEnable}>
  <p>{message}</p>
</button>

<style>
  #warning {
    display: flex;
    flex-direction: column;

    text-align: center;

    background-color: var(--warning-bg);
    color: var(--warning-text);

    border: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: var(--warning-border);

    position: relative;
  }
  #warning p {
    font-size: 1.5dvh;
    margin: 10px;
  }

  #warning:active {
    background-color: var(--warning-border);
    color: var(--warning-bg);
  }
</style>
