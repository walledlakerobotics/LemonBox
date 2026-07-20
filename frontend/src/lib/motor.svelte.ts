
export class Motor {
    private _disabled: boolean = true;
    private _speed: number = 0;
    private _brushless: boolean = false;

    private _amps: number = 0;
    private _voltage: number = 0;

    // update time
    private _lastTime: number = 0;
    private _dt: number = 0;

    private _fault: string[] = [];
    private _faultsCleared: boolean = false;

    constructor(
        public readonly id: number,
        private readonly postPath: string = `/api/motors/${id}`
    ) {

    }

    public get speed(): number {
        return this._speed;
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

            this._speed = speed;
        }


    }

    public get brushless(): boolean {
        return this._brushless
    }

    public set brushless(brushless: boolean) {
        fetch(this.postPath, {
            method: "POST",
            body: JSON.stringify({
                brushless: brushless,
            }),
        });

        this._brushless = brushless;
    }

    public get type(): Promise<string> {
        return fetch(this.postPath)
            .then(res => res.json())
            .then(data => data.type);
    }

    public get voltage(): number {
        return this._voltage;
    }

    public get amps(): number {
        return this._amps;
    }

    public get updateDelta(): number {
        return this._dt;
    }


    public get faults(): string[] {
        return this._fault;
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(disabled: boolean) {
        if (disabled)
            this.speed = 0;

        this._disabled = disabled;
    }

    public get faultsCleared() {
        return this._faultsCleared;
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

    public async updateData() {
        const data = await this.getData();
        const [amps, voltage, faults, cleared] = await Promise.all([data.amps, data.voltage, data.faults, data.clearFaults]);

        this._amps = amps;
        this._voltage = voltage;
        this._fault = faults;
        this._faultsCleared = cleared;


        const currentTime: number = Date.now();
        this._dt = currentTime - this._lastTime;
        this._lastTime = currentTime;
    }

    private async getData() {
        const res: Response = await fetch(this.postPath);
        const data: any = await res.json();

        return data;
    }

    public clearFaults() {
        fetch(this.postPath, {
            method: "POST",
            body: JSON.stringify({
                clearFault: true,
            }),
        });
    }

    /**
     * gets all the motors posted on the json.
     * @returns Motors posted. 
     */
    public static async getMotors(): Promise<Motor[]> {
        return currentMotors;
    }

    public static async refresh(): Promise<void> {
        currentMotors = this.getUpdatedMotors();
    }

    public static async getUpdatedMotors(): Promise<Motor[]> {
        const res = await fetch("/api/motors");
        const data: string[] = await res.json();

        return data.map(id => new Motor(Number.parseInt(id)));
    }

    public static async getMotor(id: number): Promise<Motor | Motor[]> {
        return currentMotors.then(motors => motors.filter(m => m.id == id));
    }
}

let currentMotors: Promise<Motor[]> = $derived(Motor.getUpdatedMotors());