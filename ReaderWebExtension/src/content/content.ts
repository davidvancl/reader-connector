import browser from 'webextension-polyfill';
import { ContentMessageHandler } from './utils/ContentMessageHandler';

class ContentWorker {
  registerOnMessageListener(): void {
    browser.runtime.onMessage.addListener(ContentMessageHandler.handleMessageAction);
  }

  constructor() {
    this.registerOnMessageListener();
  }
}

new ContentWorker();
