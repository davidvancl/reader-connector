import browser from 'webextension-polyfill';

function handleUpdated(tabId: any, changeInfo: any, tabInfo: any) {
  console.log(`Updated tab: ${tabId}`);
  console.log('Changed attributes: ', changeInfo);
  console.log('New tab Info: ', tabInfo);
}

browser.tabs.onUpdated.addListener(handleUpdated);
