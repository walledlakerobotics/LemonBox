<script lang="ts">
    import { Motor } from "./motor";
    let {motor, onOpen}: {motor: Motor, onOpen: () => void} = $props(); 
</script>

<button id="motor-tile" onclick={onOpen}>
    <img src="{motor.motorImage}" alt="/imgs/placeholder.png">
    <h1>{motor.type}</h1>
    <h2>{motor.id}</h2>
</button>