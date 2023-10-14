// @ts-nocheck

import React from 'react';
import { render, screen, queryByAttribute } from '@testing-library/react';
import { act } from 'react-test-renderer';
import ServerSettingsComponent from '@components/elements/ServerSettingsComponent';
jest.mock('webextension-polyfill', () => {
	return { __esModule: true, default: browser };
});

const getById = queryByAttribute.bind(null, 'id');

describe('Test component: ServerSettingsComponent', () => {
	beforeAll(() => {
		const localStorageMock = (function () {
			let store = {};
			return {
				get(key) {
					return store[key];
				},
				set(key, value) {
					store[key] = value;
				}
			};
		})();
		Object.defineProperty(browser, 'storage', { local: localStorageMock });
	});

	it('Test with browser mock: renders correctly with data', async () => {
		browser.storage.local.set({
			web_socket_server_ip: '192.168.137.137'
		});

		const dom = await act(async () => render(<ServerSettingsComponent />));

		// Checks body
		const body = screen.getByTestId('setting-body');
		expect(body).toBeDefined();

		const input1 = getById(dom.container, 'ip-input-1');
		expect(input1).toBeDefined();

		const input2 = getById(dom.container, 'ip-input-2');
		expect(input2).toBeDefined();

		const input3 = getById(dom.container, 'ip-input-3');
		expect(input3).toBeDefined();

		const input4 = getById(dom.container, 'ip-input-4');
		expect(input4).toBeDefined();

		// Checks set button
		const button = screen.getByTestId('setting-set-button');
		button.click();
		browser.storage.local.get('web_socket_server_ip').then(function (value) {
			expect(value.web_socket_server_ip).toBe('192.168.137.137');
		});

		// Checks switch to keep alive (because mock there is no mozilla)
		expect(screen.findByTestId('form-check-input')).resolves.toBe({});
	});
});
