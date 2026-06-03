import type { Component } from "svelte";

export type TabData = {
    uuid: string;
    title: string;
    currentComponent: Component;
    onOpen: () => void;
    onClose: () => void;
};