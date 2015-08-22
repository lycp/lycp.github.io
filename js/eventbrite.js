/* 
 * Eventbrite event loader by @tomedwardsmith.  
 */
$(document).ready(function(){
	Eventbrite({'app_key': "Z42TVQ3L6ANDRGO3UT"}, function(eb){
  		eb.user_list_events( {'user': 'info@lycp.org.uk', 'statuses': "live"}, function( response ){
        $("#special-events-list").empty();
        if (response.events.length > 0) 
  			{
  				for (var i = 0; i < response.events.length; i++) {
            var event = response.events[i].event;
            /*
            * The date will be of the form: "2015-03-18 18:30:00" 
            * need to parse this into an iso string e.g. 2011-06-02T09:34:29+02:00
            * Using moment.js to handle this
            */
            var eventDate = moment(event.start_date, "YYYY-MM-DD HH:mm:ss");
            var venueUrl = "http://maps.google.com/maps?t=m&q=" + encodeURIComponent(event.venue.name) + "&loc:" + encodeURIComponent(event.venue.latitude) + "+" + encodeURIComponent(event.venue.longitude);
    				$("#special-events-list").append(
              "<div class='special-event'>" +
                "<div class='event-intro clearfix'>" +
                  "<div class='eight columns alpha'>" + 
                    "<h3>" + event.title + "</h3>" + 
                    "<p><strong>Date:</strong> " + eventDate.date().toString() + "/" + (eventDate.month() + 1).toString() + "/" + eventDate.year().toString() + "&nbsp;" +
                    "<strong>Time:</strong> " + eventDate.hours().toString() + ":" + eventDate.minutes() + "<br/>" +
                    "<strong>Venue:</strong> <a href='" + venueUrl + "' target='_blank'>" + event.venue.name + "</a></p>" +
                    "<a class='button' href='" + event.url + "' target='_blank'>Get tickets</a>" +
                  "</div>" +
                  "<div class='four columns omega imagecontainer'>" + 
                    "<a href='" + event.url + "' target='_blank'>" +  
                      "<img src='" + event.logo + "' alt='Event Logo' />" +
                    "</a>" +
                  "</div>" +
                "</div>" +
                "<div class='description'>" + event.description + "</div>" +
                "</div>"
              );
				  }
  			} else 
        {
          $("#special-events-list").append("<p>No current events</p>");
        }
	  	});
	});
});