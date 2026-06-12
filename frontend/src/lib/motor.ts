

export class Motor {

    private _disabled: boolean = true;
    public uuid: string = crypto.randomUUID();

    constructor(
        public readonly id: string,
        public readonly postPath: string = `/api/motors/${id}`
    ) { }

    public async getSpeed(): Promise<number> {
        return await fetch(`${this.postPath}/speed`).then(res => res.json());
    }

    public async setSpeed(speed: number) {
        if (this.disabled)
            return;

        await fetch(`${this.postPath}/speed`, {
            method: "POST",
            body: JSON.stringify({
                speed: speed,
            }),
        });
    }

    public async getBrushless(): Promise<boolean> {
        return await fetch(`${this.postPath}/brushless`).then(res => res.json());
    }

    public async setBrushless(brushless: boolean) {
        await fetch(`${this.postPath}/brushless`, {
            method: "POST",
            body: JSON.stringify({
                brushless: brushless,
            }),
        });
    }

    public async getType(): Promise<string> {
        return await fetch(`${this.postPath}/type`).then(res => res.json());
    }

    public async getVoltage(): Promise<number> {
        return await fetch(`${this.postPath}/voltage`).then(res => res.json());
    }

    public async getAmps(): Promise<number> {
        return await fetch(`${this.postPath}/amps`).then(res => res.json());
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(disabled: boolean) {
        this._disabled = disabled;
        this.setSpeed(0);
    }

    public async getDisplayName(): Promise<string> {
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

    public async getMotorImage(): Promise<string> {
        switch (await this.getType()) {
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