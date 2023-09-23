// content-script.ts
// Install webextension-polyfill for JavaScript based projects
import { browser } from "webextension-polyfill-ts";
import { BackgroundMessages, ContentScriptMessages, Messenger } from "@components/Messanger";

class ContentScript {
    requests = new Map();

    async receiveHello(sender: any, data: any) {
        console.log(`receiveHelloFromBackground: `, data);
    }

    async receiveBye(sender: any, data: any) {
        console.log(`receiveByeFromBackground: `, data);
    }

    async sayHelloToBackground() {
        const response = await Messenger.sendMessageToBackground(
            BackgroundMessages.SAY_HELLO_TO_BG,
            { message: "Hello Background!!!" }
        );
        console.log("Background Response: ", response);
    }

    async sayByeToBackground() {
        await Messenger.sendMessageToBackground(BackgroundMessages.SAY_BYE_TO_BG, {
            message: "Bye Background!!!",
        });
    }

    registerMessengerRequests() {
        this.requests.set(ContentScriptMessages.SAY_HELLO_TO_CS, this.receiveHello);
        this.requests.set(ContentScriptMessages.SAY_BYE_TO_CS, this.receiveBye);
    }

    listenForMessages() {
        browser.runtime.onMessage.addListener((message, sender) => {
            const { type, data } = message;
            return this.requests.get(type)(sender, data);
        });
    }

    init() {
        // 1. Create a mapping for message listeners
        this.registerMessengerRequests();

        // 2. Listen for messages from background and run the listener from the map
        this.listenForMessages();
    }
}

new ContentScript().init();
