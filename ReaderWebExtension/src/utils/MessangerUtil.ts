export enum Trigger {
	// Regular actions
	onTabActivation = 'onTabActivation',
	contentConfirmAction = 'contentConfirmAction',
	plainTextMessage = 'plainTextMessage',

	// WebSocket actions
	startWebSocketClient = 'startWebSocketClient',
	stopWebSocketClient = 'stopWebSocketClient',
	webSocketMessage = 'webSocketMessage'
}

export enum Source {
	backgroundWorker = 'backgroundWorker',
	contentWorker = 'contentWorker',
	popupWorker = 'popupWorker'
}

export interface ComMessage {
	trigger: Trigger;
	value: string;
	source: Source;
}
