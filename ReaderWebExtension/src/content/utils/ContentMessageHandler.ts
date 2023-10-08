import { ComMessage, Trigger } from '@utils/MessangerUtil';
import Signals, { CODE_RECEIVED } from '@utils/Signals';

export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage: {
				console.log(message.value);

				const button = document.createElement('button');
				button.innerHTML = 'click me';
				button.id = "wtf-this-is-not-working";
				button.onclick = function(){
					Signals.publish(CODE_RECEIVED, {'code': `${message.value}`});
					
					// @ts-ignore
					this.remove();

					console.log("OK");
					return false;
				};
				button.click();
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
