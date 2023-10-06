// @ts-nocheck

jest.mock('webextension-polyfill', () => { return { __esModule: true, default: browser } });
import { ContentWorker } from '@/content/content.ts';

describe("Test content script", () => {
    it("Check listener registration", async () => {
        new ContentWorker();
    });
});