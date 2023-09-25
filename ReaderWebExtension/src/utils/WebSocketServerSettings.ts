import { ServerOptions } from 'ws';

export const webSocketServerSettings = (): ServerOptions => {
	return {
		port: 9991,
		perMessageDeflate: {
			zlibDeflateOptions: {
				chunkSize: 1024,
				memLevel: 7,
				level: 3
			},
			zlibInflateOptions: {
				chunkSize: 10 * 1024
			},
			clientNoContextTakeover: true,
			serverNoContextTakeover: true,
			serverMaxWindowBits: 10,
			concurrencyLimit: 10,
			threshold: 1024
		}
	} as ServerOptions;
};
