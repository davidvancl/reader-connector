import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';
import browser from 'webextension-polyfill';

export class BackgroundMessageHandler {
	static handleMessageAction(message: ComMessage) {
		console.log(message.value);
	}

	static handleOnTabActiveAction(activeInfo: any) {
		if (!activeInfo.tabId) {
			return;
		}

		browser.tabs
			.sendMessage(activeInfo.tabId, {
				trigger: Trigger.onTabActivation,
				value: 'Message action executed from bacground worker.',
				source: Source.backgroundWorker
			} as ComMessage)
			.catch((e) => {
				console.log(e);
			});
	}
}
