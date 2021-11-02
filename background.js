// Inspired from https://github.com/blikenoother/ClearCookieAndReload
let remove = tab => {
    let url = tab.url;
    let each = cookies => {
        for (let i = 0; i < cookies.length; i++) {
            let url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
            let cname = cookies[i].name;

            // delete cookie
            chrome.cookies.remove({
                url: url,
                name: cname
            });
        }
    };
        
    // clear all cookies for the current url
    chrome.cookies.getAll({ url: url }, cookies => {
        console.log("Clearing cookies for active urL", url, cookies);
        each(cookies);
    });

    // retrive domain from active tab
    let matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    let domain = matches && matches[1].replace('www.', '');
    domain = "." + domain;

    // get all cookies for domain
    chrome.cookies.getAll({ domain: domain }, cookies => {
        console.log("Clearing cookies for domain", domain, cookies);
        each(cookies);
    });
};

let contextMenu = () => {
    chrome.contextMenus.create({
        "id": "ClearCookieAndReload",
        "title": "Clear Cookie and Reload",
        "documentUrlPatterns": [
            "http://*/*",
            "https://*/*"
        ]
    });
};

chrome.browserAction.onClicked.addListener(tab => {
    remove(tab);
});

chrome.contextMenus.onClicked.addListener(((info, tab) => {
    remove(tab);
}));

chrome.runtime.onStartup.addListener(contextMenu);
chrome.runtime.onInstalled.addListener(contextMenu);
