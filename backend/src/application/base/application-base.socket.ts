import { environment } from "../../environment";
import { Socket, io } from "socket.io-client";

export abstract class ApplicationBaseSocket {
    protected socket: Socket;

    protected constructor() {
        this.socket = io(environment.trackQueueUrl);

        this.emit.bind(this);
        this.on.bind(this);
    }

    protected emit(route: string, data: string): void {
        this.socket.emit(route, data);
        this.socket.on(route, this.on);
    }

    public abstract on(data: string): void;
}