import React from 'react';
import { InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import browser from 'webextension-polyfill';
import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';

function CommunicationComponent() {
	const handleClick = () => {
		browser.permissions.request({ origins: ['<all_urls>'] });
	};

	const handleReload = () => {
		browser.runtime.reload();
	};

	const handleSendDataToBacground = () => {
		browser.runtime.sendMessage({
			trigger: Trigger.contentConfirmAction,
			value: 'Message from popup to background',
			source: Source.contentWorker
		} as ComMessage);
	};

	const handleSendDataToContent = () => {
		browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
			browser.tabs.sendMessage(Number(tabs[0].id), {
				trigger: Trigger.onTabActivation,
				value: 'Message from popup to content',
				source: Source.backgroundWorker
			} as ComMessage);
		}, console.error);
	};

	return (
		<>
			<InputGroup>
				{/* <InputGroup.Text>With textarea</InputGroup.Text> */}
				{/* <Form.Control
          as="textarea"
          onChange={updateText}
          aria-label="With textarea"
        /> */}
				<button onClick={handleClick}>Opravneni</button>
				<button onClick={handleReload}>Reload</button>

				<button onClick={handleSendDataToBacground}>Background</button>
				<button onClick={handleSendDataToContent}>Content</button>
			</InputGroup>
		</>
	);
}

export default CommunicationComponent;
