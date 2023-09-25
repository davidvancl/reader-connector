export enum Trigger {
	// Regular actions
	onTabActivation = 'onTabActivation',
	contentConfirmAction = 'contentConfirmAction',

	// WebSocket actions
	startWebSocketClient = 'startWebSocketClient',
	stopWebSocketClient = 'stopWebSocketClient'
}

export enum Source {
	backgroundWorker = 'backgroundWorker',
	contentWorker = 'contentWorker'
}

export interface ComMessage {
	trigger: Trigger;
	value: string;
	source: Source;
}
