import React from 'react';
import { Container } from 'react-bootstrap';
import * as Unicons from '@iconscout/react-unicons';
import ServerSettingsComponent from './elements/ServerSettingsComponent';
import QuickActionComponent from './elements/QuickActionComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@assets/css/popup.css';
import AlertComponent from './elements/AlertComponent';
import useAlert from '@contexts/hooks/UseAlert';
import { isBrowserFirefox, reloadExtension, requestPermissions } from '@utils/BrowserUtil';

interface IProps {
	openModalCallback: () => void;
}

function PopupComponent(props: IProps) {
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
								requestPermissions(setAlert);
							}}
						/>
					) : (
						<></>
					)}

					<QuickActionComponent
						dataTestid='popup-open-com'
						title='Open communication'
						actionTitle='Open'
						description='Opens communication window.'
						icon={<Unicons.UilMessage style={{ height: 32, width: 32 }} />}
						callback={() => {
							props.openModalCallback();
						}}
					/>

					<QuickActionComponent
						dataTestid='popup-reload'
						title='Reload extension'
						actionTitle='Reload'
						description='Reloads extension with background workers'
						icon={<Unicons.UilSync style={{ height: 32, width: 32 }} />}
						callback={() => {
							reloadExtension();
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
