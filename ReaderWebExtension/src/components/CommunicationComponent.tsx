import React from 'react';
import QuickActionComponent from './QuickActionComponent';
import TextAreaComponent from './TextAreaComponent';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@assets/style.css';
import * as Unicons from '@iconscout/react-unicons';
import browser from 'webextension-polyfill';
import { ComMessage, Source, Trigger } from '@utils/MessangerUtil';

function CommunicationComponent() {
	const handlePermissionRequest = () => {
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
		<Container fluid>
			<div className='layout_main'>
				<div className='service_section layout_padding'>
					<Container>
						<Row>
							<Col className='col-sm-12'>
								<h1 className='service_taital'>Quick Actions</h1>
							</Col>
						</Row>
						<div className='service_section_2'>
							<Row>
								<QuickActionComponent
									icon={
										<Unicons.UilUnlockAlt
											className='action-icon'
											width='64'
											height='64'
										/>
									}
									title='Permissions'
									actionName='Request'
									actionCallback={handlePermissionRequest}
								/>
								<QuickActionComponent
									icon={
										<Unicons.UilSync
											className='action-icon'
											width='64'
											height='64'
										/>
									}
									title='Reload'
									actionName='Reload'
									actionCallback={handleReload}
								/>
								<QuickActionComponent
									icon={
										<Unicons.UilServerConnection
											className='action-icon'
											width='64'
											height='64'
										/>
									}
									title='Background'
									actionName='Send'
									actionCallback={handleSendDataToBacground}
								/>
								<QuickActionComponent
									icon={
										<Unicons.UilWindow
											className='action-icon'
											width='64'
											height='64'
										/>
									}
									title='Page'
									actionName='Send'
									actionCallback={handleSendDataToContent}
								/>
							</Row>
						</div>
					</Container>
				</div>
				<div className='testimonial_section layout_padding'>
					<Container>
						<Row>
							<div className='col-sm-12'>
								<h1 className='testimonial_taital'>Info Panels</h1>
							</div>
						</Row>
						<div
							className='carousel slide'
							data-ride='carousel'>
							<div className='carousel-inner carousel-item active testimonial_section_2'>
								<Row>
									<TextAreaComponent
										title='First implementation'
										body='26.09.2023'
									/>
									<TextAreaComponent
										title='Test'
										body='test'
									/>
								</Row>
							</div>
						</div>
					</Container>
				</div>
			</div>
		</Container>
	);
}

export default CommunicationComponent;
