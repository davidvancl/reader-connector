// @ts-nocheck

import React from 'react';
import AlertComponent from "@components/elements/AlertComponent"
import { render, screen, fireEvent } from '@testing-library/react';
import { AlertProvider } from '@contexts/AlertContext';
import { App } from "@/App";
import { act } from 'react-test-renderer';

jest.mock('webextension-polyfill', () => { return { __esModule: true, default: browser } });

describe('Test component: AlertComponent', () => {
    it('Test: renders correctly with data', async () => {
        render(
            <AlertComponent />
        );
        // Checks existence
        const body = screen.getByTestId("alert-message");
        expect(body).toBeDefined();
    });

    it('Test: AlertProvider', async () => {
        await act(async () => render(
            <AlertProvider>
                <App />
            </AlertProvider>
        ));

        // Checks existence
        const alert = screen.getByTestId("alert-message");
        expect(alert).toBeDefined();

        // Checks default value
        expect(alert.textContent).toBe("Alert messages");
    });
});