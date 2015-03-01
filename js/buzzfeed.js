/* Buzz Feed Open Graph Scraper by @tomedwardsmith 
 * To use:
 * 1) paste BuzzFeed link into https://developers.facebook.com/tools/debug/
 * 2) click 'Debug'
 * 3) Scroll down to 'URLs' section at bottom of page
 * 4) Copy number portion of 'Graph API' url

    Markup sample

    <div id="buzzfeed"></div>
    <script async type="text/javascript" id="buzzfeed-loader" data-postid="593549374104827" src="/js/buzzfeed.js"></script>

 */
$(document).ready(function() {
    var postId = $("#buzzfeed-loader").data("postid");
    if (postId > 0) {
        var graphIdRequestUrl = "http://graph.facebook.com/" + postId;
        $.ajax({
            url: graphIdRequestUrl,
            type: "get",
            dataType: "",
            success: function(response) {
                $("#buzzfeed").append("<h3>" + response.title + "</h3>")
                    .append("<p class='buzfeed-image'><img src='" + response.image[0].url + "'/></p>")
                    .append("<p>" + response.description + "</p>")
                    .append("<p class='buzzfeed-link'>Via <a target='_blank' href='" + response.url + "'>BuzzFeed</a></p>");       
            },
            error: function(status) {
                //console.log("request error:"+url);
            }
        });
    }
});