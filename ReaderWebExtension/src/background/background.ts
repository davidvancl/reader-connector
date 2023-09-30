import browser from 'webextension-polyfill';
import { BackgroundMessageHandler } from './utils/BackgroundMessageHandler';
import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';

class BackgroundWorker {
	registerOnMessageListener(): void {
		browser.runtime.onMessage.addListener(BackgroundMessageHandler.handleMessageAction);
	}

	registerOnTabActivationListener(): void {
		browser.tabs.onActivated.addListener(BackgroundMessageHandler.handleOnTabActiveAction);
	}

	mySubscriber = function (msg : any, data : any) {
		console.log( msg, data );
	};

	constructor() {
		this.registerOnMessageListener();
		this.registerOnTabActivationListener();

		// listent to ws server requests
		const socket = new WebSocket("ws://192.168.2.159:8887");

		// Connection opened
		socket.addEventListener("open", (event: any) => {
		socket.send("Hello Server!");
		});

		// Listen for messages
		socket.addEventListener("message", (event: any) => {
			browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
				browser.tabs.sendMessage(Number(tabs[0].id), {
					trigger: Trigger.onTabActivation,
					value: event.data,
					source: Source.backgroundWorker
				} as ComMessage);
			}, console.error);
		});
	}
}

new BackgroundWorker();
