// @ts-nocheck

jest.mock('webextension-polyfill', () => { return { __esModule: true, 
    default: {
        tabs: {
          onActivated: {
            addListener: jest.fn(),
          },
        },
        runtime: {
          onMessage: {
            addListener: jest.fn(),
          },
        },
        storage: {
          local: {
            get(key) { return new Promise((resolve, reject) => { resolve({ })}); },
            set(key, value) { }
          }
        }
      }
} });
import { BackgroundWorker } from '@/background/background.ts';

describe("Test background script", () => {
    it("Check listeners registration (console log about missing IP expexted)", () => {
        new BackgroundWorker();
    });
});