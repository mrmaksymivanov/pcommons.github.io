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

(function(){ // :)

// Default URL for animation iframe. This gets overlay'ed over your page.
var dfurl = 'https://pcommons.github.io/widget/iframe'; //http://plugin-paulcommons.rhcloud.com/iframe';


/**
--------------------------------------------------------------------------------
CONFIGURATION OPTIONS
--------------------------------------------------------------------------------
These are default configuration values for the widget. You can override any of
these by pre-defining an object named _bftn_options and setting the appropriate
properties as desired.
--------------------------------------------------------------------------------
*/

// The _bftn_options object is created if it isn't already defined by you
if (typeof _bftn_options == "undefined")
	_bftn_options = {};

// The path to the iframe that gets injected over your page
if (typeof _bftn_options.iframe_base_path == "undefined")
	_bftn_options.iframe_base_path = dfurl;

// Which design to show, either "modal" or "banner" (see _bftn_animations below)
if (typeof _bftn_options.animation == "undefined")
	_bftn_options.animation = 'modal';

// How long to delay before showing the widget
if (typeof _bftn_options.delay == "undefined")
	_bftn_options.delay = 0;

// If set to true, we will log stuff to the console
if (typeof _bftn_options.debug == "undefined")
	_bftn_options.debug = false;

// Usually a cookie is used to only show the widget once. You can override here.
if (typeof _bftn_options.always_show_widget == "undefined")
	_bftn_options.always_show_widget = false;

// Usually a cookie is used to only show the widget once. You can override here.
if (typeof _bftn_options.prepopulate_basic_info == "undefined")
	_bftn_options.prepopulate_basic_info = false;
/**
--------------------------------------------------------------------------------
ANIMATION DEFINITIONS
--------------------------------------------------------------------------------
Here's where the functionality and defaults for each of the animations (either
"modal" or "banner" to begin with). Each animation has its own options property,
which is an object containing default behaviors for that animation. These can be
overridden by passing the appropriately-named properties into the _bftn_options
object (above). This will get merged over the defaults when init is called.
--------------------------------------------------------------------------------
*/
var _bftn_animations = {

	// MODAL ANIMATION
	modal: {

		// Default options: Override these with _bftn_options object (see above)
		options: {
			modalAnimation: 'modal',
			skipEmailSignup: false,
			skipCallTool: false,
			fastAnimation: false,
			boxUnchecked: false,
			org: null
		},

		// init copies the _bftn_options properties over the default options
		init: function(options) {
			for (var k in options) this.options[k] = options[k];
			return this;
		},

		// what to do when the animation starts
		start: function() {
			var css = '#_bftn_iframe { position: fixed; left: 0px; top: 0px; \
				width: 100%; height: 100%; z-index: 100001; }'

			_bftn_util.injectCSS('_bftn_iframe_css', css);

			var iframe = _bftn_util.createIframe(this.options.modalAnimation);

			console.log(this.options.prepopulate_basic_info.firstname);
			console.log(this);

			if(this.options.prepopulate_basic_info){

				//var firstname=document.getElementById(this.options.prepopulate_basic_info.firstname).value;

				populated_fields={
	                firstname:document.getElementById(this.options.prepopulate_basic_info.firstname).value,
	                lastname:document.getElementById(this.options.prepopulate_basic_info.lastname).value,
	                middleinitial:document.getElementById(this.options.prepopulate_basic_info.middleinitial).value
	                /*
	                city:city.value,
	                state:state.value,
	                stateid:stateid.value,
	                zip:zip.value,
	                address:address.value,
	                address2:address2.value,
	                countyid:countyid.value,
	                dob:dob.value				
	                */
				};

				this.options.populated_fields=populated_fields;

			}
			_bftn_util.bindIframeCommunicator(iframe, this);
		},

		// what to do when the animation stops
		stop: function() {
			_bftn_util.destroyIframe();
		}
	}

	
}

/**
--------------------------------------------------------------------------------
UTILITY FUNCTIONS
--------------------------------------------------------------------------------
*/
var _bftn_util = {

	// Inject CSS styles into the page
	injectCSS: function(id, css)
	{
		console.log("inject CSS");
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = id;
		if (style.styleSheet) style.styleSheet.cssText = css;
		else style.appendChild(document.createTextNode(css));

		console.log(style);
		document.head.appendChild(style);
	},

	// Create the iframe used to display the animation  
	createIframe: function(animation) {
		console.log("create Iframe");
		console.log(animation);
		var iframe = document.createElement('iframe');
		iframe.id = '_bftn_iframe';
		iframe.src = _bftn_options.iframe_base_path + '/' + animation + '.html';
		iframe.frameBorder = 0;
		iframe.allowTransparency = true; 
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		return iframe;
	},

	// Destroy the iframe used to display the animation
	destroyIframe: function() {
		//var iframe = document.getElementById('_bftn_iframe');
		//iframe.parentNode.removeChild(iframe);
	},

	// Sends / receives event messages to the iframe (IE9+)
	// Necessary because the iframe lives on a different domain and we can't
	// just call Javascript functions to/from it due to XSS protections.
	bindIframeCommunicator: function(iframe, animation) {
		console.log("IN IFRAME BITCHES");
		console.log(iframe);
//		console.log("test1");
		var sendMessage = function(requestType, data)
		{
			data || (data = {});
			data.requestType = requestType;
			data.BFTN_WIDGET_MSG = true;
			data.HOST_NAME = hostname;
			iframe.contentWindow.postMessage(data, '*');
		}
//console.log("test2");
		var method = window.addEventListener ? "addEventListener":"attachEvent";
		var eventer = window[method];
		var messageEvent = method == "attachEvent" ? "onmessage":"message";

		var hostname = this.getHostname();
//console.log("test3");
		eventer(messageEvent,function(e) {
			if (!e.data || !e.data.BFTN_IFRAME_MSG)
				return;

			delete e.data.BFTN_IFRAME_MSG;

			switch (e.data.requestType) {
				case 'getAnimation':
					iframe.style.display = 'block';
					sendMessage('putAnimation', animation.options);
					break;
				case 'stop':
					animation.stop();
					break;
			}
		}, false);
		console.log("test1");

	},

	// Set a cookie. Used to only show the widget once (unless you override).
	setCookie: function(name,val,exdays)
	{
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = name + "=" + val + "; " + expires;
	},

	// Get the cookie. Used to only show the widget once.
	getCookie: function(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++)
  		{
  			var c = ca[i].trim();
  			if (c.indexOf(name)==0)
  				return c.substring(name.length,c.length);
  		}
		return "";
	},

	// Get the hostname of the web page. Used to track stats for leaderboards
	getHostname: function() {
		var hostname = window.location.host.replace('www.', '');
		return hostname;
	},

	// If _bftn_options.debug is on, then console.log some stuff
	log: function() {
		if (_bftn_options.debug)
			console.log.apply(console, arguments);
	}
}
/**
--------------------------------------------------------------------------------
MAIN FUNCTIONALITY (called once the page is ready)
--------------------------------------------------------------------------------
*/
var ready = function() {

	console.log("in ready");
	// Should we show the widget, regardless?
	//var url_override = window.location.href.indexOf('SHOW_BFTN_WIDGET') > -1;
	var url_override=true;
console.log(url_override);
console.log("Test0");
	if (!_bftn_options.always_show_widget && url_override == false) {
		// Only show once.
console.log("Test1");
		if (_bftn_util.getCookie('_BFTN_WIDGET_SHOWN')) {
			console.log("Cookies");
			return;
		}

		// Only show on September 10th 2014.
		// JL HACK ~ remove before the end of September >_>
		if (new Date().getDate() < 10) {
			console.log("Date");
			return;
		}
	}
console.log("Test2");
	_bftn_util.setCookie('_BFTN_WIDGET_SHOWN', 'true', 365);
console.log("Test3");
	// JL HACK ~ Force iPhone / iPod to show banner while we fix issues
	if(/(iPhone|iPod)/g.test(navigator.userAgent))
		_bftn_options.animation = 'banner';

	if (typeof _bftn_animations[_bftn_options.animation] == "undefined")
		return _bftn_util.log('Animation undefined: '+_bftn_options.animation);

	var animation = _bftn_animations[_bftn_options.animation];
console.log("Test4");
	var images = new Array()
	var preloaded = 0;
console.log("Test5");
	setTimeout(function() {
		animation.init(_bftn_options).start();
	}, _bftn_options.delay);
}

var bindRetroTaxBtn = function() {
	var myEl = document.getElementById('rt_widget');
	if (typeof(myEl) != 'undefined' && myEl != null){
		console.log(myEl);
		document.getElementById('rt_widget').addEventListener('click', function(e) {
			console.log(e);
			ready();
		}, false);

	}
}











//Its a good idea to use this technique on any widget that is intended to be injected into arbitrary webpages (even if there is no existing angular.js app there). For the safety of our own app, and the  
//protection of the host page’s scripts, we should always avoid polluting the global namespace with data specific to our module.

/*
if(typeof angular != 'undefined') {
  // Save a copy of the existing angular for later restoration
  var existingWindowDotAngular = window.angular;
}


// create a new window.angular and a closure variable for 
// angular.js to load itself into
var angular = (window.angular = {});

  
   //Copy-paste angular.js and modules here. They will load themselves into
   //the window.angular object we just created (which is also aliased as "angular")
   



// notice this refers to the local angular variable declared above, not
// window.angular
angular.module('RetroTax', ['ngSanitize']);

 

var app = angular.module("app", ['ngRoute','ui.bootstrap','ngMask']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider.
		when("/employee",
			{	templateUrl: "/assets/js/tcid/views/employee_screen.html",
				controller: "ctlEmployee"});
	$locationProvider.html5Mode(true);
});





//Manually bootstrap so the old angular version doesn't encounter ng-app='MyWidget' and blow up
angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById('retrotax-widget', ['RetroTax']);

    // restore the old angular version
    window.angular = existingWindowDotAngular;
});

*/


document.addEventListener("DOMContentLoaded", function(event) { 
  bindRetroTaxBtn();
});


})(); // :)
