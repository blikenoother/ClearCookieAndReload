// triggered when user clicks on installed extention icon
chrome.browserAction.onClicked.addListener(function(tab) {
    
    // retrive domain from active tab
    var url = tab.url;
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var d = matches && matches[1].replace('www.','');
    d = '.'+d;

    // get all cookies for domain
    chrome.cookies.getAll({domain: d}, function (cookies) {

        // iterate on cookie to get cookie detail
        for (var i=0; i<cookies.length; i++) {
            var url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
            var cname = cookies[i].name;

            // delete cookie
            chrome.cookies.remove({
                "url": url,
                "name": cname
            });
        }

        // reload currect active tab
        chrome.tabs.reload();
    });
});
