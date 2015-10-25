/* 
 * Eventbrite event loader v2 by @tomedwardsmith.  
 */

$(document).ready(function() {
	var token = 'L3KAB63RCI3JNL5JLX5C';
	var organiserId = '7754446801';
	var $events = $("#special-events-list");
 		
	$.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&organizer.id='+organiserId+'&expand=venue', function(response) {
		//clear the spinner
		$events.empty();
		//if some events were returned
		if(response.events.length) {
			//for each event
			for (var i = 0; i < response.events.length; i++) {
            	var event = response.events[i];
	            /*
	            * The date will be of the form: "2015-03-18 18:30:00" 
	            * need to parse this into an iso string e.g. 2011-06-02T09:34:29+02:00
	            * Using moment.js to handle this
	            */
            	var eventDate = moment(event.start.utc, "YYYY-MM-DD HH:mm:ss");
            	var venueUrl = "http://maps.google.com/maps?t=m&q=" + encodeURIComponent(event.venue.name) + "&loc:" + encodeURIComponent(event.venue.latitude) + "+" + encodeURIComponent(event.venue.longitude);
				$events.append("<div class='special-event'>" +
	                "<div class='event-intro clearfix'>" +
	                  "<div class='eight columns alpha'>" + 
	                    "<h3>" + event.name.text + "</h3>" + 
	                    "<p><strong>Date:</strong> " + eventDate.date().toString() + "/" + (eventDate.month() + 1).toString() + "/" + eventDate.year().toString() + "&nbsp;" +
	                    "<strong>Time:</strong> " + eventDate.hours().toString() + ":" + eventDate.minutes() + "<br/>" +
	                    "<strong>Venue:</strong> <a href='" + venueUrl + "' target='_blank'>" + event.venue.name + "</a></p>" +
	                    "<a class='button' href='" + event.url + "' target='_blank'>Get tickets</a>" +
	                  "</div>" +
	                  "<div class='four columns omega imagecontainer'>" + 
	                    "<a href='" + event.url + "' target='_blank'>" +  
	                      "<img src='" + event.logo.url + "' alt='Event Logo' />" +
	                    "</a>" +
	                  "</div>" +
	                "</div>" +
	                "<div class='description'>" + event.description.html + "</div>" +
	                "</div>"
          		);
		  	}
		} else 
        {
        	$events.append("<p>No current events</p>");
        }
    });	
});