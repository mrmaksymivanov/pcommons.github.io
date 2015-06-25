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
            console.log(window);
            console.log(this);
            this.options.response="angularjs response";
            this.options._message_="_MESSAGE_";

            /*
            console.log(this.options.populated_fields);
            console.log(this.options.plugin_type);
            console.log(this.options.test);
            //console.log($scope);
            window.variable1=this.options.plugin_type;
            console.log(window);

            switch(this.options.plugin_type) {
                case 'demo':
                      $('input').each(function() {
                                console.log($(this));
                                $(this).attr({'readonly': 'readonly'});            
                        });
                      $('#btnSave').attr({'disabled':'disabled'});        
                      break;
                case 'ats':
                      $('#client').closest('tr').addClass('hide');
                      $('[name="companyid"]').closest('tr').addClass('hide');
                      $('[name="locationid"]').closest('tr').addClass('hide');
                      $('#ssn').closest('tr').addClass('hide');
                      $('#ssn4').closest('tr').addClass('hide');        
                      break;
                case 'obs':
                    
                    break;

                default:
                    sendMessage('stop');
            }
            */


            $('a.close').click(function(e) {
                e.preventDefault();
                $('body').addClass('closed');
                setTimeout(function() {
                    sendMessage('stop');
                }, 750);
            });
            
            console.log(this.options.populated_fields);
            if(typeof this.options.populated_fields != 'undefined'){
            //console.log(this.options.populated_fields.firstname);
                angular.element("#firstname").val(this.options.populated_fields.firstname);
                console.log(angular.element("#firstname").scope());

                $("#lastname").val(this.options.populated_fields.lastname);
                var x=angular.element("#firstname").scope();
                console.log(x);
                angular.element(x).val(this.options.populated_fields.lastname);
                console.log(x);
               //console.log(angular.element(tcid.employee.maindata.firstname));
            }
            
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
                console.log("IN Modal.js - document.ready");
    console.log(window);
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
    if (ieVersion) {
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

/**
Target IE 10 with JavaScript and CSS property detection.
# 2013 by Tim Pietrusky
# timpietrusky.com
**/

// IE 10 only CSS properties
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

/*
* Test all IE only CSS properties
*/
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
