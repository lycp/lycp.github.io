function processMCResponse(resp) {
	//remove any current errors
	$("#signup-form input").each(function () {
		$(this).removeClass("error");
	});
	//if success
	if (resp.result === 'success') {
		//hide everything bar success label
		$("#signup-form *:not(p.status)").each(function () {
			$(this).hide();
		});
	}
	//if failure
	else {
		//A value was missing
		if (resp.msg.indexOf("Please enter a value") > -1) 
		{
			//highlight empty fields
			$("#signup-form input[required='required']").each(function () {
				if($(this).val() == "") {
					$(this).addClass('error');
				} 
				else {
					$(this).removeClass('error');
				}
			});
		} else {
			//highlight email field
			$("#signup-form input[name='EMAIL']").addClass("error");
		}
	}
}

$(document).ready(function(){
	//Wire up form
	$("#signup-form").ajaxChimp({
		url: "//londonycp.us9.list-manage.com/subscribe/post?u=0f3337a3bbac0f8fa13007884&amp;id=c6281b8de5",
		callback: processMCResponse
	});

	//wire up radio button list change event
	 $("#signup-form div.radio input").change(function () {
        if ($(this).val() == "yes") {
        	$("#signup-form div.organisation, #signup-form div.role").show();
        } else {
        	$("#signup-form div.organisation input, #signup-form div.role input").val("");
        	$("#signup-form div.organisation, #signup-form div.role").hide();
        }
    });
});