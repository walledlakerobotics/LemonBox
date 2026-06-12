export class Motor {

    private _disabled: boolean = true;
    public uuid: string = crypto.randomUUID();

    constructor(
        public readonly id: string,
        private readonly postPath: string = `/api/motors/${id}`
    ) {
    }

    private async getSpeed(): Promise<number> {
        const res = await fetch(`${this.postPath}`);
        const data = await res.json();
        return data.speed;
    }

    public get speed(): Promise<number> {
        return this.getSpeed();
    }

    public set speed(speed: number) {
        if (this.disabled)
            return;

        fetch(`${this.postPath}`, {
            method: "POST",
            body: JSON.stringify({
                speed: speed,
            }),
        });
    }

    private async getBrushless(): Promise<boolean> {
        const res = await fetch(`${this.postPath}`);
        const data = await res.json();
        return data.brushless;
    }

    public get brushless(): Promise<boolean> {
        return this.getBrushless();
    }

    public set brushless(brushless: boolean) {
        fetch(`${this.postPath}`, {
            method: "POST",
            body: JSON.stringify({
                brushless: brushless,
            }),
        });
    }

    private async getType(): Promise<string> {
        const res = await fetch(`${this.postPath}`);
        const data = await res.json();

        return data.type;
    }

    public get type(): Promise<string> {
        return this.getType();
    }

    private async getVoltage(): Promise<number> {
        const res = await fetch(`${this.postPath}`);
        const data = await res.json();

        return data.voltage;
    }

    public get voltage(): Promise<number> {
        return this.getVoltage();
    }

    private async getAmps(): Promise<number> {
        const res = await fetch(`${this.postPath}`);
        const data = await res.json();

        return data.amps;
    }

    public get amps(): Promise<number> {
        return this.getAmps();
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(disabled: boolean) {
        this._disabled = disabled;
        this.speed = 0;
    }

    private async getDisplayName(): Promise<string> {
        switch (await this.getType()) {
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

    public get displayName(): Promise<string> {
        return this.getDisplayName();
    }

    private async getImageDir(): Promise<string> {
        switch (await this.getType()) {
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

    public get imageDir(): Promise<string> {
        return this.getImageDir();
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