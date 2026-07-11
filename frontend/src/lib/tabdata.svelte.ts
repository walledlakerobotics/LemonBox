import type { Motor } from "./motor.svelte";
export class TabData {
    public readonly uuid: string = crypto.randomUUID();
    public title: string = "Motors";
    public selectedMotor: Motor | null = null;
    public selected: boolean = false;

    constructor(
        public readonly onOpen: () => void,
        public readonly onClose: () => void) {
    }


}


/**
 * uuid: random id given to the tab. 
 * title: title displayed by the tab.
 * selectedMotor: selected motor possesed by the tab. 
 * selected: is the tab selected -_-.
 * onOpen: calls a function when tab is selected. 
 * onCloes: calls a function when tab is closed.
 */