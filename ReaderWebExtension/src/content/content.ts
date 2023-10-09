import browser from 'webextension-polyfill';
import { ContentMessageHandler } from './utils/ContentMessageHandler';

export class ContentWorker {
	registerOnMessageListener(): void {
		browser.runtime.onMessage.addListener(ContentMessageHandler.handleMessageAction);
	}

	constructor() {
		// Register message listener (ws, background, popup)
		this.registerOnMessageListener();

		// // @ts-ignore
		// if (!window.wrappedJSObject.pubsubpublish) {
		// 	// @ts-ignore
		// 	window.wrappedJSObject.pubsubpublish = function(code: any) {
		// 		// @ts-ignore
		// 		window.wrappedJSObject.Signals.publish('code_received', {'code': `${code}`});
		// 	};
		// };
	}
}

new ContentWorker();
