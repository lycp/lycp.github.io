$(document).ready(function() {

	/**** ALL PAGES ****/

    //Client side incudes
    $("[data-include]").each(function(){
        var that = $(this);
        that.load(that.attr('data-include'), function(){
            //that.contents().unwrap();
        }); 
    });

	//IE support message
    if ($("html").is(".ie6, .ie7, .ie8")) {
    	$("body").prepend("<div id='old-ie'><span>You appear to be using an old version of Internet Explorer to access the site. Sadly we don't support this version. Please upgrade.</span></div>");
    }
});

$(window).load(function(){

    //sidebar twitter feed
    var twitterConfig = {
	  "id": '524291744788004864',
	  "domId": 'twitter-feed',
	  "maxTweets": 3,
	  "enableLinks": true, 
	  "showUser": true,
	  "showTime": false,
	  "showInteraction":false,
	  "lang": 'en'
	};
	twitterFetcher.fetch(twitterConfig);
	
});