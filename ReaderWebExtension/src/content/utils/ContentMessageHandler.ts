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
				console.log(message.value);
				break;
			default:
				// TODO: implement or remove
				console.log(message.value);
				break;
		}
	}
}
