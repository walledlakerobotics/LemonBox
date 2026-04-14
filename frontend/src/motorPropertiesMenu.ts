import { Tab } from ".";
import { localhost } from "./app";
import { getMotorTextDisplay, Motor } from "./motorTileMenu";

const motorName = document.getElementById("motor-name");
const motorId = document.getElementById("motor-id");
const motorSpeed = document.getElementById("motor-speed");

const speedSlider = document.getElementById("speed-slider") as HTMLInputElement | null;
const invertedCheckBox = document.getElementById("inverted-checkbox") as HTMLInputElement | null;;
const backButton = document.getElementById("back-button");

const clearFaultsButton = document.getElementById("clear-sticky-faults-button");

export function loadProperties(motor: Motor, currentTab: Tab) {

    motorName && (motorName.textContent = getMotorTextDisplay(motor));
    motorId && (motorId.textContent = motor.id.toString());
    motorSpeed && (motorSpeed.textContent = motor.speed.toString());

    speedSlider?.addEventListener("change", () => setMotorSpeed(motor, parseFloat(speedSlider.value)));

    speedSlider && invertedCheckBox?.addEventListener("change", () => setMotorSpeed(motor, parseFloat(speedSlider.value)));

    clearFaultsButton?.addEventListener("click", () => {

    });

    backButton?.addEventListener("click", () => {
        // need to make tabs to work in order to make this work
    });
}

function setMotorSpeed(motor: Motor, speed: number) {
    if (!motor.disabled) {
        fetch(`${localhost}/${motor.id}?v=${speed}`, {
            method: "POST",
        });

    } else {
        fetch(`${localhost}/${motor.id}?v=${0}`, {
            method: "POST",
        });
    }
}