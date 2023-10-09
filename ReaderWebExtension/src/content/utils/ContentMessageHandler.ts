import { ComMessage, Trigger } from '@utils/MessangerUtil';

export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage: {
				console.log(message.value);
					const button = document.createElement('button');
					button.innerHTML = 'click me';
					button.onclick = function(){
						// // @ts-ignore
						// window.wrappedJSObject.pubsubpublish(message.value);
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
