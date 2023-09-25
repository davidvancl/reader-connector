import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';
import browser from 'webextension-polyfill';

export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		if (message.trigger === Trigger.onTabActivation) {
			console.log(message.value);
			browser.runtime.sendMessage({
				trigger: Trigger.contentConfirmAction,
				value: 'Confirm!',
				source: Source.contentWorker
			} as ComMessage);
		}
	}
}
