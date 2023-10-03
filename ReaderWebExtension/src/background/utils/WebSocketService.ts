import browser from 'webextension-polyfill';
import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';

export class WebSocketService {
	static handleOpenSocketListener(event: any) {
		// socket.send("Hello Server!");
	}

	static handleOnMessageListener(event: any) {
		// Re-sends data from ws to active tab
		browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
			browser.tabs.sendMessage(Number(tabs[0].id), {
				trigger: Trigger.webSocketMessage,
				value: event.data,
				source: Source.backgroundWorker
			} as ComMessage);
		}, console.error);
	}

	static createWebSocketServerWithListeners() {
		browser.storage.local.get('web_socket_server_ip').then(function (value) {
			if (value.web_socket_server_ip !== undefined && value.web_socket_server_ip !== null) {
				// listent to ws server requests
				const socket = new WebSocket(`ws://${value.web_socket_server_ip}:8887`);

				// Connection opened
				socket.addEventListener('open', WebSocketService.handleOpenSocketListener);

				// Listen for messages
				socket.addEventListener('message', WebSocketService.handleOnMessageListener);
			} else {
				console.error(`An error occurred while loading websocket server ip address`);
			}
		});

		// Auto reloads background script and refreshs connection
		browser.storage.local.get('keep_connection_alive').then(function (value) {
			if (value.keep_connection_alive === 'true') {
				setTimeout(() => {
					browser.runtime.reload();
				}, 25000);
			}
		});
	}
}
