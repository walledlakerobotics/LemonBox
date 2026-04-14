import { localhost } from "./app";
import { Motor } from "./motorTileMenu";

const navContainer = document.getElementById("nav-container");
const tabContainer = document.getElementById("tab-container");
const addTabButton = document.getElementById("add-button");

const warningContainer = document.getElementById("warning-container");

export type Tab = {
    target: HTMLDivElement,
}

const tabs: Tab[] = [];

addTabButton?.addEventListener("click", () => {
    createTab();
});

function createTab() {

}

export function loadTab(tab: Tab) {

}


// function createTab() {
//     // Create the div element for the tab
//     const div = document.createElement("div");
//     div.classList.add("tab");

//     // Optional: add some content
//     div.textContent = `Tab ${tabs.length + 1}`;

//     // Create a Motor instance (adjust constructor as needed)
//     const motor = new Motor();

//     // Build the tab object
//     const newTab: tab = {
//         target: div,
//         motor: motor,
//     };

//     // Store it
//     tabs.push(newTab);

//     // Add to DOM (make sure you have a container)
//     document.body.appendChild(div);
// }

setInterval(() => {

    // checking if its connected
    fetch(`${localhost}/tableConnected`)
        .then(res => res.json())
        .then(data => {
            const connected: boolean = data;



        });

}, 200);