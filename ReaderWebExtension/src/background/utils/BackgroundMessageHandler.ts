import { sendWorkerMessage } from '@utils/BrowserUtil';
import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';
import Signals from '@utils/Signals';

export class BackgroundMessageHandler {
	static handleMessageAction(message: ComMessage) {
		switch (message.trigger) {
			case Trigger.webSocketMessage: {
				Signals.publish('server_message', { message: message.value });
				break;
			}
			default:
				console.log(message.value);
				break;
		}
	}

	static handleOnTabActiveAction(activeInfo: any) {
		if (!activeInfo.tabId) {
			return;
		}
		sendWorkerMessage('Worker detected the change of the active window.', Trigger.onTabActivation, Source.backgroundWorker);
	}
}
