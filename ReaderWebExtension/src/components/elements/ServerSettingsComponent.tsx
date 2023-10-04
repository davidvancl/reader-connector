import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import browser from 'webextension-polyfill';

function ServerSettingsComponent() {
    const [ipAddress, setIpAddress] = useState<string>('');
    const [keepAlive, setKeepAlive] = useState<boolean>(false);

    useEffect(() => {
        browser.storage.local.get('web_socket_server_ip').then(function (value) {
            setIpAddress(value.web_socket_server_ip);
        });

        browser.storage.local.get('keep_connection_alive').then(function (value) {
            setKeepAlive(value.keep_connection_alive);
        });
    }, []);

    const handleSetOnClick = () => {
        browser.storage.local
            .set({
                'web_socket_server_ip': ipAddress
            })
            .then(() => { });
    };

    const handleKeepAliveChange = (e: any) => {
        setKeepAlive(!keepAlive);
        browser.storage.local
            .set({
                'keep_connection_alive': !keepAlive
            })
            .then(() => { });
    }

    const detectedFirefox = () => {
        return navigator.userAgent.toLowerCase().includes('firefox');
    }

    return (
        <Container>
            <label className="form-label text-primary fw-bold">Server address</label>
            <div className="input-group mb-3">
                <span className="input-group-text text-primary">IP</span>
                <input type="text" defaultValue={ipAddress} onChange={(e) => setIpAddress(e.target.value)} className="form-control" />
                <button className="btn btn-outline-primary" type="button" onClick={handleSetOnClick}>Set</button>
            </div>

            {detectedFirefox() ?
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" checked={keepAlive} onChange={handleKeepAliveChange} />
                    <label className="form-check-label" >Forcce keep server alive</label>
                </div> : ''
            }

        </Container>
    );
}

export default ServerSettingsComponent;