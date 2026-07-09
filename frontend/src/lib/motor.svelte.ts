export class Motor {
    public isLoaded: boolean = false;
    private _disabled: boolean = $state(true);

    public speedState: number = $state(0);
    public brushlessState: boolean = $state(false);

    public ampsState: number = $state(0);
    public voltageState: number = $state(0);

    constructor(
        public readonly id: number,
        private readonly postPath: string = `/api/motors/${id}`
    ) {

        $effect(() => {
            if (this.isLoaded) {
                this.speed = this.speedState;
                this.brushless = this.brushlessState;
            } else {
                console.error("error: motor wasn't loaded!");
            }
        });

        $effect(() => {
            async () => {
                this.ampsState = await this.amps;
                this.voltageState = await this.voltage;
            }
        });
    }

    public get speed(): Promise<number> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.speed);
    }

    public set speed(speed: number) {
        if (this.disabled) {
            console.log("warning motor is disabled");

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

    // this will get the orginal properties, before updateing the motor.
    public async load() {
        this.speedState = await this.speed;
        this.brushlessState = await this.brushless;

        this.isLoaded = true;
    }


    /**
     * gets all the motors posted on the json.
     * @returns Motors posted. 
     */
    public static async getMotors(): Promise<Motor[]> {
        const res = await fetch("/api/motors");
        const data = await res.json() as Record<string, any>;

        return Object.keys(data).map(id => new Motor(Number.parseInt(id)));
    }
}