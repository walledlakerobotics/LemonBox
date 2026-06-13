export class Motor {

    private _disabled: boolean = true;
    public uuid: string = crypto.randomUUID();

    constructor(
        public readonly id: string,
        private readonly postPath: string = `/api/motors/${id}`
    ) {
    }

    public get speed(): Promise<number> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.speed);
    }

    public set speed(speed: number) {
        if (this.disabled) {
            console.log("warning motor is disabled");
            return;
        }

        console.log(speed);

        fetch(`${this.postPath}`, {
            method: "POST",
            body: JSON.stringify({
                speed: speed,
            }),
        });
    }

    public get brushless(): Promise<boolean> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.brushless);
    }

    public set brushless(brushless: boolean) {
        if (this.disabled)
            return;

        fetch(`${this.postPath}`, {
            method: "POST",
            body: JSON.stringify({
                brushless: brushless,
            }),
        });
    }

    public get type(): Promise<string> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.type);
    }

    public get voltage(): Promise<number> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.voltage);
    }

    public get amps(): Promise<number> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.amps);
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(disabled: boolean) {
        this._disabled = disabled;
        this.speed = 0;
    }

    public async getDisplayName(): Promise<string> {
        switch (await this.type) {
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

    public async getImageDir(): Promise<string> {
        switch (await this.type) {
            case "sparkmax":
                return "assets/imgs/sparkmax.png";
            case "falcon500":
                return "assets/imgs/falcon500.png";
            case "krakenx44":
                return "assets/imgs/krakenX44.png";
            case "krakenx60":
                return "assets/imgs/krakenX60.png";
            default:
                return "assets/imgs/placeHolder.png";
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