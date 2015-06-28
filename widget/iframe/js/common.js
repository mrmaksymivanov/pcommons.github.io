/*
 @licstart  The following is the entire license notice for the
    JavaScript code in this page.
 Copyright (C) 2014 Center for Rights in Action
 Copyright (C) 2014 Jeff Lyon
 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version. The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.
 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.
 @licend  The above is the entire license notice
    for the JavaScript code in this page.
 */
(function ($) {
	$.fn.serializeObject = function () {

		var self = this,
			json = {},
			push_counters = {},
			patterns = {
				"validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
				"key": /[a-zA-Z0-9_]+|(?=\[\])/g,
				"push": /^$/,
				"fixed": /^\d+$/,
				"named": /^[a-zA-Z0-9_]+$/
			};
		this.build = function (base, key, value) {
			base[key] = value;
			return base;
		};
		this.push_counter = function (key) {
			if(push_counters[key] === undefined) {
				push_counters[key] = 0;
			}
			return push_counters[key]++;
		};
		$.each($(this).serializeArray(), function () {
			// skip invalid keys
			if(!patterns.validate.test(this.name)) {
				return;
			}
			var k,
				keys = this.name.match(patterns.key),
				merge = this.value,
				reverse_key = this.name;
			while((k = keys.pop()) !== undefined) {
				// adjust reverse_key
				reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');
				// push
				if(k.match(patterns.push)) {
					merge = self.build([], self.push_counter(reverse_key), merge);
				}
				// fixed
				else if(k.match(patterns.fixed)) {
					merge = self.build([], k, merge);
				}
				// named
				else if(k.match(patterns.named)) {
					merge = self.build({}, k, merge);
				}
			}
			json = $.extend(true, json, merge);
		});
		return json;
	};
})(jQuery);


window.addEventListener('message', function(e) {
	if (!e.data || !e.data.BFTN_WIDGET_MSG)
		return;

	delete e.data.BFTN_WIDGET_MSG;
console.log(e.data.HOST_NAME);
    if (e.data.HOST_NAME)
    {
        host = e.data.HOST_NAME;
        delete e.data.HOST_NAME;
    }
	switch (e.data.requestType) {
		case 'putAnimation':
			animations[e.data.modalAnimation].init(e.data).start();
			break;
	}

});


var sanitize = function(str)
{
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/javascript\:/gi, 'java script -');
    return str;
}

var sendMessage = function(requestType, data)
{
	data || (data = {});
	data.requestType = requestType;
	data.BFTN_IFRAME_MSG = true;
	parent.postMessage(data, '*');
}

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
 
var guid = function() {
    var _p8 = function(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}


$(document).ready(function() {
	sendMessage('getAnimation');
	$.clientSideLogging();
	// Add close button listener.
	$('.close').on('mousedown', function(e) {
		//if form does not have success class (ie submitted form) then we log info to track
		var msg={};
		msg.form=$('#frmEmployee').serializeObject();
		msg.subject="Incomplete";
		msg.username=$('#username').val();
		msg.date=new Date().toString();
		console.log(msg);
		$.info(msg);
		e.preventDefault();
		sendMessage('stop');
	});

});

var host = null;  // this will get populated with the domain of the widget install
var session = guid();

