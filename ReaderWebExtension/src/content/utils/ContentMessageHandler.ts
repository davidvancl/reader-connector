import { ComMessage, Trigger } from '@utils/MessangerUtil';


export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage: {
				console.log(message.value);

				// @ts-ignore
				window.pubsubpublish(message.value);
				console.log("published");

				break;
			}
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
