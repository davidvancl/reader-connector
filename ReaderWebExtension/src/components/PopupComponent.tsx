import React from 'react';
import { Container } from 'react-bootstrap';
import * as Unicons from '@iconscout/react-unicons';
import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';
import ServerSettingsComponent from './elements/ServerSettingsComponent';
import QuickActionComponent from './elements/QuickActionComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@assets/css/popup.css';
import AlertComponent from './elements/AlertComponent';
import useAlert from '@contexts/hooks/UseAlert';
import browser from 'webextension-polyfill';
import { isBrowserFirefox } from '@utils/BrowserDetector';

function PopupComponent() {
	const { setAlert } = useAlert();

	return (
		<div data-testid='popup-body'>
			<Container
				data-testid='setting-body'
				style={{ height: 50 }}>
				<AlertComponent />
			</Container>
			<ServerSettingsComponent />
			<Container>
				<div className='my-3 p-3 bg-white rounded box-shadow'>
					<h6 className='border-bottom border-gray pb-2 mb-0'>Quick actions</h6>

					{isBrowserFirefox() ? (
						<QuickActionComponent
							dataTestid='popup-permission'
							title='Permission request'
							actionTitle='Request'
							description='Requests permission to send data to the page'
							icon={<Unicons.UilLockOpenAlt style={{ height: 32, width: 32 }} />}
							callback={() => {
								browser.permissions
									.request({ origins: ['<all_urls>'] })
									.then(() => {
										setAlert('Requested! Check behind popup?', 'success');
									})
									.catch(() => {
										setAlert('Something happend!', 'error');
									});
							}}
						/>
					) : (
						<></>
					)}

					{isBrowserFirefox() ? (
						<QuickActionComponent
							dataTestid='popup-reload'
							title='Reload extension'
							actionTitle='Reload'
							description='Reloads extension with background workers'
							icon={<Unicons.UilSync style={{ height: 32, width: 32 }} />}
							callback={() => {
								browser.runtime.reload();
							}}
						/>
					) : (
						<></>
					)}

					<QuickActionComponent
						dataTestid='popup-worker'
						title='Worker message'
						actionTitle='Send'
						description='Sends message to background worker'
						icon={<Unicons.UilDatabase style={{ height: 32, width: 32 }} />}
						callback={() => {
							browser.runtime
								.sendMessage({
									trigger: Trigger.contentConfirmAction,
									value: 'Message from popup to background',
									source: Source.popupWorker
								} as ComMessage)
								.then(() => {
									setAlert('Sent!', 'success');
								})
								.catch(() => {
									setAlert('Something happend!', 'error');
								});
						}}
					/>

					<QuickActionComponent
						dataTestid='popup-client'
						title='Client message'
						actionTitle='Send'
						description='Sends message to active page'
						icon={<Unicons.UilUser style={{ height: 32, width: 32 }} />}
						callback={() => {
							browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
								browser.tabs
									.sendMessage(Number(tabs[0].id), {
										trigger: Trigger.onTabActivation,
										value: 'Message from popup to content',
										source: Source.backgroundWorker
									} as ComMessage)
									.then(() => {
										setAlert('Sent!', 'success');
									})
									.catch(() => {
										setAlert('Something happend!', 'error');
									});
							}, console.error);
						}}
					/>

					<small className='d-block text-right mt-3'>
						<a href='https://github.com/davidvancl/reader-connector/issues'>All suggestions</a>
					</small>
				</div>
			</Container>
		</div>
	);
}

export default PopupComponent;
