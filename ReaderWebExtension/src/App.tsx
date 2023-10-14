import PopupComponent from '@components/PopupComponent';
import CommunicationComponent from '@components/CommunicationComponent';
import React, { useState } from 'react';

export const App: React.FC = () => {
	const [comComponent, setComComponent] = useState<boolean>(true);

	const handleUpdateCommunicationComponent = (visible: boolean) => {
		setComComponent(visible);
	};

	if (comComponent) {
		return (
			<CommunicationComponent
				closeModalCallback={() => {
					handleUpdateCommunicationComponent(false);
				}}
			/>
		);
	} else {
		return (
			<PopupComponent
				openModalCallback={() => {
					handleUpdateCommunicationComponent(true);
				}}
			/>
		);
	}
};
