import browser from 'webextension-polyfill';
import { BackgroundMessageHandler } from './utils/BackgroundMessageHandler';

class BackgroundWorker {
  registerOnMessageListener(): void {
    browser.runtime.onMessage.addListener(BackgroundMessageHandler.handleMessageAction);
  }

  registerOnTabActivationListener(): void {
    browser.tabs.onActivated.addListener(BackgroundMessageHandler.handleOnTabActiveAction);
  }

  constructor() {
    this.registerOnMessageListener();
    this.registerOnTabActivationListener();
  }
}

new BackgroundWorker();
