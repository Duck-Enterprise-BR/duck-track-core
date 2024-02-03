import fs from "fs";

type LoggerLevelsTypes = "info" | "alert" | "error" | "job";

interface LogData {
    timestamp: string;
    level: LoggerLevelsTypes;
    message: string;
}

class ServerLogger {
    private readonly stdout: NodeJS.WriteStream;

    public constructor() {
        this.stdout = process.stdout;
    }

    public info(message: string): void {
        this.write(message, "info");
    }

    public alert(message: string): void {
        this.write(message, "alert");
    }

    public error(message: string): void {
        this.write(message, "error");
    }

    public job(message: string): void {
        this.write(message, "job");
    }

    private write(message: string, level: LoggerLevelsTypes): void {
        let logMessage = `[${new Date().toISOString()}] [${this.getColor(level)(level.toUpperCase())}] ${message}`;
        this.stdout.write(logMessage + "\n");
    }

    private getColor(level: LoggerLevelsTypes): (text: string) => string {
        const colors: Record<LoggerLevelsTypes, string> = {
            info: "\x1b[32m",
            alert: "\x1b[33m",
            error: "\x1b[31m",
            job: "\x1b[34m"
        };

        const resetColor = "\x1b[0m";

        return (text: string) => `${colors[level]}${text}${resetColor}`;
    }
}

export const logger = new ServerLogger();