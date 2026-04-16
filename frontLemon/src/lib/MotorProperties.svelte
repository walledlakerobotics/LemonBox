<script lang="ts">
    import { Motor } from "$lib";

    // import { getMotorTextDisplay, type Motor } from "$lib";

    // const motorName = document.getElementById("motor-name");
    // const motorId = document.getElementById("motor-id");
    // const motorSpeed = document.getElementById("motor-speed");

    // const speedSlider = document.getElementById(
    //     "speed-slider",
    // ) as HTMLInputElement | null;
    // const invertedCheckBox = document.getElementById(
    //     "inverted-checkbox",
    // ) as HTMLInputElement | null;
    // const backButton = document.getElementById("back-button");

    // const clearFaultsButton = document.getElementById(
    //     "clear-sticky-faults-button",
    // );

    // export function loadProperties(motor: Motor) {
    //     motorName && (motorName.textContent = getMotorTextDisplay(motor));
    //     motorId && (motorId.textContent = motor.id.toString());
    //     motorSpeed && (motorSpeed.textContent = motor.speed.toString());

    //     speedSlider?.addEventListener("change", () =>
    //         setMotorSpeed(motor, parseFloat(speedSlider.value)),
    //     );

    //     speedSlider &&
    //         invertedCheckBox?.addEventListener("change", () =>
    //             setMotorSpeed(motor, parseFloat(speedSlider.value)),
    //         );

    //     clearFaultsButton?.addEventListener("click", () => {});

    //     backButton?.addEventListener("click", () => {
    //         // need to make tabs to work in order to make this work
    //     });
    // }

    // function setMotorSpeed(motor: Motor, speed: number) {}

    let {
        motor,
    }: {
        motor: Motor;
    } = $props();

    let speed = $state(0);
</script>

<div id="motor-propertie-container">
    <div id="display-container"></div>
    <div id="faults-container">
        <div id="faults"></div>
        <div id="sticky-faults"></div>
        <button id="clear-sticky-faults-button">clear</button>
    </div>
    <div id="addon-properties-container">
        <select name="motor-type" id="motor-type">
            <option value="brushed">brushed</option>
            <option value="brushless"></option>
        </select>
    </div>

    <div id="properties-container">
        <h1 id="motor-name">motor name</h1>
        <h2 id="motor-id">motor id</h2>
        <h3 id="motor-speed">motor speed</h3>

        <input
            id="speed-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            bind:value={speed}
            onchange={() => {
                motor.setSpeed(speed);
            }}
        />

        <input id="inverted-checkbox" type="checkbox" />

        <button id="back-button">Back</button>
    </div>
</div>
