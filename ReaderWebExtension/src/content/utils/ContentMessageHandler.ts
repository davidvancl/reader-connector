import { ComMessage, Trigger } from '@utils/MessangerUtil';
import Signals from '@utils/Signals';

export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage:
				console.log(message.value);
				Signals.publish('code_received', { 'code': message.value });
				console.log("OK");
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
