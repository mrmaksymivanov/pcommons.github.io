<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
  <title>Welcome to RetroTax Plugin (localhost)</title>
  
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>

  <!--
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular.min.js"></script>
      <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular-route.js"></script>
      -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"> 
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

            iframe_base_path: 'widget/iframe',
	/*
           https://pcommons.github.io/widget/iframe',             <-- Set this for SSL Testing and ACI Demo Website (https://www.retrotax-aci.com/plugin-demo/) 
           http://plugin-paulcommons.rhcloud.com/widget/iframe',  <-- Set this for http cross-domain testing
           widget/iframe  					  <-- set this for localhost testing
	*/

            delay: 1000, 
            debug: true, // This shows debug stuff in the console. For testing
            username:'demoapi.hiring.manager',
           // apikey:'3AED82E2006D43BDA850D790BFF937AE',
            apikey:'B47400F36FB8BA0C247798C94D153703',
            always_show_widget: true,
            compatibility_iframe: {
                width: 500,
                height: 400

            },
            companyid:1054,
            //logo:'/plugin/widget/iframe/images/test.png',
            locationid:8557,
            button_class:"btn btn-huge btn-info",
            button_text:"Open RetroTax Screening Plugin",
            button_class_error:"btn btn-huge btn-danger",
            button_text_error:"Aw, snap! Something broke",
            plugin_type: 'obs',  //ats,obs,demo  demo makes fields uneditable and ats/obs toggles required fields (e.g. hides SSN, etc)
            prepopulate_by:'id',
            populated_fields: {
                firstname:'first_name',
                lastname:'last_name',
                middleinitial:'middle_init',
                city:'',
                state:'state',
                zip:'',
                address:'address',
                address2:'',
                dob:'dateOfBirth'
            }
        };
    </script>
</head>
<body>
<h2>Demo: This demo's iframe is generated from OpenShit: http://plugin-paulcommons.rhcloud.com/widget/iframe</h2>
    <div role="main">
        <div class="wrap">
        <div id="retrotax_plugin">Trigger Screening</div>
        <input id="first_name" class="retrotax" value="Paul">
        <input id="middle_init" class="retrotax" value="">
        <input id="last_name" value="">
        <input id="address" value="3130 2nd St W">
        <input id="state" class="retrotax" value="FL">
        <input id="address2" class="retrotax" value="blah">
        <input id="dateOfBirth" class="retrotax" value="03/02/1987">

<br/>
<br/>
<br/>
<br/>
        <input name="first_name" class="retrotax" value="Pablo">
        <input name="middle_init" class="retrotax" value="C">
        <input name="last_name" value="Com">
        <input name="address" value="3130 1nd St W">
        <input name="city" class="retrotax" value="St. Pete">
        <input name="state" class="retrotax" value="IN">
        <input name="zip-code" class="retrotax" value="11111">
        <input name="address2" class="retrotax" value="blah">
        <input name="dateOfBirth" class="retrotax" value="03-02-1987">



        </div><!-- close .wrap -->
    </div><!-- close .main -->

<script src="widget/retrotax_plugin.js"></script>

</body>

</html>
