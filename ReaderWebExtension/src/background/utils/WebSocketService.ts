import { Source, Trigger } from '@utils/MessangerUtil';
import { getStorageValue, reloadExtension, sendTabMessage } from '@utils/BrowserUtil';

export class WebSocketService {
	static handleOpenSocketListener(event: any) {
		console.log('Connection opened for:', event);
	}

	static handleCloseSocketListener(event: any) {
		console.log('Connection closed for:', event);
	}

	static handleOnMessageListener(event: any) {
		// Re-sends data from ws to active tab
		sendTabMessage(event.data, Trigger.webSocketMessage, Source.backgroundWorker);
	}

	static createWebSocketServerWithListeners() {
		getStorageValue('web_socket_server_ip', (value: any) => {
			if (value !== undefined && value !== null) {
				// listent to ws server requests
				const address = `ws://${value}:${process.env.WEBSOCKET_PORT}`;
				const socket = new WebSocket(address);
				console.log(`Websocket client listening: ${address}`);

				// Connection opened
				socket.addEventListener('open', WebSocketService.handleOpenSocketListener);

				// Connection closed
				socket.addEventListener('close', WebSocketService.handleCloseSocketListener);

				// Listen for messages
				socket.addEventListener('message', WebSocketService.handleOnMessageListener);
			} else {
				console.log(`An error occurred while loading websocket server ip address`);
			}
		});

		// Auto reloads background script and refreshs connection
		getStorageValue('keep_connection_alive', (value: any) => {
			if (value) {
				setTimeout(() => {
					reloadExtension();
				}, Number(process.env.MOZILLA_RELOAD_INTERVAL));
			}
		});
	}
}
