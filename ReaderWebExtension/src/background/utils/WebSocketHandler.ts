import WebSocket, { RawData } from 'ws';

export class WebSocketHandler {
	webSocket: WebSocket;

    handleErrorResponse(this: WebSocket, err: Error): void {
        console.error(err.message);
    }

    handleOpenConnestion(arg0: string, handleOpenConnestion: any) {
        throw new Error('Method not implemented.');
    }

    handleMessageResponse(this: WebSocket, data: RawData, isBinary: boolean): void {
        console.log(data);
    }

	constructor(ipaddress: string, uuid: string) {
		this.webSocket = new WebSocket(`ws://${ipaddress}/${uuid}`);

        this.webSocket.on('error', this.handleErrorResponse);
        this.webSocket.on('open', this.handleOpenConnestion);
        this.webSocket.on('message', this.handleMessageResponse);
	}
}
