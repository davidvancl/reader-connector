import browser from 'webextension-polyfill';
import { BackgroundMessageHandler } from './utils/BackgroundMessageHandler';
import { WebSocketService } from './utils/WebSocketService';

export class BackgroundWorker {
	registerOnMessageListener(): void {
		browser.runtime.onMessage.addListener(BackgroundMessageHandler.handleMessageAction);
	}

	registerOnTabActivationListener(): void {
		browser.tabs.onActivated.addListener(BackgroundMessageHandler.handleOnTabActiveAction);
	}

	constructor() {
		// Register messageListener for communication (popup, content)
		this.registerOnMessageListener();

		// Register onActiveTab listener
		this.registerOnTabActivationListener();

		// Register WbSocketServer and assign listeners
		WebSocketService.createWebSocketServerWithListeners();
	}
}

new BackgroundWorker();
