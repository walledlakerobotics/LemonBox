import type { Component } from "svelte";

export type TabData = {
    uuid: string;
    title: string;
    tabComponent: Component;
    onOpen: () => void;
    onClose: () => void;
};