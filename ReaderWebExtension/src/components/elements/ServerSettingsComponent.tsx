import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import useAlert from '@contexts/hooks/UseAlert';
import { getStorageValue, isBrowserFirefox, saveStorageValue } from '@utils/BrowserUtil';
import IPAddressPartComponent, { IOption } from './IPAddressPartComponent';

function ServerSettingsComponent() {
	const [ippt1, setIppt1] = useState<IOption>({ value: '', label: '' });
	const [ippt2, setIppt2] = useState<IOption>({ value: '', label: '' });
	const [ippt3, setIppt3] = useState<IOption>({ value: '', label: '' });
	const [ippt4, setIppt4] = useState<IOption>({ value: '', label: '' });

	const [keepAlive, setKeepAlive] = useState<boolean>(false);
	const { setAlert } = useAlert();

	useEffect(() => {
		getStorageValue(
			'web_socket_server_ip',
			(value: any) => {
				const ipParts = String(value).split('.');

				setIppt1({ value: ipParts[0] ?? '', label: ipParts[0] ?? '' });
				setIppt2({ value: ipParts[1] ?? '', label: ipParts[1] ?? '' });
				setIppt3({ value: ipParts[2] ?? '', label: ipParts[2] ?? '' });
				setIppt4({ value: ipParts[3] ?? '', label: ipParts[3] ?? '' });
			},
			setAlert
		);

		getStorageValue(
			'keep_connection_alive',
			(value: any) => {
				setKeepAlive(Boolean(value));
			},
			setAlert
		);
	}, []);

	const handleSetOnClick = () => {
		saveStorageValue('web_socket_server_ip', `${ippt1.value}.${ippt2.value}.${ippt3.value}.${ippt4.value}`, setAlert);
	};

	const handleKeepAliveChange = (e: any) => {
		setKeepAlive(!keepAlive);
		saveStorageValue('keep_connection_alive', !keepAlive, setAlert);
	};

	return (
		<Container data-testid='setting-body'>
			<label className='form-label text-primary fw-bold'>Server address</label>
			<div className='input-group mb-3'>
				<span className='input-group-text text-primary'>IP:</span>

				<IPAddressPartComponent
					placeholder='192'
					quartal={1}
					defaultValue={ippt1}
					callback={setIppt1}
				/>

				<IPAddressPartComponent
					placeholder='168'
					quartal={2}
					defaultValue={ippt2}
					callback={setIppt2}
				/>

				<IPAddressPartComponent
					placeholder='2'
					quartal={3}
					defaultValue={ippt3}
					callback={setIppt3}
				/>

				<IPAddressPartComponent
					placeholder='25'
					quartal={4}
					defaultValue={ippt4}
					callback={setIppt4}
				/>

				<Button
					data-testid='setting-set-button'
					variant='primary'
					onClick={handleSetOnClick}>
					Save
				</Button>
			</div>

			<div className='input-group mb-3'>
				<span className='input-group-text text-primary'>PORT:</span>
				<input
					type='text'
					className='form-control'
					aria-label='Sizing example input'
					aria-describedby='inputGroup-sizing-sm'
					value={process.env.WEBSOCKET_PORT}
					disabled
				/>
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
