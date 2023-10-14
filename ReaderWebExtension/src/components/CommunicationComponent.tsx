import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@assets/css/popup.css';
import AlertComponent from './elements/AlertComponent';
import useAlert from '@contexts/hooks/UseAlert';
import * as Unicons from '@iconscout/react-unicons';
import { Trigger } from '@utils/MessangerUtil';
import QuickActionComponent from './elements/QuickActionComponent';
import { sendTabMessage, sendWorkerMessage } from '@utils/BrowserUtil';

interface IProps {
	closeModalCallback: () => void;
}

function CommunicationComponent(props: IProps) {
	const [clientMessage, setClientMessage] = useState<string>('');
	const [workerMessage, setWorkerMessage] = useState<string>('');
	const { setAlert } = useAlert();

	return (
		<div data-testid='popup-body'>
			<Container>
				<div
					className='my-3 bg-white rounded'
					style={{ cursor: 'pointer' }}
					onClick={() => {
						props.closeModalCallback();
					}}>
					<h6 className='border-bottom border-gray pb-2 mb-0'>
						<Unicons.UilPrevious style={{ height: 18, width: 18 }} /> Back
					</h6>
				</div>
			</Container>
			<Container
				data-testid='setting-body'
				style={{ height: 50 }}>
				<AlertComponent />
			</Container>
			<Container>
				<div className='my-3 p-3 bg-white rounded box-shadow'>
					<h6 className='border-bottom border-gray pb-2 mb-0'>Comunication actions</h6>

					<QuickActionComponent
						dataTestid='popup-worker'
						title='Worker message'
						actionTitle='Send'
						description='Sends message to background worker'
						icon={<Unicons.UilDatabase style={{ height: 32, width: 32 }} />}
						inputCallback={(value: string) => {
							setWorkerMessage(value);
						}}
						callback={() => {
							sendWorkerMessage(workerMessage, Trigger.plainTextMessage, setAlert);
							setWorkerMessage('');
						}}
					/>

					<QuickActionComponent
						dataTestid='popup-client'
						title='Client message'
						actionTitle='Send'
						description='Sends message to active page'
						icon={<Unicons.UilUser style={{ height: 32, width: 32 }} />}
						inputCallback={(value: string) => {
							setClientMessage(value);
						}}
						callback={() => {
							sendTabMessage(clientMessage, Trigger.plainTextMessage, setAlert);
							setClientMessage('');
						}}
					/>
				</div>
			</Container>
		</div>
	);
}

export default CommunicationComponent;
