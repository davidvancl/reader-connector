import browser from 'webextension-polyfill';
import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';

export class WebSocketService {
	static handleOpenSocketListener(event: any) {
		// TODO: log event
		console.log(event);
	}

	static handleOnMessageListener(event: any) {
		// Re-sends data from ws to active tab
		browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
			browser.tabs.sendMessage(Number(tabs[0].id), {
				trigger: Trigger.webSocketMessage,
				value: event.data,
				source: Source.backgroundWorker
			} as ComMessage);
		}, console.log);
	}

	static createWebSocketServerWithListeners() {
		browser.storage.local.get('web_socket_server_ip').then(function (value) {
			if (value.web_socket_server_ip !== undefined && value.web_socket_server_ip !== null) {
				// listent to ws server requests
				const address = `ws://${value.web_socket_server_ip}:${process.env.WEBSOCKET_PORT}`;
				const socket = new WebSocket(address);
				console.log(`Client listening: ${address}`);

				// Connection opened
				socket.addEventListener('open', WebSocketService.handleOpenSocketListener);

				// Listen for messages
				socket.addEventListener('message', WebSocketService.handleOnMessageListener);
			} else {
				console.log(`An error occurred while loading websocket server ip address`);
			}
		});

		// Auto reloads background script and refreshs connection
		browser.storage.local.get('keep_connection_alive').then(function (value) {
			if (value.keep_connection_alive === true) {
				setTimeout(() => {
					browser.runtime.reload();
				}, 25000);
			}
		});
	}
}
