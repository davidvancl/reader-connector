// @ts-nocheck

import React from 'react';
import { render, screen } from '@testing-library/react';
import CommunicationComponent from '@components/CommunicationComponent';
import { act } from 'react-test-renderer';
jest.mock('webextension-polyfill', () => {
	return { __esModule: true, default: browser };
});

describe('Test component: CommunicationComponent', () => {
	let languageGetter;

	beforeEach(() => {
		languageGetter = jest.spyOn(navigator, 'userAgent', 'get');
	});

	it('Test with browser mock: renders correctly with data', async () => {
		languageGetter.mockReturnValue('firefox');

		await act(async () => render(<CommunicationComponent />));

		const worker = screen.getByTestId('popup-worker');
		expect(worker).toBeDefined();

		const client = screen.getByTestId('popup-client');
		expect(client).toBeDefined();
	});
});
