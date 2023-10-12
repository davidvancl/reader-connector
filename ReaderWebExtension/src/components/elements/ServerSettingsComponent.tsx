import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAlert from '@contexts/hooks/UseAlert';
import { isBrowserFirefox } from '@utils/BrowserDetector';
import browser from 'webextension-polyfill';

function ServerSettingsComponent() {
	const [ipAddress, setIpAddress] = useState<string>('');
	const [keepAlive, setKeepAlive] = useState<boolean>(false);
	const { setAlert } = useAlert();

	useEffect(() => {
		browser.storage.local.get('web_socket_server_ip').then(function (value) {
			setIpAddress(String(value.web_socket_server_ip));
		}).catch(() => {
			setAlert('Something happend!', 'error');
		});

		browser.storage.local.get('keep_connection_alive').then(function (value) {
			setKeepAlive(Boolean(value.keep_connection_alive));
		}).catch(() => {
			setAlert('Something happend!', 'error');
		});
	}, []);

	const handleSetOnClick = () => {
		browser.storage.local
			.set({
				web_socket_server_ip: ipAddress
			})
			.then(() => {
				setAlert('IP address updated', 'success');
			})
			.catch(() => {
				setAlert('Something happend!', 'error');
			});
	};

	const handleKeepAliveChange = (e: any) => {
		setKeepAlive(!keepAlive);
		browser.storage.local
			.set({
				keep_connection_alive: !keepAlive
			})
			.then(() => {
				setAlert('Status updated!', 'success');
			})
			.catch(() => {
				setAlert('Something happend!', 'error');
			});
	};

	return (
		<Container data-testid='setting-body'>
			<label className='form-label text-primary fw-bold'>Server address</label>
			<div className='input-group mb-3'>
				<span className='input-group-text text-primary'>IP</span>
				<input
					data-testid='setting-ip-input'
					type='text'
					defaultValue={ipAddress}
					onChange={(e) => setIpAddress(String(e.target.value))}
					className='form-control'
				/>
				<button
					data-testid='setting-set-button'
					className='btn btn-outline-primary'
					type='button'
					onClick={handleSetOnClick}>
					Set
				</button>
			</div>
			{isBrowserFirefox() ? (
				<div className='form-check form-switch'>
					<input
						className='form-check-input'
						data-testid='setting-firefox-keep-alive'
						type='checkbox'
						role='switch'
						checked={keepAlive}
						onChange={handleKeepAliveChange}
					/>
					<label className='form-check-label'>Enforcement to keep the server alive</label>
				</div>
			) : (
				''
			)}
		</Container>
	);
}

export default ServerSettingsComponent;
