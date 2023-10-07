import { ComMessage, Trigger } from '@utils/MessangerUtil';

export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage:
				console.log(message.value);

				// @ts-ignore: (code inside page)
				if (Signals ?? false) {
					// @ts-ignore: (code inside page)
					Signals.publish('code_received', { 'code': message.value });
				}
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
