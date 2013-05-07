// ==UserScript==
// @name       Eve Market
// @namespace   http://www.julianhartline.com/
// @version     0.02
// @description Displays the worth of each row in the table
// @match       http://eve-central.com/home/quicklook.html*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @copyright   2013+, You
// ==/UserScript==

function round(num,n) {
    var mul = Math.pow(10,n);
    return Math.round(num * mul) / mul;
}

function num(str) {
    str = str.replace(",","");
    return parseFloat(str);
}

function addCommas(nStr) {
    console.log("add commas",nStr);
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function fmtNum(num,decimals) {
    var str = addCommas(round(num,decimals));
    if (str.indexOf(".") > 0 && str.indexOf(".") > str.length - 3) {
        str = str + "0";
    }
    return str;
}

function fmtIsk(isk) {
    var suffix = " isk";
    var M = 1000000;
    var B = 1000*M;
    if (isk > B) {
        isk = isk / B;
        return fmtNum(isk,2)+"B" + suffix;
    } else if (isk > M) {
        isk = isk / M;
        return fmtNum(isk,2)+"M" + suffix;
    }
    return fmtNum(isk,2) + suffix;
}

$("#sell_orders tr").each(function() {
	var $td = $(this).find("td");
    if (!$td.length) {
        var $th = $(this).find("th");
        $th.eq(3).after("<th>Worth</th>");
        return;
    }
    var price = num($td.eq(2).text());
    var qty = num($td.eq(3).text());
	var worth = price * qty;
    $td.eq(3).after("<td>"+fmtIsk(worth)+"</td>");
});

