# pcommons.github.io
Plugin Demo



Introduction
============

Demo
============
https://www.retrotax-aci.com/plugin-demo/

Installation
============
1. Contact tech@retrotax-aci.com to request an API Key. For security, we will white-list your domain so only requests originating from that domain will be accepted.
2. Place `<script type="text/javascript" src="retrotax_plugin.js"></script>` either before the end of your `</head>` tag or at the end before your `</body>` tag (better)
3. Set your configuration values.
4. Begin Screening :)

Configuration
============
Table: parameter | Required | optional values | default value | data type |

	_retrotax_options.iframe_base_path = 'https://pcommons.github.io/widget/iframe';  // The path to the iframe that gets injected over your page. This should not be changed unless you are testing locally. In that case, set it to 'widget/iframe'.

	_retrotax_options.username = false; //Your webscreen.retrotax-aci.com username

	_retrotax_options.apikey = false; //Your webscreen.retrotax-aci.com client-side api-key, which can be found within TCID under 'Accounts'.

	_retrotax_options.clientid = false;

	_retrotax_options.companyid = false;

	_retrotax_options.locationid = false;

	_retrotax_options.callback_url = false; //provide a callback URL and we will return a JSON response of each submission

	_retrotax_options.framework = 'bootstrap'; //defaults bootstrap; currently only available option. We aim to add Material Design

	_retrotax_options.delay = 0; // How long to delay before showing the widget

	_retrotax_options.debug = false; // If set to true, we will log stuff to the console

	_retrotax_options.ajax_logging_url = false //defaults to false; otherwise url: '/logs';

	_retrotax_options.prepopulate_by = false; //id,name,string

	_retrotax_options.populated_fields ={
		firstname:'', 
		lastname:'',
		middleinitial:'',
		city:'',
		state:'',
		zip:'',
		address:'',
		address2:'',
		dob:'' // format must be mm/dd/yyyy; otherwise, we reject it and the user will be asked to provide it 					
	};

	_retrotax_options.plugin_type = 'demo'; //ats,obs,demo (Application Tracking System, OnBoarding System, or Demo

	_retrotax_options.button_text = 'Open RetroTax Screening Plugin'; //what the text displayed to the end-user should say

	_retrotax_options.button_text_error = 'Error - Something went wrong.'; //optionally apply error text to the element's innerHTML in case of an error

	_retrotax_options.button_class = ''; //optionally apply a css class to the retrotax element 

	_retrotax_options.button_class_error = ''; //optionally apply a css class to the retrotax element in case of an error

	_retrotax_options.logo = 'iframe/images/retrotax_plugin_logo.png'; //defaults true which supplies a RetroTax Logo. Setting to false removes the <img>, and providing a valid URL will return that.



Sample Config (Minimum Requirements)
============

var _retrotax_options = {
	iframe_base_path: 'widget/iframe',
	username:'demoapi.hiring.manager',
	apikey:'3AED82E2006D43BDGHHGD790BFF937FR'
}

Sample Config (Complex)
============

Additional Features
============
The plugin offers an optional method for tracking users that start the application but do not complete it.  Prior to closing the RetroTax plugin, if a user has not completed the form, the form's data (what has been filled in) is logged as an object, in addition to some other variables we track for error handling.  This feature requires some additional configuration so it's not available client-side in the plugin's settings; however, please reach out to us if this is a requirement for your set-up. Below, a sample incomplete form:
(
    [form] => (
            [employeeid] => 0
            [username] => demoapi.hiring.manager
            [locationid] => ? boolean:false ?
            [firstname] => John
            [lastname] => 
            [address] => 3130 2nd St W
            [address2] => 
            [zip] => 
            [city] => 
            [stateid] => 10
            [dob] => 03/02/1987
            [recipient_name] => 
            [recipient_relationship] => 
            [recipient_cityreceived] => 
            [recipient_received_stateid] => 
            [recipient_received_county] => ? undefined:undefined ?
            [agency] => 
            [vocrehabinfo_phone] => 
            [dateconviction] => 
            [daterelease] => 
            [feloninfo_stateid] => ? object:null ?
            [servicestart] => 
            [unemployedstart] => 
            [unemployedstop] => 
            [compensatedstart] => 
            [compensatedstop] => 
        )

    [subject] => Incomplete
    [username] => demoapi.hiring.manager
    [user_agent] => Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/40.0.2214.111 Chrome/40.0.2214.111 Safari/537.36
    [window_size] => 845 x 993
    [screen_size] => 1865 x 1056
    [location] => http://localhost/plugin/widget/iframe/modal.html
)


Styling
============
The configuration settings allow for minor modifications in order to allow styling similar to your existing website/application.  In doing so, we aim to take RetroTax out of the equation for the end-user as much as possible. If you require additional customization, we will gladly accommodate your custom CSS stylesheets, if your provide them. Please contact us if you'd like to discuss this further.



Compatability
============
The plugin script that is embeded in your website uses vanilla javascript and not dependent upon any framework (jQuery, etc, etc)

Currently, the plugin supports IE9+ and all modern browsers; however the plugin does not provide support for IE 7,8. If a user is viewing from IE8 the plugin is converted to a direct auto-login link.  So, rather than presented with an IFRAME, the user will be directed to our Tax Credit Screening platform (TCID) within a new browser.

Security
============

Github
============
This application has 2 remotes: OpenShift(origin) & Github(github) where github is set as default. To push to OpenShift: `git push -u origin master` 

git push  <REMOTENAME> <BRANCHNAME> 
git push -u origin master

OpenShift
============
Account through paul@paulcommons. If not logged in, login with multiple accounts, e.g:
`rhc apps --rhlogin paul@paulcommons.com`








