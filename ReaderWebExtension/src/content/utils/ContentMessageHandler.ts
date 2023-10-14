import { showPageAlert } from '@utils/BrowserUtil';
import { ComMessage, Trigger } from '@utils/MessangerUtil';

export class ContentMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage: {
				// Bypasses the browser isolation to publish signal
				document.documentElement.setAttribute('onreset', `window.Signals.publish('code_received', {'code': '${message.value}'});`);
				document.documentElement.dispatchEvent(new CustomEvent('reset'));
				document.documentElement.removeAttribute('onreset');

				showPageAlert(`Published code: ${message.value}`, 'success');
				break;
			}
			case Trigger.plainTextMessage:
				showPageAlert(`Message received: ${message.value}`, 'info');
				break;
			default:
				console.log('Message received without defined action: ', message.value);
				break;
		}
	}
}
