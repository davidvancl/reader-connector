import { ComMessage, Trigger } from '@utils/MessangerUtil';


export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage: {
				console.log(message.value);

				try {
					const button = document.createElement('button');
					button.innerHTML = 'click me';
					button.id = "wtf-this-is-not-working";
					button.onclick = function(){
						// @ts-ignore
						window.Signals.publish('code_received', {'code': `${message.value}`});

						// @ts-ignore
						this.remove();

						console.log("method first");
						return false;
					};
					button.click();
				} catch {

				}


				try {
					// @ts-ignore
					window.pubsubpublish(message.value);
					console.log("published");
				} catch {

				}

				try {
					// @ts-ignore
					window.Signals.publish('code_received', {'code': `${message.value}`});
					console.log("method second");
				} catch {

				}
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
