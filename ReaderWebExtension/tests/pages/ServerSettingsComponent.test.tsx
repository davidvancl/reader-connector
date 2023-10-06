// @ts-nocheck

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-test-renderer';
import ServerSettingsComponent from "@components/elements/ServerSettingsComponent"
jest.mock('webextension-polyfill', () => { return { __esModule: true, default: browser } });

describe("Test component: ServerSettingsComponent", () => {
    beforeAll(() => {
        const localStorageMock = (function () {
            let store = {};
            return {
                get(key) { return store[key]; },
                set(key, value) { store[key] = value; }
            };
        })();
        Object.defineProperty(browser, "storage", { local: localStorageMock });
    });

    it("Test with browser mock: renders correctly with data", async () => {
        await act(async () => render(<ServerSettingsComponent />));

        // Checks body
        const body = screen.getByTestId("setting-body");
        expect(body).toBeDefined();

        // Checks input IP
        const input = screen.getByTestId("setting-ip-input");
        fireEvent.change(input, { target: { value: '192.168.2.98' } });
        expect(input.value).toBe('192.168.2.98')

        // Checks set button
        const button = screen.getByTestId("setting-set-button");
        button.click();
        browser.storage.local.get('web_socket_server_ip').then(function (value) {
            expect(value.web_socket_server_ip).toBe('192.168.2.98');
        });
    });
});