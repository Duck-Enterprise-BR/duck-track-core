export class ApplicationBaseResponse<T> {
    errors: string[];
    result: T | {};
    status: number;

    public constructor(result?: T, errors?: string[], status?: number) {
        this.result = result ?? {};
        this.errors = errors ?? [];
        this.status = status ?? 200;
    }
}