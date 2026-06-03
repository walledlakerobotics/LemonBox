import type { Component } from "svelte";

export type TabData = {
    uuid: string;
    title: string;
    component: Component;
    onOpen: () => void;
    onClose: () => void;
};