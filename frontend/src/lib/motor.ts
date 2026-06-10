

export class Motor {

    private _disabled: boolean = true;
    public uuid: string = crypto.randomUUID();

    constructor(public readonly id: string, private postPath: string = `/api/motors/${this.id}`) { }

    public get speed(): number {
        fetch(`${this.postPath}/speed`).then(res => {
            return res.json()
        });

        return 0;
    }

    public set speed(speed: number) {
        if (this.disabled) {
            fetch(`${this.postPath}/speed=${0}`, {
                method: "POST",
            });
        } else {
            fetch(`${this.postPath}/speed=${speed}`, {
                method: "POST",
            });
        }
    }

    public get brushless(): boolean {
        fetch(`${this.postPath}/brushless`).then(res => {
            return res.json();
        });

        return false;
    }

    public set brushless(brushless: boolean) {
        fetch(`${this.postPath}/brushless=${brushless}`, {
            method: "POST",
        });
    }

    public get amps(): number {
        fetch(`${this.postPath}/amps`).then(res => {
            return res.json();
        });

        return 0;
    }

    public get voltage(): number {
        fetch(`${this.postPath}/voltage`).then(res => {
            return res.json();
        });

        return 0;
    }

    public get type(): string {
        fetch(`${this.postPath}/type`).then(res => {
            return res.json();
        });

        return "unknown";
    }

    public get faults(): string {
        fetch(`${this.postPath}/faults`).then(res => {
            return res.json();
        });

        return "";
    }

    public get stickyFaults(): string {
        fetch(`${this.postPath}/stickyFaults`).then(res => {
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
                return 'assets/imgs/sparkmax.png';
            case "falcon500":
                return 'assets/imgs/falcon500.png';
            case "krakenx44":
                return 'assets/imgs/krakenX44.png';
            case "krakenx60":
                return 'assets/imgs/krakenX60.png';
            default:
                return 'assets/imgs/placeHolder.png';
        }
    }

    /**
     * gets all the motors posted on the json.
     * @returns Motors posted. 
     */
    public static async getMotors(): Promise<Motor[]> {
        const res = await fetch("/api/motors");
        const data = await res.json() as Record<string, any>;

        return Object.keys(data).map(id => new Motor(id));
    }
}