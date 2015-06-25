<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
  <title>Welcome to RetroTax Plugin (localhost)</title>

	<!--
	BEGIN RTN WIDGET EMBED CODE
	-->
    <script type="text/javascript">
/*
        var _bftn_options = {
            // This is used to override the widget iframe URL with something else
            // Normally it would be on CDN somewhere, but we want it local for testing.
            iframe_base_path: 'widget/iframe',
            delay: 0,
            debug: true,
            always_show_widget: true,
            compatibility_iframe: {
                width: 500,
                height: 400

            },
            button_class:"btn btn-huge btn-info",
            button_text:"Open RetroTax Screening Plugin",
            //ats,obs,demo  demo makes fields uneditable and ats/obs toggles required fields (e.g. hides SSN, etc)
            plugin_type: 'ats',  
            prepopulate_basic_info_by_id: {
                firstname:'first_name',
                lastname:'last_name',
                middleinitial:'middle_init',
                city:'',
                state:'',
                stateid:'',
                zip:'',
                address:'',
                address2:'',
                countyid:'',
                dob:''
            }
        }
*/


	var _retrotax_options = {

            iframe_base_path: 'http://plugin-paulcommons.rhcloud.com/widget/iframe',
	/*
           https://pcommons.github.io/widget/iframe',             <-- Set this for SSL Testing and ACI Demo Website (https://www.retrotax-aci.com/plugin-demo/) 
           http://plugin-paulcommons.rhcloud.com/widget/iframe',  <-- Set this for http cross-domain testing
           widget/iframe  					  <-- set this for localhost testing
	*/

            delay: 1000, 
            debug: true, // This shows debug stuff in the console. For testing
            username:'demoapi.hiring.manager',
            apikey:'3AED82E2006D43BDA850D790BFF937AE',
            always_show_widget: true,
            compatibility_iframe: {
                width: 500,
                height: 400

            },
            clientid:364,
            companyid:1054,
            locationid:8557,
            button_class:"btn btn-huge btn-info",
            button_text:"Open RetroTax Screening Plugin",
            plugin_type: 'ats',  //ats,obs,demo  demo makes fields uneditable and ats/obs toggles required fields (e.g. hides SSN, etc)
            prepopulate_basic_info_by_id: {
                firstname:'first_name',
                lastname:'last_name',
                middleinitial:'middle_init',
                city:'',
                state:'',
                stateid:'',
                zip:'',
                address:'',
                address2:'',
                countyid:'',
                dob:''
            }
        };

    </script>
	<!--
	END RTN WIDGET EMBED CODE
	-->
</head>
<body>
<h2>Demo: This demo's iframe is generated from OpenShit: http://plugin-paulcommons.rhcloud.com/widget/iframe</h2>
    <div role="main">
        <div class="wrap">
        <div id="retrotax_plugin">Trigger Screening</div>
        <input id="first_name" class="retrotax" value="Paul">
        <input id="middle_init" class="retrotax" value="M">
        <input id="last_name" value="Commons">
        </div><!-- close .wrap -->
    </div><!-- close .main -->
        <script type="text/javascript" src="widget/retrotax_plugin.js"></script>

</body>

</html>
