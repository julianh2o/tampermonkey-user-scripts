// ==UserScript==
// @name       Github Issue Link Copy
// @namespace  http://use.i.E.your.homepage/
// @version    0.9
// @description  Clicking on the "Issue #xyz" text will give you a prompt with text to copy to the commit message
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @match      https://github.com/*
// @copyright  2012+, You
// ==/UserScript==

function reduceWhitespace(str) {
    str = str.replace(/\n/g," ");
    str = str.replace(/ +/g," ");
    str = str.replace(/^ +/g,"");
    str = str.replace(/ +$/g,"");
    return str;
}

$(".issue-head .number").click(function() {
    var title = reduceWhitespace($(this).text());
    var description = reduceWhitespace($(".discussion-topic-title").text());

    var body = title+": "+description;
    prompt(title,body);
});
