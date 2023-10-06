// @ts-nocheck

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PopupComponent from "@components/PopupComponent";
import { act } from 'react-test-renderer';
jest.mock('webextension-polyfill', () => { return { __esModule: true, default: browser } });


describe("Test component: PopupComponent", () => {

    it("Test with browser mock: renders correctly with data", async () => {
        await act(async () => render(<PopupComponent />));

        // Checks body
        const body = screen.getByTestId("popup-body");
        expect(body).toBeDefined();

        // Checks actions
        const permission = screen.getByTestId("popup-permission");
        expect(permission).toBeDefined();

        const reload = screen.getByTestId("popup-reload");
        expect(reload).toBeDefined();

        const worker = screen.getByTestId("popup-worker");
        expect(worker).toBeDefined();

        const client = screen.getByTestId("popup-client");
        expect(client).toBeDefined();
    });
});