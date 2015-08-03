
var app = angular.module("retrotax", ['ngRoute','jsonFormatter']);


app.config(function($routeProvider, $locationProvider){
	$routeProvider.
		when("/",
			{	templateUrl: "/plugin/demo/index.html",
				controller: "ctlDemo"});
	//$locationProvider.html5Mode(false);
	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});

 
});

app.controller('ctlDemo', ['$scope', '$window', function($scope,$window){
  
  $scope.initDemo=function(){};

  $scope._retrotax_options=_retrotax_options;

  /*_retrotax_options={
            iframe_base_path: '../widget/iframe',
            plugin_type: 'obs', 
            username:'demoapi.hiring.manager',
            apikey:'B47400F36FB8BA0C247798C94D153703',
            companyid:1054,
            locationid:8557,
            delay: 1000, 
            debug: true, 
            logo:'',
            callback_url:'',
            button_class:'',
            button_text:'',
            button_class_error:'',
            button_text_error:'',
            prepopulate_by:'id',
            populated_fields: {
                firstname:'first_name',
                lastname:'last_name',
                middleinitial:'middle_init',
                city:'city',
                state:'state',
                zip:'zipcode',
                address:'address',
                address2:'address2',
                dob:'dateOfBirth'
            }
        };
*/

       $scope.setConfiguration=function(){
       		console.log(angular.element('retrotax_plugin_trigger'));
       		//angular.element('#retrotax_plugin_trigger').val($scope._retrotax_options.button_text);
       		//angular.element('retrotax_plugin_trigger').addClass($scope._retrotax_options.button_class);
       	//console.log(_retrotax_options);
       		//_retrotax_options=$scope._retrotax_options;
       	       	console.log(_retrotax_options);

       }
 
}]);