import type { Motor } from "./motor";

export type TabData = {
    uuid: string;
    title: string;
    selectedMotor: Motor | null;
    onOpen: () => void;
    onClose: () => void;
};