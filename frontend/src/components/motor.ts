export class Motor {

    private _disabled: boolean = true;

    constructor(public readonly id: number) { }

    public get speed(): number {
        fetch(`/motors/${this.id}/speed`).then(res => {
            return res.json()
        });

        return 0;
    }

    public set speed(speed: number) {
        if (this.disabled) {
            fetch(`/motors/${this.id}/speed=${0}`, {
                method: "POST",
            });
        } else {
            fetch(`/motors/${this.id}/speed=${speed}`, {
                method: "POST",
            });
        }
    }

    public get brushless(): boolean {
        fetch(`/motors/${this.id}/brushless`).then(res => {
            return res.json();
        });

        return false;
    }

    public set brushless(brushless: boolean) {
        fetch(`/api/motors/${this.id}/brushless=${brushless}`, {
            method: "POST",
        });
    }

    public get amps(): number {
        fetch(`/api/motors/${this.id}/amps`).then(res => {
            return res.json();
        });

        return 0;
    }

    public get voltage(): number {
        fetch(`/api/motors/${this.id}/voltage`).then(res => {
            return res.json();
        });

        return 0;
    }

    public get type(): string {
        fetch(`/api/motors/${this.id}/type`).then(res => {
            return res.json();
        });

        return "unknown";
    }

    public get faults(): string {
        fetch(`/api/motors/${this.id}/faults`).then(res => {
            return res.json();
        });

        return "";
    }

    public get stickyFaults(): string {
        fetch(`/api/motors/${this.id}/stickyFaults`).then(res => {
            return res.json();
        });

        return "";
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(disabled: boolean) {
        this._disabled = disabled;
        this.speed = 0;
    }

    public get displayName(): string {
        switch (this.type) {
            case "sparkmax":
                return "SPARKmax";
            case "falcon500":
                return "Falcon500";
            case "krakenx44":
                return "KrakenX44";
            case "krakenx60":
                return "KrakenX60";
            default:
                return "unknown";
        }
    }

    public get motorImage(): string {
        switch (this.type) {
            case "sparkmax":
                return 'src/assets/imgs/sparkmax.png';
            case "falcon500":
                return 'src/assets/imgs/falcon500.png';
            case "krakenx44":
                return 'src/assets/imgs/krakenX44.png';
            case "krakenx60":
                return 'src/assets/imgs/krakenX60.png';
            default:
                return 'src/assets/imgs/placeHolder.png';
        }
    }
}

/**
 * gets all the motors posted on the json.
 * @returns Motors posted. 
 */
export async function getMotors(): Promise<Motor[]> {
    const response: Response = await fetch(`/api/motors`);
    const motorIds: string[] = await response.json();
    const motors: Motor[] = motorIds.map((id) => new Motor(Number.parseInt(id)));

    return motors;
}