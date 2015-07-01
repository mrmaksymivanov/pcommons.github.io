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
/*
if (navigator.userAgent.indexOf('MSIE') != -1)
         var detectIEregexp = /MSIE (\d+\.\d+);/ //test for MSIE x.x
else // if no "MSIE" string in userAgent
         var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ //test for rv:x.x or rv x.x where Trident string exists

if (detectIEregexp.test(navigator.userAgent)){ //if some form of IE
         var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
    if (ieversion>=10){
                document.getElementById('modal').className = 'IE';
                document.getElementById('header').className = 'IE';
    }
}
*/

if (navigator.userAgent.indexOf('MSIE') != -1){
         var detectIEregexp = /MSIE (\d+\.\d+);/ //test for MSIE x.x
}else{ // if no "MSIE" string in userAgent
         var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ //test for rv:x.x or rv x.x where Trident string exists
}
if (detectIEregexp.test(navigator.userAgent)){ //if some form of IE
         var ieVersion=new Number(RegExp.$1) // capture x.x portion and store as a number
         document.getElementById('modal').className = 'IE';
         document.getElementById('header').className = 'IE';
}


var animations = {
    modal: {
        options: {
            debug: false,
            //skipEmailSignup: false,
            //skipCallTool: false,
            fastAnimation: false
            //boxUnchecked: false,
            //org: null
        },

        // If international, phone call functionality is disallowed
        //phoneCallAllowed: true,
        //zipcode: null,
        //default_org: 'fftf',

        init: function(options) {
            for (var k in options) this.options[k] = options[k];
            return this;
        },
        start: function() {

            console.log("IN Modal.js - start");
            //console.log(window);
            //console.log(this);
/*
            $('a.close').click(function(e) {
                e.preventDefault();
                $('body').addClass('closed');
                setTimeout(function() {
                    sendMessage('stop');
                }, 750);
            });
           */ 
                   
            // ------------------------------ Optimizely test vvv
            if (this.options.fastAnimation || (!document.skipOptimizely && document.fastForwardAnimation))
            {
                $('body').addClass('fast-animation');
                setTimeout(stupidIEZoomFix, 10);
            }
            else
            {
                setTimeout(stupidIEZoomFix, 2250);
            }


        },
        log: function() {
            if (this.options.debug)
                console.log.apply(console, arguments);
        }
    }
}

$(document).ready(function() {
    var loc = window.location.href;
    if (loc.indexOf('EMBED') != -1) {
        document.body.className = 'embedded';
        document.skipOptimizely = true;             
        animations.modal.options.fastAnimation = true;
        animations.modal.start(); 
    } 

});



/**
 *  -----------------------------------------------------------------------
 *  The rest of this file is all Internet Explorer's fault.
 *  -----------------------------------------------------------------------
 */




function stupidIEZoomFix() {
    if (ieVersion>=7) {
        $('.loading-region').addClass('zoomedOut').addClass('IE');
        $('#modal').addClass('fullyVisible').addClass('IE');
        setTimeout(function() {
            $('#header').addClass('fullyVisible').addClass('IE');
        }, 150);    
    } else {
        $('.loading-region').addClass('zoomedOut').addClass('notIE');
        $('#modal').addClass('fullyVisible').addClass('notIE');
        setTimeout(function() {
            $('#header').addClass('fullyVisible').addClass('notIE');
        }, 150);
    }
}

        //userAgent in IE7 WinXP returns: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727)
        //userAgent in IE11 Win7 returns: Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko

        

/**
Target IE 10 with JavaScript and CSS property detection.
# 2013 by Tim Pietrusky
# timpietrusky.com
**
*/
// IE 10 only CSS properties
/*
var ie10Styles = [
    'msTouchAction',
    'msWrapFlow',
    'msWrapMargin',
    'msWrapThrough',
    'msOverflowStyle',
    'msScrollChaining',
    'msScrollLimit',
    'msScrollLimitXMin',
    'msScrollLimitYMin',
    'msScrollLimitXMax',
    'msScrollLimitYMax',
    'msScrollRails',
    'msScrollSnapPointsX',
    'msScrollSnapPointsY',
    'msScrollSnapType',
    'msScrollSnapX',
    'msScrollSnapY',
    'msScrollTranslation',
    'msFlexbox',
    'msFlex',
    'msFlexOrder'
];

var ie11Styles = ['msTextCombineHorizontal']; 


//Test all IE only CSS properties

var b = document.body;
var s = b.style;
var ieVersion = null;
var property;

// Test IE10 properties
for (var i = 0; i < ie10Styles.length; i++) {
    property = ie10Styles[i];

    if (s[property] != undefined) {
        ieVersion = "ie10";
    }
}

// Test IE11 properties
for (var i = 0; i < ie11Styles.length; i++) {
    property = ie11Styles[i];

    if (s[property] != undefined) {
        ieVersion = "ie11";
    }
}

if (ieVersion)
{
    document.getElementById('modal').className = 'IE';
    document.getElementById('header').className = 'IE';
}
*/
