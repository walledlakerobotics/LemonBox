import type { Motor } from "./motor.svelte";

/**
 * Holds the data required to create a tab. 
 */
export type TabData = {
    uuid: string;
    title: string;
    selectedMotor: Motor | null;
    selected: boolean;
    onOpen: () => void;
    onClose: () => void;
}


/**
 * uuid: random id given to the tab. 
 * title: title displayed by the tab.
 * selectedMotor: selected motor possesed by the tab. 
 * selected: is the tab selected -_-.
 * onOpen: calls a function when tab is selected. 
 * onCloes: calls a function when tab is closed.
 */