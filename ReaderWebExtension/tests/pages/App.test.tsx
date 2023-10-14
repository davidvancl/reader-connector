// @ts-nocheck

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '@/App';
import { act } from 'react-test-renderer';
jest.mock('webextension-polyfill', () => {
	return { __esModule: true, default: browser };
});

describe('Test component: App', () => {
	it('Test with browser mock: renders correctly with data', async () => {
		await act(async () => render(<App />));

		// Checks body
		const body = screen.getByTestId('popup-body');
		expect(body).toBeDefined();
	});
});
