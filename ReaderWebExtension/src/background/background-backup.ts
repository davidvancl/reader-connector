// import browser from 'webextension-polyfill';

//background.ts
import { browser, Runtime } from "webextension-polyfill-ts";
import { BackgroundMessages, ContentScriptMessages, IMessage, MessageListener, Messenger } from "@components/Messanger";

class Background {
  requests = new Map<BackgroundMessages, MessageListener>();

  async receiveHello(sender: Runtime.MessageSender, data: IMessage<any>) {
    console.log("receiveHelloFromContentScript: ", data);
    return {
      message: "Hey there!!!",
    };
  }

  async receiveBye(sender: Runtime.MessageSender, data: IMessage<any>) {
    console.log("receiveByeFromContentScript: ", data);
    return {
      message: "Bye there!!!",
    };
  }

  async sayHelloToContentScript(tabID: number) {
    await Messenger.sendMessageToContentScript(
      tabID,
      ContentScriptMessages.SAY_HELLO_TO_CS,
      { message: "Hello from BG!!!" }
    );
  }

  async sayByeToContentScript(tabID: number) {
    await Messenger.sendMessageToContentScript(
      tabID,
      ContentScriptMessages.SAY_BYE_TO_CS,
      { message: "Bye from BG!!!" }
    );
  }

  registerMessengerRequests() {
    this.requests.set(BackgroundMessages.SAY_HELLO_TO_BG, this.receiveHello);
    this.requests.set(BackgroundMessages.SAY_BYE_TO_BG, this.receiveBye);
  }

  listenForMessages() {
    browser.runtime.onMessage.addListener((message, sender) => {
      const { type, data } = message;
      return this.requests.get(type)(sender, data);
    });
  }
  // Example: Send message to content script of active tab
  sendHelloToActiveTab() {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      tabs.forEach((tab) => {
        this.sayHelloToContentScript(Number(tab.id));
      });
    });
  }

  handleTabsUpdate(tabId: any, changeInfo: any, tabInfo: any) {
    console.log(`Updated tab: ${tabId}`);
    // console.log('Changed attributes: ', changeInfo);
    // console.log('New tab Info: ', tabInfo);

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      tabs.forEach((tab) => {
        this.sayHelloToContentScript(Number(tab.id));
      });
    });
  }

  init() {
    // 1. Create a mapping for message listeners
    this.registerMessengerRequests();

    // 2. Listen for messages from background and run the listener from the map
    this.listenForMessages();

    browser.tabs.onUpdated.addListener(this.handleTabsUpdate);
  }
}

new Background().init();