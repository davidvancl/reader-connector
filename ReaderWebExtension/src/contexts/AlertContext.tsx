import { AlertColor } from '@mui/material';
import React, { PropsWithChildren, createContext, useState } from 'react';

interface IAlertContext {
	text: string;
	type: AlertColor;
	setAlert: (text: string, type: AlertColor) => void;
}

const AlertContext = createContext<IAlertContext>({
	text: 'Alert messages',
	type: 'info',
	setAlert: (text: string, type: AlertColor) => undefined
});

export const AlertProvider = ({ children }: PropsWithChildren<any>) => {
	const [text, setText] = useState<string>('Alert messages');
	const [type, setType] = useState<AlertColor>('info');

	const setAlert = (text: string, type: AlertColor) => {
		setText(text);
		setType(type);

		setTimeout(() => {
			setText('Alert messages');
			setType('info');
		}, Number(process.env.ALERT_TIME));
	};

	return <AlertContext.Provider value={{ text, type, setAlert }}>{children}</AlertContext.Provider>;
};

export default AlertContext;
