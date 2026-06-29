import type { Motor } from "./motor.svelte";

export type TabData = {
    uuid: string;
    title: string;
    selectedMotor: Motor | null;
    selected: boolean;
    onOpen: () => void;
    onClose: () => void;
};