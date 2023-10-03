import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';
import browser from 'webextension-polyfill';

export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage:
				console.log(message.value);
				break;
			case Trigger.onTabActivation:
				// TODO: implement or remove
				break;
			default:
				// Log value to console and send confirm message
				console.log(message.value);
				browser.runtime.sendMessage({
					trigger: Trigger.contentConfirmAction,
					value: 'Message confirmed without action',
					source: Source.contentWorker
				} as ComMessage);
				break;
		}
	}
}
