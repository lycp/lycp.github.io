/* 
 * Storify loader by @tomedwardsmith.  
 */
$(document).ready(function(){

  //Load storify stories
  $.getJSON( "https://api.storify.com/v1/stories/lycp", function( data ) {
    //hold DOM element
    var pastEventsList = $("#past-events-list");
    //empty past events list (clears spinner)
    pastEventsList.empty();
    //hold stories in variable
    var stories = data.content.stories;
    //if we have some stories
    if (stories.length > 0) 
    {
      //iterate through stories
      for (var i = 0; i < stories.length; i++) {
        var story = stories[i];
        //Work out CSS class for grid
        var cssClass = "past-event ";
        if (((i+1) %3) == 0) 
        {
          cssClass += "four columns omega clearfix"
        } 
        else if (((i+1) %3) == 1) 
        {
          cssClass += "four columns alpha clearfix"

        }
        else if (((i+1) %3) == 2) 
        {
          cssClass += "four columns clearfix"

        }
        //work out date
        var storyDate = moment(story.date.created, "YYYY-MM-DD HH:mm:ss");

        //work out CSS ID
        var cssID = "story-" + i;

        //append item
        pastEventsList.append(
          "<div id='" + cssID + "' class='"+ cssClass + "' style='background-image:url(" + story.thumbnail + ");' data-storifyurl='" + story.permalink + "' >" + 
            "<div class='overlay'>" +
              "<span class='title'>" + story.title + "</span><br/>" +
              "<span class='date'>" + storyDate.date().toString() + "/" + (storyDate.month() + 1).toString() + "/" + storyDate.year().toString() + "</span>" +
            "</div>" +
          "</div>"
        );

        //Wire up click event
        $("#" + cssID, pastEventsList).click(function(){
          //hold dom elements
          var theEvent = $(this);
          var activePastEvent = $("#active-past-event");
          //get storify url
          var url = theEvent.data("storifyurl");
          //clear active past event box 
          activePastEvent.empty();
          //check css class on active past event box for first run
          if (!(activePastEvent.hasClass("activated")))
          {
            activePastEvent.addClass("activated");
          }
          //add selected state to this story thumbnail
          $(".active", pastEventsList).each(function(){
            $(this).removeClass("active");
          });
          theEvent.addClass("active");
          //jump to active past event
          var top = $("#special-events-anchor").offset().top;
          window.scrollTo(0,top);
          //append storify embed frame to active past event box
          var htmlString = 
            "<div class='storify'>" +
              "<iframe src='" + url + "/embed?header=false&border=false&template=slideshow' width='100%'' height='450' frameborder='no' allowtransparency='true'></iframe>" +
              "<script src='" + url + ".js?header=false&border=false&template=slideshow'></script>" + 
              "<noscript>[<a href='" + url + "'' target='_blank'>View the story &quot;LYCP The Inspirationals: Ciaran Devane&quot; on Storify</a>]</noscript>" +
            "</div>"
          var pHtmlString = $.parseHTML(htmlString,document,true);
          activePastEvent.append(pHtmlString);
        });

      }
    } 
    //Handle no storifys found
    else 
    {
      pastEventsList.append("<p>No past events</p>");
    }
  });
});

