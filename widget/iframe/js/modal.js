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
            console.log("IN Modal.js");
            console.log(this);
            console.log(this.options.populated_fields);
            console.log(this.options.plugin_type);
            console.log(this.options.test);
            //console.log($scope);
            if(this.options.plugin_type){
                $('#plugin_type').val(this.options.plugin_type);
                if(this.options.plugin_type=='demo'){
                  $('input').each(function() {
                            console.log($(this));
                            $(this).attr({'readonly': 'readonly'});
                            $(this).$setPristine();                 
                    });
                  $('#btnSave').attr({'disabled':'disabled'});
                }else if(this.options.plugin_type=='ats'){
                    console.log()
                  $('#client').closest('tr').addClass('hide');
                  $('[name="companyid"]').closest('tr').addClass('hide');
                  $('[name="locationid"]').closest('tr').addClass('hide');
                  $('#ssn').closest('tr').addClass('hide');
                  $('#ssn4').closest('tr').addClass('hide');
                  //hide HM info
                }


            }


            $('a.close').click(function(e) {
                e.preventDefault();
                $('body').addClass('closed');
                setTimeout(function() {
                    sendMessage('stop');
                }, 750);
            });

            //console.log(this.options.populated_fields.firstname);
            $("#firstname").val(this.options.populated_fields.firstname);
            $("#lastname").val(this.options.populated_fields.lastname);
/*          
            if (this.options.skipEmailSignup)
            {
                $('#direct_call').show();
                $('#petition').hide();
                $('.bottom-link').hide();
                $('.bottom-link').hide();
                $('#last-donation-ask').hide();
            }
            if (this.options.skipCallTool)
                this.phoneCallAllowed = false;

            if (this.options.boxUnchecked)
            {
                $('#opt-in').attr('checked', false);
                $('.disclosure').removeClass('nice-check');
            }
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
/*
            // Optimizely test vvv
            if (!document.skipOptimizely && document.showCTATextImmediately)
            {
                $('#header h1').css('opacity', 0);
                $('#header .cta').css('opacity', 1);
            }

            // Optimizely test vvv
            this.optimizelyTextAB();

            // If no org is set, then 16% chance of free press
            if (!this.options.org && Math.random() < 0.16) {
                this.options.org = 'fp';
            }

            if (this.options.org == 'fp')
            {
                $('#fftf_disclosure').hide();
                $('#fp_disclosure').show();
            }
            else if (this.options.org == 'dp')
            {
                $('#fftf_disclosure').hide();
                $('#dp_disclosure').show();
            }
            else if (this.options.org == 'fftf_org')
            {
                $('#fftf_disclosure').hide();
                $('#fftf_org_disclosure').show();
            }

            $('a.close').click(function(e) {
                e.preventDefault();
                $('body').addClass('closed');
                trackLeaderboardStat({stat: 'close_widget', data: 'modal'});
                setTimeout(function() {
                    sendMessage('stop');
                }, 750);
            });

            $('a.letter').click(function(e) {
                e.preventDefault();
                $('#overlay').css('display', 'block');
                setTimeout(function() {
                    $('#overlay').addClass('visible');
                }, 50);
                
            });

            $('a.continue').click(function(e) {
                $('#overlay').removeClass('visible');

                setTimeout(function() {
                    $('#overlay').css('display', 'none');
                }, 750);
            });

            $('a#cantcall').click(function(e) {
                e.preventDefault();
                this.showFinal()
            }.bind(this));

            $("form[name=petition]").submit(function(e) {
                e.preventDefault();
                if (this.postUser($(this))) {
                    
                    $("input:not([type=image],[type=button],[type=submit])").val('');

                    if (this.phoneCallAllowed)
                        this.showPhoneCall();
                    else
                        this.showFinal();
                    
                } else {
                    // alert('Please complete the rest of the form. Thanks!');
                }
            }.bind(this));

            $("form[name=direct_call]").submit(function(e) {
                e.preventDefault();
                var phone = this.validatePhone($('#phone_front').val());

                if (!phone)
                {
                    $('#phone_front').addClass('error');
                }
                else
                {
                    this.placePhonecall(phone);
                    this.showFinalWithCallInstructions();
                }
            }.bind(this));

            $('a.facebook').click(function(e) {
                trackLeaderboardStat({stat: 'share', data: 'facebook'});
            });

            $('a.twitter').click(function(e) {
                trackLeaderboardStat({stat: 'share', data: 'twitter'});
            });

            $('#call').click(function(e) {
                e.preventDefault();

                var phone = this.validatePhone($('#phone').val());

                if (!phone)
                    return $('#phone').addClass('error');

                $('#call').attr('disabled', true);
                $('#phone').attr('disabled', true);

                this.placePhonecall(phone);

                setTimeout(function() {
                    this.showFinalWithCallInstructions();
                }.bind(this), 1000);
            }.bind(this));

            $.ajax({
                url: '//fftf-geocoder.herokuapp.com/',
                dataType: 'json',
                type: 'get',
                success: function(data) {
                    if (data.country && data.country.iso_code)
                    {
                        $('#country').val(data.country.iso_code);
                        if (data.country.iso_code != "US")
                        {
                            this.phoneCallAllowed = false;

                            if (this.options.skipEmailSignup)
                            {
                                // Nothing to do. Close the modal now.
                                sendMessage('stop');
                            }
                        }
                    }
                }.bind(this)
            });
*/
        },
        log: function() {
            if (this.options.debug)
                console.log.apply(console, arguments);
        }
    }
}

$(document).ready(function() {
/*
    $('#header h1').html($('h1.headline').html());
    $('#header .cta p').html($('p.cta-hidden-trust-me').html());

    setTimeout(function() {
        $('#header .cta').css('height', $('#header').outerHeight()+'px');
        $('#letter').css('height', $('#modal').outerHeight()+'px');
        $('#letter').css('opacity', 1);
    }, 1000);
*/
    var loc = window.location.href;

    if (loc.indexOf('EMBED') != -1) {

        document.body.className = 'embedded';
        document.skipOptimizely = true;
/*
        if (loc.indexOf('NOCALL') != -1)
            animations.modal.options.skipCallTool = true; 

        if (loc.indexOf('NOEMAIL') != -1)
            animations.modal.options.skipEmailSignup = true;

        if (loc.indexOf('UNCHECK') != -1)
            animations.modal.options.boxUnchecked = true;

        if (loc.indexOf('DP') != -1)
            animations.modal.options.org = 'dp';

        if (loc.indexOf('FP') != -1)
            animations.modal.options.org = 'fp'; 

        if (loc.indexOf('FFF') != -1)
            animations.modal.options.org = 'fftf_org'; 
*/               
        animations.modal.options.fastAnimation = true;
        animations.modal.start(); 
    } 
});



/**
 *  -------------------------- OMG ---------------------------------------------
 *  The rest of this file is all Internet Explorer's fault.
 *  -------------------------- OMG ---------------------------------------------
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
