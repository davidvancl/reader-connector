import { sendWorkerMessage } from '@utils/BrowserUtil';
import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';

export class BackgroundMessageHandler {
	static handleMessageAction(message: ComMessage) {
		console.log(message.value);
	}

	static handleOnTabActiveAction(activeInfo: any) {
		if (!activeInfo.tabId) {
			return;
		}
		sendWorkerMessage('Worker detected the change of the active window.', Trigger.onTabActivation, Source.backgroundWorker);
	}
}
