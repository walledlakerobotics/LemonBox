
let currentMotors: Promise<Motor[]> = $derived(fetch("/api/motors")
    .then(res => res.json() as Record<string, any>)
    .then(data => Object.keys(data).map(id => new Motor(Number.parseInt(id)))));

export class Motor {
    private _disabled: boolean = true;
    public speedState: number = $state(0);
    public brushlessState: boolean = $state(false);

    public ampsState: number = $state(0);
    public voltageState: number = $state(0);

    public faultState: string[] = $state([]);
    public stickFaultState: string[] = $state([]);

    constructor(
        public readonly id: number,
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
            console.warn(`motor ${this.id} is disabled!`);

            // postes the speed to zero if disabled.
            fetch(this.postPath, {
                method: "POST",
                body: JSON.stringify({
                    speed: 0,
                }),
            });
        } else {
            // posts the speed
            fetch(this.postPath, {
                method: "POST",
                body: JSON.stringify({
                    speed: speed,
                }),
            });
        }
    }

    public get brushless(): Promise<boolean> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.brushless);
    }

    public set brushless(brushless: boolean) {
        fetch(this.postPath, {
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

    public get faults(): Promise<string[]> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.faults);
    }

    public get stickyFaults(): Promise<string[]> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.stickyFaults);
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(disabled: boolean) {
        if (disabled)
            this.speed = 0;

        this._disabled = disabled;
    }

    public async getDisplayName(): Promise<string> {
        switch (await this.type) {
            case "sparkmax":
                return "SPARKMAX";
            case "falcon500":
                return "Falcon500";
            case "krakenx44":
                return "KrakenX44";
            case "krakenx60":
                return "KrakenX60";
            case "talonfx":
                return "TalonFX"
            default:
                return "Unknown";
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
            case "talonfx":
                return "assets/imgs/krakenX60.png";
            default:
                return "assets/imgs/placeHolder.png";
        }
    }

    public async refreshData() {
        const [amps, voltage, faults, sticky] = await Promise.all([this.amps, this.voltage, this.faults, this.stickyFaults]);

        this.ampsState = amps;
        this.voltageState = voltage;
        this.faultState = faults;
        this.stickFaultState = sticky;
    }

    /**
     * gets all the motors posted on the json.
     * @returns Motors posted. 
     */
    public static async getMotors(): Promise<Motor[]> {
        return currentMotors;
    }

    public static async getMotor(id: number): Promise<Motor | Motor[]> {
        return currentMotors.then(motors => motors.filter(m => m.id == id));
    }
}