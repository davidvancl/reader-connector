import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(function ({ txt }) {
  doSearch(txt);
});

function doSearch(txt) {
  // var searchURL = `https://www.google.com/search?q=${txt}`;
  // browser.tabs.create({ url: searchURL });
  console.log(`https://www.google.com/search?q=${txt}`);
}

function handleUpdated(activeInfo) {
  // console.log(`Updated tab: ${tabId}`);
  // console.log('Changed attributes: ', changeInfo);
  // console.log('New tab Info: ', tabInfo);
  browser.tabs.sendMessage(activeInfo.tabId, { trigger: 'getText' });
}

browser.tabs.onActivated.addListener(handleUpdated);