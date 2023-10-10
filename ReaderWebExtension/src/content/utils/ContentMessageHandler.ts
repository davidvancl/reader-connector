import { ComMessage, Trigger } from '@utils/MessangerUtil';

export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage: {
				const actualCode = `window.Signals.publish('code_received', {'code': '${message.value}'});`;
				document.documentElement.setAttribute('onreset', actualCode);
				document.documentElement.dispatchEvent(new CustomEvent('reset'));
				document.documentElement.removeAttribute('onreset');
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
