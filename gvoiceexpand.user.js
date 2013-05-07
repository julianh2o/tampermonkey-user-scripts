// ==UserScript==
// @name       Gvoice Expand
// @namespace  http://www.julianhartline.com/
// @version    0.17
// @description  This script gets rid of the "click to view all" button in google voice's web interface in favor of a scroll pane with all messages
// @match      https://www.google.com/voice*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @copyright  2013+, Julian Hartline
// ==/UserScript==

//console.log("foo");
//var $a = $("<a href='#'>Click Me</a>");
//$a.css({background:"white","border":"1px solid grey","padding":"5px","z-index":"1000","position":"absolute","top":"124px"});
setInterval(function() {
    $(".gc-message").each(function() {
        if ($(this).is(".processed")) return;
        $(this).addClass("processed");
        
        $(".gc-message-sms-show",this).remove();
        
        var $container = $(".gc-message-message-display",this);
        var $rows = $(".gc-message-sms-row",this);
        $rows.detach();
        
        $container.append($rows);
        $container.css({"overflow-y":"scroll","border":"1px solid #bbb","padding":"5px"});
        if ($container.height() > 300) $container.css("height","300px");
        

	var $links = $("<div />");
	var $expand = $("<a href='#'>Expand</a>");
	var $contract = $("<a href='#'>Contract</a>");
	$links.append($expand).append($contract);
	$(".gc-message-player",this).prepend($links);
	$contract.hide();

	$container.scrollTop($container[0].scrollHeight);

	$expand.click(function() {
		$expand.hide();
		$contract.show();
		$container.css("height","auto");
	});

	$contract.click(function() {
		$expand.show();
		$contract.hide();
		$container.css("height","300px");
	});
    });
    
},200);
