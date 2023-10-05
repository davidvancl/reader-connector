// @ts-nocheck

import type { Browser } from "webextension-polyfill";
import { deepMock } from "mockzilla";
const [browser, mockBrowser, mockBrowserNode] = deepMock<Browser>("browser", false);
jest.mock("webextension-polyfill", () => browser);

import React from 'react';
import ServerSettingsComponent from "@components/elements/ServerSettingsComponent"
import { render, screen } from '@testing-library/react';

jest.mock('@components/elements/ServerSettingsComponent');

describe("Web-Extension Helpers", () => {
    beforeEach(() => mockBrowserNode.enable());

    afterEach(() => mockBrowserNode.verifyAndDisable());


    it("should return active tabs", async () => {
        // render(<ServerSettingsComponent />);
    });
});