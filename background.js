// triggered when user clicks on installed extention icon
chrome.browserAction.onClicked.addListener(function (tab) {

    let url = tab.url;

    // clear all cookies for the current url
    chrome.cookies.getAll({ url: url }, function (cookies) {
        console.log("Clearing cookies for active urL", url, cookies);
        clearCookies(cookies);
    });

    // retrive domain from active tab
    let matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    let domain = matches && matches[1].replace('www.', '');
    domain = "." + domain;

    // get all cookies for domain
    chrome.cookies.getAll({ domain: domain }, function (cookies) {
        console.log("Clearing cookies for domain", domain, cookies);
        clearCookies(cookies);
    });
});

function clearCookies(cookies) {
    // iterate on cookie to get cookie detail
    for (let i = 0; i < cookies.length; i++) {
        let url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
        let cname = cookies[i].name;

        // delete cookie
        chrome.cookies.remove({
            url: url,
            name: cname
        });
    }
}