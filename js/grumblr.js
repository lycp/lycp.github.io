/* Grumblr post loader by @tomedwardsmith. 
 * Props to Jan Zheng for pointing me in the right direction 
 * (http://janzheng.com/2013/06/tumblr_integration.html) 
 */
$(document).ready(function() {
  var postId = $("#grumblr-loader").data("postid");
  if (postId > 0) 
  {
    $.getScript("http://londongrumblr.co.uk/api/read/json?id=" + postId).done(function(script, textStatus) {
      var thePost = tumblr_api_read.posts[0];
      $("#grumblr").empty();
      $("#grumblr").append("<h3>" + thePost["regular-title"] + "</h3>")
        .append(thePost["regular-body"])
        .append("<p class='grumblr-link'>Via <a target='_blank' href='" + thePost["url"] + "'>London Grumblr</a></p>");
    });
  }
});