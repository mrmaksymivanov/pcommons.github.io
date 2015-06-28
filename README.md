# pcommons.github.io
Plugin Demo



Introduction
============

----------------------------------------------------------------------------------------
Demo
============
[https://www.retrotax-aci.com/plugin-demo/](https://www.retrotax-aci.com/plugin-demo/)


----------------------------------------------------------------------------------------
Installation
============
1. Contact tech@retrotax-aci.com to request an API Key. For security, we will white-list your domain so only requests originating from that domain will be accepted.
2. Place `<script type="text/javascript" src="retrotax_plugin.js"></script>` either before the end of your `</head>` tag or at the end before your `</body>` tag (better)
3. Set your configuration values.
4. Begin Screening :)

----------------------------------------------------------------------------------------
Configuration
============

Parameter | Required | Default Value | Optional Values | Data Type | Description 
--- | --- | --- | --- | --- | ---
_retrotax_options.iframe_base_path | Yes | https://pcommons.github.io/widget/iframe | widget/iframe | String | The path to the iframe that gets injected over your page. This should not be changed unless you are testing locally. In that case, set it to 'widget/iframe'.
_retrotax_options.username | Yes | false | None | String | Your webscreen.retrotax-aci.com username
_retrotax_options.apikey | Yes | false | None | String - 32 Chars | Your webscreen.retrotax-aci.com client-side api-key, which can be found within TCID under 'Accounts'.
_retrotax_options.companyid | No | false | None | Int | If provided, the record created will be associated to that company ID. Furthermore, it will filter possible locations by the company ID (assuming multiple locations). If not provided, the user will be presented with a drop-down with a list of company entities. These companies and the drop-down were defined during your RetroTax OnBoarding process.
_retrotax_options.locationid  | No | false | None | Int | Similar to CompanyID, providing this will associate the record to this specific location and the location's parent company. If not provided, the user will be presented with a drop-down with a list of locations based upon their company selection.
_retrotax_options.callback_url | No | false | None | Valid URL String | Provide a callback URL and we will return a JSON response of each ATS or OBS submission
_retrotax_options.framework | No | bootstrap | None | String | Currently we only have one available front-end option. We aim to add Material Design and are open to designs that fit your company requirements
_retrotax_options.delay | No | 0 | None | Int | How long to delay before showing the plugin appears
_retrotax_options.debug | No | false | None | Boolean | If set to true, we will log to the console
_retrotax_options.prepopulate_by | No | false | 'id','name','string' | String | If set to id or name the plugin will auto-populate the values in those fields to match those to our field names.  


----------------------------------------------------------------------------------------
Sample Config (Minimum Requirements)
============

```javascript
var _retrotax_options = {
    iframe_base_path: 'widget/iframe',
    username:'demoapi.hiring.manager',
    apikey:'3AED82E2006D43BDGHHGD790BFF937FR',
    plugin_type:'ats'
}
```

----------------------------------------------------------------------------------------
Sample Config (Complex)
============


----------------------------------------------------------------------------------------
Additional Features
============
The plugin offers an optional method for tracking users that start the application but do not complete it.  Prior to closing the RetroTax plugin, if a user has not completed the form, the form's data (what has been filled in) is logged as an object, in addition to some other variables we track for error handling.  This feature requires some additional configuration so it's not available client-side in the plugin's settings; however, please reach out to us if this is a requirement for your set-up. Below, a sample incomplete form:
```javascript
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
```

----------------------------------------------------------------------------------------
Styling
============
The configuration settings allow for minor modifications in order to allow styling similar to your existing website/application.  In doing so, we aim to take RetroTax out of the equation for the end-user as much as possible. If you require additional customization, we will gladly accommodate your custom CSS stylesheets, if your provide them. Please contact us if you'd like to discuss this further.


----------------------------------------------------------------------------------------
Compatability
============
The plugin script that is embeded in your website uses vanilla javascript and not dependent upon any framework (jQuery, etc, etc)

Currently, the plugin supports IE9+ and all modern browsers; however the plugin does not provide support for IE 7,8. If a user is viewing from IE8 the plugin is converted to a direct auto-login link.  So, rather than presented with an IFRAME, the user will be directed to our Tax Credit Screening platform (TCID) within a new browser.

----------------------------------------------------------------------------------------
Security
============








