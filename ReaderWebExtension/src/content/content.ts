import browser from 'webextension-polyfill';
import { ContentMessageHandler } from './utils/ContentMessageHandler';

export class ContentWorker {
	registerOnMessageListener(): void {
		browser.runtime.onMessage.addListener(ContentMessageHandler.handleMessageAction);
	}

	constructor() {
		// Register message listener (ws, background, popup)
		this.registerOnMessageListener();
	}
}

new ContentWorker();
