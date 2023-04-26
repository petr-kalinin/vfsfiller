async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function sendCookies() {
    tab = await getCurrentTab();
    if (tab) {
        cookies = await chrome.cookies.getAll({ url: tab.url });
        chrome.tabs.sendMessage(tab.id, cookies);
    }
    setTimeout(sendCookies, 1000);
}

sendCookies();
