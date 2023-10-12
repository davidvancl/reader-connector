import React from 'react';
import { Alert } from '@mui/material';
import useAlert from '@contexts/hooks/UseAlert';

const AlertComponent = () => {
	const { text, type } = useAlert();

	if (text && type) {
		return (
			<Alert
				data-testid='alert-message'
				severity={type}
				sx={{ width: '100%', zIndex: 10 }}>
				{text}
			</Alert>
		);
	} else {
		return <></>;
	}
};

export default AlertComponent;
