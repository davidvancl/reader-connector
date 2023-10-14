import browser from 'webextension-polyfill';
import { ContentMessageHandler } from './utils/ContentMessageHandler';

export class ContentWorker {
	registerOnMessageListener(): void {
		browser.runtime.onMessage.addListener(ContentMessageHandler.handleMessageAction);
	}

	createAlertWorkspace(): void {
		const workspace = document.createElement('div');
		workspace.style.width = '400px';
		workspace.style.minHeight = '0px';
		workspace.style.position = 'absolute';
		workspace.style.top = '10px';
		workspace.style.left = '10px';
		workspace.style.zIndex = '10';
		workspace.id = String(process.env.ALERT_WORKSPACE_UUID);
		document.body.appendChild(workspace);
	}

	constructor() {
		// Register message listener (ws, background, popup)
		this.registerOnMessageListener();

		const workspace = document.getElementById(String(process.env.ALERT_WORKSPACE_UUID));
		workspace?.remove();
		this.createAlertWorkspace();
	}
}

new ContentWorker();
