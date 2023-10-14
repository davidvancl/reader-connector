import { AlertColor } from '@mui/material';

import browser from 'webextension-polyfill';
// const browser : any = null;

import { ComMessage, Source, Trigger } from './MessangerUtil';

export const isBrowserFirefox = () => {
	return navigator.userAgent.toLowerCase().includes('firefox');
};

export const getStorageValue = (key: string, callback: (value: any) => void, setAlert?: (text: string, type: AlertColor) => void) => {
	browser?.storage.local
		.get(key)
		.then(function (value: any) {
			callback(value[key]);
		})
		.catch(() => {
			if (typeof setAlert === 'function') {
				setAlert('Something happend!', 'error');
			}
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

export const sendWorkerMessage = (
	message: string,
	trigger: Trigger,
	source: Source,
	setAlert?: (text: string, type: AlertColor) => void
) => {
	browser?.runtime
		.sendMessage({
			trigger: trigger,
			value: message,
			source: source
		} as ComMessage)
		.then(() => {
			if (typeof setAlert === 'function') {
				setAlert('Sent!', 'success');
			}
		})
		.catch(() => {
			if (typeof setAlert === 'function') {
				setAlert('Something happend!', 'error');
			}
		});
};

export const sendTabMessage = (message: string, trigger: Trigger, source: Source, setAlert?: (text: string, type: AlertColor) => void) => {
	browser?.tabs
		.query({ currentWindow: true, active: true })
		.then((tabs: any) => {
			browser?.tabs
				.sendMessage(Number(tabs[0].id), {
					trigger: trigger,
					value: message,
					source: source
				} as ComMessage)
				.then(() => {
					if (typeof setAlert === 'function') {
						setAlert('Sent!', 'success');
					}
				})
				.catch(() => {
					if (typeof setAlert === 'function') {
						setAlert('Something happend!', 'error');
					}
				});
		})
		.catch(() => {
			if (typeof setAlert === 'function') {
				setAlert('Something happend!', 'error');
			}
		});
};

export const showPageAlert = (text: string, type: string) => {
	getStorageValue('disable_page_alerts', (value: any) => {
		if (value) {
			return;
		}

		const workspace = document.getElementById(String(process.env.ALERT_WORKSPACE_UUID));
		const alert = document.createElement('div');

		switch (type) {
			case 'success':
				alert.style.color = '#155724';
				alert.style.backgroundColor = '#d4edda';
				alert.style.borderColor = '#c3e6cb';
				break;
			case 'error':
				alert.style.color = '#721c24';
				alert.style.backgroundColor = '#f8d7da';
				alert.style.borderColor = '#f5c6cb';
				break;
			case 'info':
				alert.style.color = '#004085';
				alert.style.backgroundColor = '#cce5ff';
				alert.style.borderColor = '#b8daff';
				break;
			case 'warning':
				alert.style.color = '#856404';
				alert.style.backgroundColor = '#fff3cd';
				alert.style.borderColor = '#ffeeba';
				break;
		}

		alert.style.position = 'relative';
		alert.style.padding = '.75rem 1.25rem';
		alert.style.marginBottom = '1rem';
		alert.style.border = '1px solid transparent';
		alert.style.borderRadius = '.25rem';
		alert.role = 'alert';
		alert.innerText = text;

		workspace?.appendChild(alert);

		setTimeout(() => {
			alert.remove();
		}, Number(process.env.ALERT_VISIBLE_TIME));
	});
};
