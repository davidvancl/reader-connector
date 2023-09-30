import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';
import browser from 'webextension-polyfill';

export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		if (message.trigger === Trigger.onTabActivation) {
			if(message.value === "HELLO WORLD") {
				document.body.style.backgroundColor = "red";
			} else {
				console.log(message.value);
				browser.runtime.sendMessage({
					trigger: Trigger.contentConfirmAction,
					value: 'Confirm!',
					source: Source.contentWorker
				} as ComMessage);
			}
		}
	}
}
