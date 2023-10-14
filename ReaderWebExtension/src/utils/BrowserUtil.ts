import { AlertColor } from '@mui/material';

import browser from 'webextension-polyfill';
// const browser : any = null;

import { ComMessage, Source, Trigger } from './MessangerUtil';

export const isBrowserFirefox = () => {
	return navigator.userAgent.toLowerCase().includes('firefox');
};

export const getStorageValue = (key: string, callback: (value: any) => void, setAlert: (text: string, type: AlertColor) => void) => {
	browser?.storage.local
		.get(key)
		.then(function (value: any) {
			callback(value[key]);
		})
		.catch(() => {
			setAlert('Something happend!', 'error');
		});
};

export const saveStorageValue = (key: string, value: any, setAlert: (text: string, type: AlertColor) => void) => {
	browser?.storage.local
		.set({ [key]: value })
		.then(() => {
			setAlert(`${value} saved successfully`, 'success');
		})
		.catch(() => {
			setAlert('Something happend!', 'error');
		});
};

export const requestPermissions = (setAlert: (text: string, type: AlertColor) => void) => {
	browser?.permissions
		.request({ origins: ['<all_urls>'] })
		.then(() => {
			setAlert('Requested! Check behind popup?', 'success');
		})
		.catch(() => {
			setAlert('Something happend!', 'error');
		});
};

export const reloadExtension = () => {
	browser?.runtime.reload();
};

export const sendWorkerMessage = (message: string, trigger: Trigger, setAlert: (text: string, type: AlertColor) => void) => {
	browser?.runtime
		.sendMessage({
			trigger: trigger,
			value: message,
			source: Source.popupWorker
		} as ComMessage)
		.then(() => {
			setAlert('Sent!', 'success');
		})
		.catch(() => {
			setAlert('Something happend!', 'error');
		});
};

export const sendTabMessage = (message: string, trigger: Trigger, setAlert: (text: string, type: AlertColor) => void) => {
	browser?.tabs
		.query({ currentWindow: true, active: true })
		.then((tabs: any) => {
			browser?.tabs
				.sendMessage(Number(tabs[0].id), {
					trigger: trigger,
					value: message,
					source: Source.backgroundWorker
				} as ComMessage)
				.then(() => {
					setAlert('Sent!', 'success');
				})
				.catch(() => {
					setAlert('Something happend!', 'error');
				});
		})
		.catch(() => {
			setAlert('Something happend!', 'error');
		});
};
