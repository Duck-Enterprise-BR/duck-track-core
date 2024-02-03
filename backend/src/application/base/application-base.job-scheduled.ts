export class ApplicationBaseJobScheduled {
    protected readonly schedule: string;
    protected readonly name: string;

    public constructor(schedule: string, name: string) {
        this.schedule = schedule;
        this.name = name;

        this.exec.bind(this);
    }

    public async exec(data?: any): Promise<void> {
    }

    public getSchedule(): string {
        return this.schedule;
    }

    public getName(): string {
        return this.name;
    }
}