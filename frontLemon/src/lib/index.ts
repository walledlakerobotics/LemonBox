import { NetworkTables } from "ntcore-ts-client";
import type { Component } from "svelte";

export type Tab = {
    id: string,
    page: Component,
    title: string
}

// export class Motor {
//     public speed: number = 0;
//     public amps: number = 0;
//     public voltage: number = 0;

//     public inverted: boolean = false;
//     public brushless: boolean = false;
//     public disabled: boolean = true;

//     public type: string = "";
//     public faults: string = "";
//     public stickyFaults: string = "";





//     constructor(public readonly id: number,) { }

//     public setSpeed(speed: number) {
//     }
// };

export class Motor {

    public speed: number = 0;
    public amps: number = 0;
    public voltage: number = 0;

    public inverted: boolean = false;
    public brushless: boolean = false;
    public disabled: boolean = true;

    public type: string = "";
    public faults: string = "";
    public stickyFaults: string = "";


    constructor(public readonly id: number, public readonly table: NetworkTables) { }

    public setSpeed(speed: number) {
    }
};


/**
     * returns the displayed motor type.
     * @param motor the motor.
     * @returns string
     */
export function getMotorTextDisplay(motor: Motor): any {
    switch (motor.type) {
        case "sparkmax":
            return "SPARK MAX";
        case "talonfx":
            return "TalonFX";
        default:
            return "Unknown";
    }
}

/**
   * returns the image that corresponds to the motor being detected.
   * @param motor the motor.
   * @returns image path.
   */
export function getMotorImage(motor: Motor): any {
    switch (motor.type) {
        case "sparkmax":
            return "imgs/sparkmax.png";
        case "talonfx":
            return "imgs/krakenX60.png";
        default:
            return "imgs/placeHolder.png";
    }
}


export const networkTable: NetworkTables = NetworkTables.getInstanceByTeam(308);

export function getMotors(): Motor[] {

    const motors: Motor[] = [];

    return motors;

}