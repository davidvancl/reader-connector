import browser from 'webextension-polyfill';
import { ContentMessageHandler } from './utils/ContentMessageHandler';
import Signals, { CODE_RECEIVED } from '@utils/Signals';

export class ContentWorker {
	registerOnMessageListener(): void {
		browser.runtime.onMessage.addListener(ContentMessageHandler.handleMessageAction);
	}

	constructor() {
		// Register message listener (ws, background, popup)
		this.registerOnMessageListener();

		// @ts-ignore
		if (!window.pubsubpublish) {
			// @ts-ignore
			window.pubsubpublish = function(code: any) {
				Signals.publish(CODE_RECEIVED, {'code': `${code}`});
			};
		};
	}
}

new ContentWorker();
