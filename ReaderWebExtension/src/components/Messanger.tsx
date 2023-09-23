// Messenger.ts
import { browser, Runtime } from "webextension-polyfill-ts";

export enum ContentScriptMessages {
    SAY_HELLO_TO_CS,
    SAY_BYE_TO_CS,
}

export enum BackgroundMessages {
    SAY_HELLO_TO_BG,
    SAY_BYE_TO_BG,
}

export type IMessage<T> = {
    type: ContentScriptMessages | BackgroundMessages;
    data: T;
};

export type MessageListener = (
    sender: Runtime.MessageSender,
    data: IMessage<any>
) => any;

export const Messenger = {
    /**
     * Send a message to Background script
     *
     * @param {BackgroundMessage} type Background Message Type
     * @param {*} [data=null]
     * @return {*}
     */
    async sendMessageToBackground(type: any, data: any = null) {
        try {
            const response = await browser.runtime.sendMessage({ type, data });
            return response;
        } catch (error) {
            console.error("sendMessageToBackground error: ", error);
            return null;
        }
    },

    /**
     * Send a message to Content Script of a Tab
     *
     * @param {number} tabID Tab ID
     * @param {ContentScriptMessage} type
     * @param {*} [data=null]
     * @return {*}
     */
    async sendMessageToContentScript(tabID: any, type: any, data: any = null) {
        try {
            // Notice the API difference - browser.tabs to send to content script but browser.runtime to send to background.
            const response = await browser.tabs.sendMessage(tabID, { type, data });
            console.log("response:", response);
            return response;
        } catch (error) {
            console.error("sendMessageToContentScript error: ", error);
            return null;
        }
    },
};