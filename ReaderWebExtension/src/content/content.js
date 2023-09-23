browser.runtime.onMessage.addListener(({ trigger }) => {
    if (trigger === 'getText') {
        browser.runtime.sendMessage({ trigger: 'foundText', txt: "HELLO WORLD" });
        console.log('message vole')
    }
});