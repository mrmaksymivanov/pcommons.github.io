
/*!
* angular-post-message v1.3.0
* Copyright 2015 Kyle Welsby <kyle@mekyle.com>
* Licensed under The MIT License
*/
(function() {
  'use strict';
  var app;

  app = angular.module("ngPostMessage", ['ng']);

  app.run([
    '$window', '$postMessage', '$rootScope',
    function($window, $postMessage, $rootScope) {

      $rootScope.$on('$messageOutgoing', function(event, message, domain) {
        var sender;
        if (domain == null) {
          domain = "*";
        }
        sender = $rootScope.sender || $window.parent;
        return sender.postMessage(message, domain);
      });

      angular.element($window).bind('message', function(event) {
      	console.log("NGMESSAGE");
      	console.log(event);
        var error, response;
        event = event.originalEvent || event;
        console.log(event);
        if (event && event.data) {
          console.log("event and event.data");
          response = null;
          $rootScope.sender = event.source;
          try {
            response = angular.fromJson(event.data);
          } catch (_error) {
            error = _error;
            console.log('ahem', error);
            response = event.data;
          }
          $rootScope.$root.$broadcast('$messageIncoming', response);
          return $postMessage.messages(response);
        }
      });
    }
  ]);

  app.factory("$postMessage", [
    '$rootScope',
    function($rootScope) {
      var $messages, api;
      $messages = [];
      api = {
        messages: function(_message_) {
        	console.log(_message_);
          if (_message_) {
            $messages.push(_message_);
            $rootScope.$digest();
          }
          return $messages;
        },
        lastMessage: function() {
          return $messages[$messages.length - 1];
        },
        post: function(message, domain) {
          if (!domain) {
            domain = "*";
          }
          return $rootScope.$broadcast('$messageOutgoing', message, domain);
        }
      };
      return api;
    }
  ]);

}).call(this);


var app = angular.module("retrotax", ['ngRoute','ui.bootstrap','ngPostMessage']);


//Constants & Values
app.constant('debug', true);
app.value('debug', true);

app.config(function($routeProvider, $locationProvider, $provide, debug){
//app.config(function($routeProvider){

	$routeProvider.
		when("/:bootstrap",
			{	templateUrl: "/widget/iframe/bootstrap.html",
				controller: "ctlEmployee"}).
		when("/:modal",
			{	templateUrl: "/widget/iframe/modal.html",
				controller: "ctlEmployee"});

	//$locationProvider.html5Mode(false);
	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});

    
    $provide.decorator('datepickerPopupDirective', function ($delegate) {
        var directive = $delegate[0];
        var link = directive.link;

        directive.compile = function () {
          return function (scope, element, attrs) {
            link.apply(this, arguments);
            element.mask("99/99/9999");
          };
        };
        return $delegate;
    });

    
    
    
    /* catch exceptions in angular
    $provide.decorator('$exceptionHandler', ['$delegate', function($delegate){
      return function(exception, cause){
        $delegate(exception, cause);

        var data = {
          type: 'angular',
          url: window.location.hash,
          localtime: Date.now()
        };
        if(cause)               { data.cause    = cause;              }
        if(exception){
          if(exception.message) { data.message  = exception.message;  }
          if(exception.name)    { data.name     = exception.name;     }
          if(exception.stack)   { data.stack    = exception.stack;    }
        }

        if(debug){
          console.log('exception', data);
        } else {
          $.error(data);
        }
      };
    }]);
    // catch exceptions out of angular
    window.onerror = function(message, url, line, col, error){
      var stopPropagation = debug ? false : true;
      var data = {
        type: 'javascript',
        url: window.location.hash,
        localtime: Date.now()
      };
      if(message)       { data.message      = message;      }
      if(url)           { data.fileName     = url;          }
      if(line)          { data.lineNumber   = line;         }
      if(col)           { data.columnNumber = col;          }
      if(error){
        if(error.name)  { data.name         = error.name;   }
        if(error.stack) { data.stack        = error.stack;  }
      }

      if(debug){
        console.log('exception', data);
      } else {
          $.error(data);
      }
      return stopPropagation;
    };
*/

});



app.factory('AuthService', ['$http', '$q', function ($http, $q) {
	var lcurrentuser={};
	var lcu_locations=[];
	var lcu_companies=[];
	var lcu_clients=[];
	var TCID_DOMAIN='http://tcid.retrotax.co/api/v1/';
	var isLoggedIn=false;
	var isDeviceAuth=false;
  
	var getRetroURL=function(debug){
		console.log(window.location.hostname);
        if(typeof device != "undefined") return (debug==true) ? "http://tcid.retrotax.co":"https://webscreen.retrotax-aci.com";
 		return (window.location.hostname=="plugin-paulcommons.rhcloud.com" || window.location.hostname=="localhost") ? "http://tcid.retrotax.co":"https://webscreen.retrotax-aci.com";     
    }

	var mergeCCL=function(indata) {
		var tmpindata=[];
		tmpindata.clients=[{"id":indata.companies[0].maindata.clientid, "legal_name":"temp name"}];

		var ret={};
		ret.clients=[];

		$.each(tmpindata.clients, function( key, value ) {
			var tmpclient=value;
			tmpclient.companies=[];

			$.each(indata.companies, function( key, value ) {
				if (tmpclient.id==value.maindata.clientid) {
					var tmpcompany=value.maindata;
					tmpcompany.locations=[];

					$.each(indata.locations, function( key, value ) {
						if (tmpcompany.id==value.maindata.companyid) {
							tmpcompany.locations.push(value.maindata);
						}
					});

					tmpclient.companies.push(tmpcompany);
				}
			});	

			ret.clients.push(tmpclient);
		});

		//console.log('mergeccl ret: ',ret);

		return ret;
	}

	var cnt=0;
	return {

        plugin_auth: function(tcid){
    		var checkapi2fa='';
    		//TODO create method in api which returns the same data as device2fa but accepts a client-side apikey which we check against (this apikey should only be able to work with this method and the save method)
    		return $http.get(getRetroURL()+'/api/v1/users/authenticate_plugin?cclhash=123123&plugin=true&apikey='+$scope.tcid.api_key+'&u='+$scope.tcid.username+'&api2fa='+checkapi2fa+'&device='+window.location.hostname)
    		//$scope.tcid.checkapi2fa='';
    		//$scope.tcid.device='temp_device22f';
			//$scope.tcid.url2fa = $scope.apiURL+'/api/v1/users/device2fa?cclhash=123123&pw=' + $scope.tcid.pw + '&u=' + $scope.tcid.u +'&device='+$scope.tcid.device+'&api2fa='+$scope.tcid.checkapi2fa;
	
			.then(function(response) {
					console.log("PLUGIN AUTH");
					console.log(response);
				    if (typeof response.data === 'object') {
						if (angular.isDefined(response.data.message)) {
							if (response.data.SUCCESS==false) {
								localStorage.setItem("hasAccess", 0);
								localStorage.setItem('u','');
								return $q.reject(response.data); // 
							}

							if (response.data.message=='E-mailed 2fa code') {
								tcid.showAuth=true;
							}
						}

					if (angular.isDefined($scope.tcid.api_key) && $scope.tcid.api_key!='' && $scope.tcid.api_key.length==32 && $scope.tcid.u!='') {
						tcid.didlogin=true;
						tcid.username=response.data.loggedInAPIUser.user.username;
						tcid.privilegeid=response.data.loggedInAPIUser.user.privilegeid;
						tcid.email=response.data.loggedInAPIUser.user.email;
						tcid.name=response.data.loggedInAPIUser.user.firstname + ' ' +response.data.loggedInAPIUser.user.lastname;
						tcid.client={};
						tcid.client.name=response.data.loggedInAPIUser.user.client_name;
						tcid.client.clientid=response.data.loggedInAPIUser.user.clientid;	
						tcid.company={};
						tcid.company.name='company name to be looked up';
						tcid.company.companyid=response.data.loggedInAPIUser.user.companyid;
						tcid.location={};
						tcid.location.name='location name to be looked up';
						tcid.location.locationid=response.data.loggedInAPIUser.user.locationid;
						tcid.ccl=mergeCCL(response.data.loggedInAPIUser.ccl.data);
					} 

						lcurrentuser=tcid;

						localStorage.setItem('cu', JSON.stringify(lcurrentuser));
						localStorage.setItem('u',lcurrentuser.username);

						console.log('(app.js) LOGGED IN USER: ',lcurrentuser);


					} else {
						localStorage.setItem("hasAccess", 0);
						localStorage.setItem('u','');
						console.log('LOGGED **NOT*** in USER: ',lcurrentuser);
					}
			        return lcurrentuser;
			}, function(response) {
			    return $q.reject(response.data);
			});
	},
	login: function(tcid) {
		return $http.get(tcid.url2fa)
			.then(function(response) {
			    if (typeof response.data === 'object') {
					if (angular.isDefined(response.data.message)) {
						if (response.data.SUCCESS==false) {
							localStorage.setItem("hasAccess", 0);
							localStorage.setItem('u','');
							return $q.reject(response.data); // 
						}

						if (response.data.message=='E-mailed 2fa code') {
							tcid.showAuth=true;
						}
					}

					if (angular.isDefined(response.data.APIKEY)) {tcid.api_key=response.data.APIKEY;}
					if (angular.isDefined(response.data.apikey)) {tcid.api_key=response.data.apikey;}

					if (angular.isDefined(tcid.api_key) && tcid.api_key!='' && tcid.api_key.length==32 && tcid.u!='') {
						localStorage.setItem("apikey", tcid.api_key);
						localStorage.setItem("hasAccess", 1);

						isLoggedIn=true; 
						tcid.didlogin=true;
						tcid.username=response.data.loggedInAPIUser.user.username;
						tcid.privilegeid=response.data.loggedInAPIUser.user.privilegeid;
						tcid.email=response.data.loggedInAPIUser.user.email;
						tcid.name=response.data.loggedInAPIUser.user.firstname + ' ' +response.data.loggedInAPIUser.user.lastname;

						tcid.client={};
						tcid.client.name=response.data.loggedInAPIUser.user.client_name;
						tcid.client.clientid=response.data.loggedInAPIUser.user.clientid;
						
						tcid.company={};
						tcid.company.name='company name to be looked up';
						tcid.company.companyid=response.data.loggedInAPIUser.user.companyid;
						tcid.location={};
						tcid.location.name='location name to be looked up';
						tcid.location.locationid=response.data.loggedInAPIUser.user.locationid;

						tcid.ccl=mergeCCL(response.data.loggedInAPIUser.ccl.data);

						lcurrentuser=tcid;

						localStorage.setItem('cu', JSON.stringify(lcurrentuser));
						localStorage.setItem('u',lcurrentuser.username);

						console.log('(app.js) LOGGED IN USER: ',lcurrentuser);


					} else {
						localStorage.setItem("hasAccess", 0);
						localStorage.setItem('u','');
						console.log('LOGGED **NOT*** in USER: ',lcurrentuser);
					}
			        return lcurrentuser;
			    } else {
			        return $q.reject(response.data); // invalid response
			    }

			}, function(response) {
			    return $q.reject(response.data);
			});
	},
	userLoggedIn: 	function() {
		if (!isLoggedIn) {
			var retuser = JSON.parse(localStorage.getItem('cu'));
			if (retuser==null) {return false;}

			if (angular.isObject(retuser)) {
				if (retuser.api_key != '') {
					lcurrentuser=retuser;
					isLoggedIn=true;
					console.log('>>>>>>>>>>>>>>> lcurrentuser ahs been set!',lcurrentuser);
				} 	
		 	}
		}
		return isLoggedIn;},  

	isDeviceAuth: 	function() {return isDeviceAuth;},

	logout: function() {
		isLoggedIn=false; 
		lcurrentuser=undefined; 
		cnt=0;
		localStorage.removeItem('cu');
		console.log('****** USER LOGGED OUT **********');
		return true;
	},
	currentuser: function() {return lcurrentuser;}

	};

}]);


/*
// TODO: create gulp file
// TODO: remove common.js file and test PostMessage sans it
// TODO: remove jQuery
// TODO: create MaterialDesign option, like demo.html is but should be bootstrap
// TODO: use strict mode
// TODO: check if angular or jquery versions can conflict w/ iframe
*/




app.controller("ctlEmployee", function($scope, $http, $route, $routeParams, $location, $window, $postMessage, $rootScope, debug, AuthService,$filter){
	console.log("Employees Controller");
	var param1 = $routeParams.param1;
	console.log(param1);
	$scope.currentemployeeid;
	$scope.alerts = [];
    $scope.tcid={};
	$scope.tcid.employee={};
	$scope.tcid.employees=[];
	$scope.tmpcomp=null; //$index
	
	$scope.tcid.counties=[];
	$scope.tcid.gettingcounties=[];

	$scope.currentemployeeid=0;
	$routeParams.employeeid='new';
	$scope.cals=[dgi=false,dsw=false,dojo=false,dsw=false,doh=false,dob=false,felondc=false,felondr=false];

	$scope.currentUser={};

	var getRetroURL=function(debug){
		console.log(window.location.hostname);
        if(typeof device != "undefined") return (debug==true) ? "http://tcid.retrotax.co":"https://webscreen.retrotax-aci.com";
 		return (window.location.hostname=="plugin-paulcommons.rhcloud.com" || window.location.hostname=="localhost" || window.location.hostname=='plugin.retrotax-aci.com') ? "http://tcid.retrotax.co":"https://webscreen.retrotax-aci.com";     
    }

	$scope.apiURL=getRetroURL(false);
	console.log($scope.apiURL);
    //console.log($scope.currentuser);
	//$scope.isLoggedIn=function(tcid){return AuthService.plugin_auth(tcid);}; 
	//$scope.currentuser=function(){return AuthService.currentuser();};
    //$scope.isLoggedIn($scope.tcid);

	$scope.thisPath='';
	$scope.isATS=false; //asssume it's not ATS
	$scope.isDisabled=false; //for submit button

/*
	$scope.$on('$routeChangeSuccess', function() {
			$scope.thisPath=$location.path();
			
			// console.log('.... clemployee $ROUTECHANGESUCCESS function hit..... '+$scope.thisPath,($scope.thisPath.length<3));
			
			if (!$scope.isLoggedIn()) {
				$location.path("/login");
			}

			if ($routeParams.employeeid=='new') {
				$scope.alerts.push({type:'success',msg: 'ENTERING NEW EMPLOYEE...'});
				$scope.currentemployeeid=0;
				$scope.tcid.employee=defEmployee();
				// console.log('called defEmployee to get default employee info:',$scope.tcid.employee);

			} 

	});
*/


	$scope.initEdit = function() {
        //$scope.html_metadata = html_metadata;
        //console.log($scope.html_metadata);
	};


	function MergeRecursive(obj1, obj2) {

	  for (var p in obj2) {
	    try {
	      // Property in destination object set; update its value.
	      if ( obj2[p].constructor==Object ) {
	        obj1[p] = MergeRecursive(obj1[p], obj2[p]);

	      } else {
	        obj1[p] = obj2[p];

	      }

	    } catch(e) {
	      // Property in destination object not set; create it and set its value.
	      obj1[p] = obj2[p];

	    }
	  }

	  return obj1;
	}

	$scope.getSelectedClientIndex = function() {
 		if ($scope.tcid.employee.maindata == undefined) {return false; }
	    return getIndexOf($scope.currentUser.ccl.clients, $scope.currentUser.client.clientid, 'id');
	};
	//TODO: Test if CCL Fields still work with a user with multiple companies and locations
	$scope.getSelectedCompanyIndex = function() {
		if ($scope.tcid.employee.maindata == undefined && $scope.args.companyid != false) {return false; }
		console.log($scope.args.companyid);
		var companyid= ($scope.tcid.employee.maindata.company.id==null) ? $scope.args.companyid : $scope.tcid.employee.maindata.company.id;	
		console.log(companyid);
		//if scope.args.companyid is not provided then its false so check if currentUser.ccl.clients[0].companies.length > 1. If it's one then we can auto-popualte it and not make the user fill in an extra field
		if($scope.args.companyid===false && $scope.currentUser.ccl.clients[0].companies.length === 1){companyid=0;}
		console.log(companyid);
		return getIndexOf($scope.currentUser.ccl.clients[$scope.getSelectedClientIndex()].companies, companyid, 'id');
	};
	/*
	$scope.getSelectedLocationIndex = function() {
		if ($scope.tcid.employee.maindata == undefined) {return false; }
		console.log($scope.getSelectedCompanyIndex());
		console.log($scope.tcid.employee.maindata.company.id);
		var companyIndex=$scope.getSelectedCompanyIndex();
		console.log("CompanyIndex:  "+companyIndex);
		var locationid= ($scope.tcid.employee.maindata.location.id==null) ? $scope.args.locationid : $scope.tcid.employee.maindata.location.id;		
		return getIndexOf($scope.currentUser.ccl.clients[0].companies[companyIndex].locations, locationid, 'id');

	};
	*/
	function getIndexOf(arr, val, prop) {
	  var l = arr.length,
	    k = 0;
	  for (k = 0; k < l; k = k + 1) {

	    if (arr[k][prop] == val) {
	      return k;
	    }
	  }

	  return false;
	}

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.save = function(isValid) {
		console.log("--> Submitting form.. isValid?? ");
		console.log(isValid);
/*
var alertsBasic = new Array('firstname','lastname','city','stateid','dob','city','ssn','ssnconfirmation');
var alertsMilitary = new Array();
var alertsFelon = new Array();
var alertsUnemployed = new Array();
*/
 $scope.$broadcast('show-errors-check-validity');
   
		if (!isValid) {
			$scope.alerts=[];
			var error = $scope.frmEmployee.$error;
			
			angular.forEach(error.required, function(field){
				console.log('field is required: ',field.$name);
				$scope.alerts.push({type:'danger',msg: $( "[name='"+field.$name+"']" ).data('displayname')+' is required'});
			});
			angular.forEach(error.valid, function(field){
				console.log('valid - field.....',field);
				$scope.alerts.push({type:'danger',msg: $("[name='"+field.$name+"']").data('displayname')+' is valid'});
			});
			angular.forEach(error.invalid, function(field){
				console.log('invalid - field.....',field);
				$scope.alerts.push({type:'danger',msg: $("[name='"+field.$name+"']").data('displayname')+' is invalid'});
			});
			angular.forEach(error.minlength, function(field){
				console.log('minlength - field.....',field);
				$scope.alerts.push({type:'danger',msg: $("[name='"+field.$name+"']").data('displayname')+' is too short'});
			});
			var errorAccordian=window.document.getElementById('errorAcc');

			console.log(errorAccordian);
			console.log(angular.element('errorAcc'));
			return false;
		}

		$scope.tcid.employee.maindata.hiring_manager_completed=1;
		console.log($scope);

		console.log('attempting to save employee object:',$scope.tcid.employee.maindata);

		//var responsePromise = $http.post('https://webscreen.retrotax-aci.com/api/v1/api_employees/save?u='+$scope.currentuser().username+'&apikey='+$scope.currentuser().api_key + '&companyid='+$scope.tcid.employee.maindata.companyid+'&locationid='+$scope.tcid.employee.maindata.locationid, $scope.tcid.employee.maindata, {});
		//var responsePromise = $http.post('https://webscreen.retrotax-aci.com/api/v1/api_employees/save?apikey=111BC0B55FEF6737944B37B1CA2DBED3&u=demoapi.new.employee&companyid='+$scope.tcid.employee.maindata.companyid+'&locationid='+$scope.tcid.employee.maindata.locationid, $scope.tcid.employee.maindata, {});
		var responsePromise = $http.post($scope.apiURL+'/api/v1/api_employees/save?u='+$scope.tcid.username+'&apikey='+$scope.tcid.api_key + '&companyid='+$scope.tcid.employee.maindata.companyid+'&locationid='+$scope.tcid.employee.maindata.locationid, $scope.tcid.employee.maindata, {});

		responsePromise.success(function(dataFromServer, status, headers, config) {
			console.log(dataFromServer);
			if (dataFromServer.SUCCESS) {
				$scope.currentemployeeid=1;
				//Attempt to send response to clients callback url.  
				if($scope.args.callback_url !== false){ //&& isValidURL() && protocol==https
					//If we can set clientSideLogging var then we could use this: $.log(dataFromServer);
					try{
						var responsePromise = $http.post($scope.args.callback_url, dataFromServer, {});
						responsePromise.success(function(dataFromServer, status, headers, config) {
							//kill iframe
						});
					}catch(e){
						$.error(e);
						//kill iframe
					}
				}
			}
		});
		responsePromise.error(function(data, status, headers, config) {
			$.error({'data':data,'status':status,'headers':headers,'config':config});
			alert("Submitting form failed!");

		});
	}

	$scope.calop = function($event,obj) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.cals[obj] = !$scope.cals[obj];
	};



	$scope.isValidDate=function(dateString)
	{
	    // First check for the pattern
	    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
	        return false;

	    // Parse the date parts to integers
	    var parts = dateString.split("/");
	    var day = parseInt(parts[1], 10);
	    var month = parseInt(parts[0], 10);
	    var year = parseInt(parts[2], 10);

	    // Check the ranges of month and year
	    if(year < 1000 || year > 3000 || month == 0 || month > 12)
	        return false;

	    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

	    // Adjust for leap years
	    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
	        monthLength[1] = 29;

	    // Check the range of the day
	    return day > 0 && day <= monthLength[month - 1];
	};


	defEmployee = function(user_provided_data) {
		//console.log(currentuser);
		emp={};
		emp.isNew=true;
		emp.isDirty=true;
		
		emp.showhminfo=true;
		emp.maindata={};
		
		emp.maindata.id=0;
		emp.maindata.applicationstatusid='';
		emp.maindata.ssn='';
		emp.maindata.ssnconfirmation='';
		emp.maindata.ssn4='';
		emp.maindata.firstname= typeof user_provided_data.populated_fields.firstname!='undefined' ? user_provided_data.populated_fields.firstname : '';
		emp.maindata.lastname= typeof user_provided_data.populated_fields.lastname!='undefined' ? user_provided_data.populated_fields.lastname : '';
		emp.maindata.middleinitial= typeof user_provided_data.populated_fields.middleinitial!='undefined' ? user_provided_data.populated_fields.middleinitial : '';
		emp.maindata.city= typeof user_provided_data.populated_fields.city!='undefined' ? user_provided_data.populated_fields.city : '';
		//emp.maindata.state='IL';
		emp.maindata.stateid=$scope.getStateMatch(user_provided_data.populated_fields.state);
		emp.maindata.zip=typeof user_provided_data.populated_fields.zip!='undefined' ? user_provided_data.populated_fields.zip : '';
		emp.maindata.address=typeof user_provided_data.populated_fields.address!='undefined' ? user_provided_data.populated_fields.address : '';
		emp.maindata.address2=typeof user_provided_data.populated_fields.address2!='undefined' ? user_provided_data.populated_fields.address2 : '';
		//emp.maindata.countyid=null;
		emp.maindata.dob= (typeof user_provided_data.populated_fields.dob!='undefined' && $scope.isValidDate(user_provided_data.populated_fields.dob))? user_provided_data.populated_fields.dob : null;

		emp.maindata.client={};
		emp.maindata.company={};
		emp.maindata.location={};
		/*
		emp.maindata.client.id= null; //currentuser.client.clientid;
		emp.maindata.client.name=''//currentuser.client.name;//typeof $scope.tcid.client.name!='undefined' ? $scope.tcid.client.name : null;
		emp.maindata.company.id=null
		emp.maindata.company.name='';
		emp.maindata.location.id=null;
		emp.maindata.location.name='';
		*/


		emp.maindata.client.id= typeof user_provided_data.clientid!='undefined' ? user_provided_data.clientid : null;
		emp.maindata.client.name='';//typeof $scope.tcid.client.name!='undefined' ? $scope.tcid.client.name : null;
		emp.maindata.company.id=typeof user_provided_data.companyid!='undefined' ? user_provided_data.companyid : null;
		emp.maindata.company.name='';
		emp.maindata.location.id=typeof user_provided_data.locationid!='undefined' ? user_provided_data.locationid : null;
		emp.maindata.location.name='';

		emp.maindata.clientid=emp.maindata.client.id;
		emp.maindata.companyid=emp.maindata.company.id;
		emp.maindata.locationid=emp.maindata.location.id;


		emp.maindata.rehire=0;
		emp.maindata.afdc=0;
		emp.maindata.foodstamps=0;
		emp.maindata.ssi=0;
		emp.maindata.ttw=0;
		emp.maindata.vocrehab=0;
		emp.maindata.deptva=0;
		emp.maindata.vocrehabagency=0;
		emp.maindata.veteran=0;
		emp.maindata.felon=0;
		emp.maindata.unemployed=0;
		emp.maindata.cdib=0;
		emp.maindata.cafoster=0;
		emp.maindata.cawia=0;
		emp.maindata.cacalworks=0;
		emp.maindata.cafarmer=0;
		emp.maindata.camisdemeanor=0;

		emp.maindata.feloninfo={};
		emp.maindata.feloninfo.stateid=null;
		emp.maindata.feloninfo.countyid=null;
		emp.maindata.feloninfo.isstateconviction=0;
		emp.maindata.feloninfo.isfederalconviction=0;
		emp.maindata.feloninfo.dateconviction=null;
		emp.maindata.feloninfo.daterelease=null;
		emp.maindata.feloninfo.paroleofficer=null;
		emp.maindata.feloninfo.paroleofficerphone=null;

		emp.maindata.veteraninfo={};
		emp.maindata.veteraninfo.branchid=null;
		emp.maindata.veteraninfo.disabled=null;
		emp.maindata.veteraninfo.servicestart='';
		emp.maindata.veteraninfo.servicestop='';

		emp.maindata.vocrehabinfo={};
		emp.maindata.vocrehabinfo.address='';
		emp.maindata.vocrehabinfo.city='';
		emp.maindata.vocrehabinfo.address2='';
		emp.maindata.vocrehabinfo.agency='';
		emp.maindata.vocrehabinfo.countyid='';
		emp.maindata.vocrehabinfo.phone='';
		emp.maindata.vocrehabinfo.stateid='';
		emp.maindata.vocrehabinfo.zip='';

		emp.maindata.unemploymentinfo={};
		emp.maindata.unemploymentinfo.unemployedstart='';
		emp.maindata.unemploymentinfo.unemployedstop='';
		emp.maindata.unemploymentinfo.compensated=null;
		emp.maindata.unemploymentinfo.compensatedstart='';
		emp.maindata.unemploymentinfo.compensatedstop='';


        emp.maindata.doh = $filter('date')(new Date(), 'MM/dd/yyyy');
        emp.maindata.dgi = $filter('date')(new Date(), 'MM/dd/yyyy');
        emp.maindata.dsw = $filter('date')(new Date(), 'MM/dd/yyyy');
        emp.maindata.dojo = $filter('date')(new Date(), 'MM/dd/yyyy');
        emp.maindata.startingwage = null;
	
	/*	var today = new Date();
    	var dd = today.getDate();
    	var mm = today.getMonth()+1; //January is 0!
    	var yyyy = today.getFullYear();
    	if(dd<10){dd='0'+dd} 
    	if(mm<10){mm='0'+mm} 
        var today = dd+'/'+mm+'/'+yyyy;
    console.log(today);
    alert(today);

		emp.maindata.doh=today;
		emp.maindata.dgi=today;
		emp.maindata.dsw=today;
		emp.maindata.dojo=today;
		*/
		emp.maindata.startingwage=null;
		emp.maindata.occupationid=null;
		emp.maindata.hashiringmanager=0;
		emp.maindata.userentered=typeof user_provided_data.id!='undefined' ? user_provided_data.id : null;

		emp.maindata.hiring_manager_completed=0;
		

		emp.maindata.esign=0;
		emp.maindata.authorization=0;

		emp.maindata.formQualify=0;
		emp.maindata.autoQualify=0;
		emp.maindata.qualifications = [];
		emp.maindata.tractid = '';
		emp.maindata.geoqualify = null;
		emp.maindata.ruralrenewalcity = '';

		return emp;
	}


	 $scope.getCounties=function(st){
	 	if (st == undefined) {return false;}
	 	if (st.length==0) {return false;}
	 	if ($scope.tcid.gettingcounties[st]) {return false;}
		$scope.tcid.gettingcounties[st]=true;

		if ($scope.tcid.counties[st] == undefined) {
			console.log(st,'*** hopefully only once*****   counties for this state yet, so load it up!!!',st);

			$http.get($scope.apiURL+'/counties/getbystate?stateid='+st)
			.success(function (data) {
				$scope.tcid.counties[st]=data.rows;
				$scope.tcid.gettingcounties[st]=false;
				console.log(st,'**** tcid.counties[st] was just set!!! ',$scope.tcid.counties[st]);
				return $scope.tcid.counties[st];
			});
		} else {
			// console.log('counties array data is defined, return existing array: ');
			$scope.tcid.gettingcounties[st]=false;
			return $scope.tcid.counties[st];
		}

	    return;
	}

	    $scope.setDefaults = function() {
        if($scope.debug)console.log('setting data');

        $scope.tcid.employee.showhminfo = true;
        $scope.tcid.employee.maindata = {};

        $scope.tcid.employee.maindata.id = 0;

        $scope.tcid.employee.maindata.applicationstatusid = '';
        $scope.tcid.employee.maindata.ssn = '111-11-1111';
        $scope.tcid.employee.maindata.ssnconfirmation = '111-11-1111';
        $scope.tcid.employee.maindata.ssn4 = '';
        $scope.tcid.employee.maindata.firstname = 'plugin';
        $scope.tcid.employee.maindata.lastname = 'test';
        $scope.tcid.employee.maindata.middleinitial = '';
        $scope.tcid.employee.maindata.city = 'chicago';
        //$scope.tcid.employee.maindata.state='IL';
        $scope.tcid.employee.maindata.stateid = 13;
        $scope.tcid.employee.maindata.zip = '60606';
        $scope.tcid.employee.maindata.address = '123 main street';
        $scope.tcid.employee.maindata.address2 = '';
        //$scope.tcid.employee.maindata.countyid=null;
        $scope.tcid.employee.maindata.dob = '11/11/1973';

        $scope.tcid.employee.maindata.client = {};
        $scope.tcid.employee.maindata.company = {};
        $scope.tcid.employee.maindata.location = {};
        $scope.tcid.employee.maindata.client.id = 364; //$scope.currentuser().client.clientid;
        $scope.tcid.employee.maindata.client.name = ''; ///$scope.currentuser().client.name;
        $scope.tcid.employee.maindata.company.id = null;
        $scope.tcid.employee.maindata.company.name = '';
        $scope.tcid.employee.maindata.location.id = null;
        $scope.tcid.employee.maindata.location.name = '';

        $scope.tcid.employee.maindata.clientid = function() {
            return $scope.tcid.employee.maindata.client.id
        };
        $scope.tcid.employee.maindata.companyid = function() {
            return $scope.tcid.employee.maindata.company.id;
        };
        $scope.tcid.employee.maindata.locationid = $scope.tcid.employee.maindata.location.id;


        $scope.tcid.employee.maindata.rehire = 0;
        $scope.tcid.employee.maindata.afdc = 0;
        $scope.tcid.employee.maindata.foodstamps = 0;
        $scope.tcid.employee.maindata.ssi = 0;
        $scope.tcid.employee.maindata.ttw = 0;
        $scope.tcid.employee.maindata.vocrehab = 0;
        $scope.tcid.employee.maindata.deptva = 0;
        $scope.tcid.employee.maindata.vocrehabagency = 0;
        $scope.tcid.employee.maindata.veteran = 0;
        $scope.tcid.employee.maindata.felon = 0;
        $scope.tcid.employee.maindata.unemployed = 0;
        $scope.tcid.employee.maindata.cdib = 0;
        $scope.tcid.employee.maindata.cafoster = 0;
        $scope.tcid.employee.maindata.cawia = 0;
        $scope.tcid.employee.maindata.cacalworks = 0;
        $scope.tcid.employee.maindata.cafarmer = 0;
        $scope.tcid.employee.maindata.camisdemeanor = 0;

        $scope.tcid.employee.maindata.feloninfo = {};
        $scope.tcid.employee.maindata.feloninfo.stateid = null;
        $scope.tcid.employee.maindata.feloninfo.countyid = null;
        $scope.tcid.employee.maindata.feloninfo.isstateconviction = 0;
        $scope.tcid.employee.maindata.feloninfo.isfederalconviction = 0;
        $scope.tcid.employee.maindata.feloninfo.dateconviction = null;
        $scope.tcid.employee.maindata.feloninfo.daterelease = null;
        $scope.tcid.employee.maindata.feloninfo.paroleofficer = null;
        $scope.tcid.employee.maindata.feloninfo.paroleofficerphone = null;

        $scope.tcid.employee.maindata.veteraninfo = {};
        $scope.tcid.employee.maindata.veteraninfo.branchid = null;
        $scope.tcid.employee.maindata.veteraninfo.disabled = null;
        $scope.tcid.employee.maindata.veteraninfo.servicestart = '';
        $scope.tcid.employee.maindata.veteraninfo.servicestop = '';

        $scope.tcid.employee.maindata.vocrehabinfo = {};
        $scope.tcid.employee.maindata.vocrehabinfo.address = '';
        $scope.tcid.employee.maindata.vocrehabinfo.city = '';
        $scope.tcid.employee.maindata.vocrehabinfo.address2 = '';
        $scope.tcid.employee.maindata.vocrehabinfo.agency = '';
        $scope.tcid.employee.maindata.vocrehabinfo.countyid = '';
        $scope.tcid.employee.maindata.vocrehabinfo.phone = '';
        $scope.tcid.employee.maindata.vocrehabinfo.stateid = '';
        $scope.tcid.employee.maindata.vocrehabinfo.zip = '';

        $scope.tcid.employee.maindata.unemploymentinfo = {};
        $scope.tcid.employee.maindata.unemploymentinfo.unemployedstart = '';
        $scope.tcid.employee.maindata.unemploymentinfo.unemployedstop = '';
        $scope.tcid.employee.maindata.unemploymentinfo.compensated = null;
        $scope.tcid.employee.maindata.unemploymentinfo.compensatedstart = '';
        $scope.tcid.employee.maindata.unemploymentinfo.compensatedstop = '';


        $scope.tcid.employee.maindata.doh = '2/11/2015';
        $scope.tcid.employee.maindata.dgi = '2/11/2015';
        $scope.tcid.employee.maindata.dsw = '2/11/2015';
        $scope.tcid.employee.maindata.dojo = '2/11/2015';
        $scope.tcid.employee.maindata.startingwage = null;
        $scope.tcid.employee.maindata.occupationid = null;
        $scope.tcid.employee.maindata.hashiringmanager = 0;
        $scope.tcid.employee.maindata.userentered = 942;

        $scope.tcid.employee.maindata.hiring_manager_completed = 0;


        $scope.tcid.employee.maindata.esign = 0;
        $scope.tcid.employee.maindata.authorization = 0;

        $scope.tcid.employee.maindata.formQualify = 0;
        $scope.tcid.employee.maindata.autoQualify = 0;
        $scope.tcid.employee.maindata.qualifications = [];
        $scope.tcid.employee.maindata.tractid = '';
        $scope.tcid.employee.maindata.geoqualify = null;
        $scope.tcid.employee.maindata.ruralrenewalcity = '';

        return emp;
    }
    
	var mergeCCL=function(indata) {
		var tmpindata=[];
		tmpindata.clients=[{"id":indata.companies[0].maindata.clientid, "legal_name":"temp name"}];
		var ret={};
		ret.clients=[];
		angular.forEach(tmpindata.clients, function( key, value ) {
			var tmpclient=key;
			tmpclient.companies=[];
			angular.forEach(indata.companies, function( key, value ) {
                console.log(key); console.log(value);
				
				if (tmpclient.id==key.maindata.clientid) {
					var tmpcompany=key.maindata;
					tmpcompany.locations=[];
					angular.forEach(indata.locations, function( key, value ) {
						if (tmpcompany.id==key.maindata.companyid) {
							tmpcompany.locations.push(key.maindata);
						}
					});
					tmpclient.companies.push(tmpcompany);
				}
			});	
			ret.clients.push(tmpclient);
		});
		console.log(ret);
		return ret;
	};

    $scope.getCurrentUser=function(tcid){
    		//TODO create method in api which returns the same data as device2fa but accepts a client-side apikey which we check against (this apikey should only be able to work with this method and the save method)
    		var checkapi2fa='';
    		return $http.get($scope.apiURL+'/api/v1/users/authenticate_plugin?cclhash=123123&plugin=true&apikey='+$scope.tcid.api_key+'&u='+$scope.tcid.username+'&api2fa='+checkapi2fa+'&device='+window.location.hostname)
    		//$scope.tcid.checkapi2fa='';
    		//$scope.tcid.device='temp_device22f';
			//$scope.tcid.url2fa = $scope.apiURL+'/api/v1/users/device2fa?cclhash=123123&pw=' + $scope.tcid.pw + '&u=' + $scope.tcid.u +'&device='+$scope.tcid.device+'&api2fa='+$scope.tcid.checkapi2fa;
	
			.then(function(response) {
					console.log(response);
					if (angular.isDefined($scope.tcid.api_key) && $scope.tcid.api_key!='' && $scope.tcid.api_key.length==32 && $scope.tcid.u!='') {
						tcid.didlogin=true;
						tcid.username=response.data.loggedInAPIUser.user.username;
						tcid.privilegeid=response.data.loggedInAPIUser.user.privilegeid;
						tcid.email=response.data.loggedInAPIUser.user.email;
						tcid.name=response.data.loggedInAPIUser.user.firstname + ' ' +response.data.loggedInAPIUser.user.lastname;
						tcid.client={};
						tcid.client.name=response.data.loggedInAPIUser.user.client_name;
						tcid.client.clientid=response.data.loggedInAPIUser.user.clientid;	
						tcid.company={};
						tcid.company.name='company name to be looked up';
						tcid.company.companyid=response.data.loggedInAPIUser.user.companyid;
						tcid.location={};
						tcid.location.name='location name to be looked up';
						tcid.location.locationid=response.data.loggedInAPIUser.user.locationid;
						tcid.ccl=mergeCCL(response.data.loggedInAPIUser.ccl.data);
						$scope.currentUser=tcid;
						
					} 
			        return tcid;
			    });
	};

	$scope.getStateMatch=function(st){	
		if(typeof st !== 'undefined' || st !== ''){
			for(var i=1;i<$scope.tcid.state.length;i++){
				var s=st.toUpperCase();
				if(s==$scope.tcid.state[i].name || s==$scope.tcid.state[i].code){
					console.log("true"+i);
					return i;
				}
				
			}
		}
		return 0;
	};

    $scope.tcid.state = [];
    $scope.tcid.state[1] = {
        "name": "ALASKA",
        "code": "AK"
    };
    $scope.tcid.state[2] = {
        "name": "ALABAMA",
        "code": "AL"
    };
    $scope.tcid.state[3] = {
        "name": "ARKANSAS",
        "code": "AR"
    };
    $scope.tcid.state[4] = {
        "name": "ARIZONA",
        "code": "AZ"
    };
    $scope.tcid.state[5] = {
        "name": "CALIFORNIA",
        "code": "CA"
    };
    $scope.tcid.state[6] = {
        "name": "COLORADO",
        "code": "CO"
    };
    $scope.tcid.state[7] = {
        "name": "CONNECTICUT",
        "code": "CT"
    };
    $scope.tcid.state[8] = {
        "name": "DISTRICT OF COLUMBIA",
        "code": "DC"
    };
    $scope.tcid.state[9] = {
        "name": "DELAWARE",
        "code": "DE"
    };
    $scope.tcid.state[10] = {
        "name": "FLORIDA",
        "code": "FL"
    };
    $scope.tcid.state[11] = {
        "name": "GEORGIA",
        "code": "GA"
    };
    $scope.tcid.state[12] = {
        "name": "GUAM",
        "code": "GU"
    };
    $scope.tcid.state[13] = {
        "name": "HAWAII",
        "code": "HI"
    };
    $scope.tcid.state[14] = {
        "name": "IOWA",
        "code": "IA"
    };
    $scope.tcid.state[15] = {
        "name": "IDAHO",
        "code": "ID"
    };
    $scope.tcid.state[16] = {
        "name": "ILLINOIS",
        "code": "IL"
    };
    $scope.tcid.state[17] = {
        "name": "INDIANA",
        "code": "IN"
    };
    $scope.tcid.state[18] = {
        "name": "KANSAS",
        "code": "KS"
    };
    $scope.tcid.state[19] = {
        "name": "KENTUCKY",
        "code": "KY"
    };
    $scope.tcid.state[20] = {
        "name": "LOUISIANA",
        "code": "LA"
    };
    $scope.tcid.state[21] = {
        "name": "MASSACHUSETTS",
        "code": "MA"
    };
    $scope.tcid.state[22] = {
        "name": "MARYLAND",
        "code": "MD"
    };
    $scope.tcid.state[23] = {
        "name": "MAINE",
        "code": "MA"
    };
    $scope.tcid.state[24] = {
        "name": "MICHIGAN",
        "code": "MI"
    };
    $scope.tcid.state[25] = {
        "name": "MINNESOTA",
        "code": "MN"
    };
    $scope.tcid.state[26] = {
        "name": "MISSOURI",
        "code": "MS"
    };
    $scope.tcid.state[27] = {
        "name": "MISSISSIPPI",
        "code": "MP"
    };
    $scope.tcid.state[28] = {
        "name": "MONTANA",
        "code": "MT"
    };
    $scope.tcid.state[29] = {
        "name": "NORTH CAROLINA",
        "code": "NC"
    };
    $scope.tcid.state[30] = {
        "name": "NORTH DAKOTA",
        "code": "ND"
    };
    $scope.tcid.state[31] = {
        "name": "NEBRASKA",
        "code": "NE"
    };
    $scope.tcid.state[32] = {
        "name": "NEW HAMPSHIRE",
        "code": "NH"
    };
    $scope.tcid.state[33] = {
        "name": "NEW JERSEY",
        "code": "NJ"
    };
    $scope.tcid.state[34] = {
        "name": "NEW MEXICO",
        "code": "NM"
    };
    $scope.tcid.state[35] = {
        "name": "NEVADA",
        "code": "NV"
    };
    $scope.tcid.state[36] = {
        "name": "NEW YORK",
        "code": "NY"
    };
    $scope.tcid.state[37] = {
        "name": "OHIO",
        "code": "OH"
    };
    $scope.tcid.state[38] = {
        "name": "OKLAHOMA",
        "code": "OK"
    };
    $scope.tcid.state[39] = {
        "name": "OREGON",
        "code": "OR"
    };
    $scope.tcid.state[40] = {
        "name": "PENNSYLVANIA",
        "code": "PA"
    };
    $scope.tcid.state[41] = {
        "name": "PUERTO RICO",
        "code": "PR"
    };
    $scope.tcid.state[42] = {
        "name": "PALAU",
        "code": "PL"
    };
    $scope.tcid.state[43] = {
        "name": "RHODE ISLAND",
        "code": "RI"
    };
    $scope.tcid.state[44] = {
        "name": "SOUTH CAROLINA",
        "code": "SC"
    };
    $scope.tcid.state[45] = {
        "name": "SOUTH DAKOTA",
        "code": "SD"
    };
    $scope.tcid.state[46] = {
        "name": "TENNESSEE",
        "code": "TN"
    };
    $scope.tcid.state[47] = {
        "name": "TEXAS",
        "code": "TX"
    };
    $scope.tcid.state[48] = {
        "name": "UTAH",
        "code": "UT"
    };
    $scope.tcid.state[49] = {
        "name": "VIRGINIA",
        "code": "VI"
    };
    $scope.tcid.state[50] = {
        "name": "VERMONT",
        "code": "VT"
    };
    $scope.tcid.state[51] = {
        "name": "WASHINGTON",
        "code": "WA"
    };
    $scope.tcid.state[52] = {
        "name": "WISCONSIN",
        "code": "WI"
    };
    $scope.tcid.state[53] = {
        "name": "WEST VIRGINIA",
        "code": "WV"
    };
    $scope.tcid.state[54] = {
        "name": "WYOMING",
        "code": "WY"
    };
    $scope.tcid.state[55] = {
        "name": "VIRGIN ISLANDS",
        "code": "VI"
    };
/*

Possible reasons for breakage: 
	accidentally commented out document.ready in common.js
	args is being passed to defEmployee and it should be args.data?


*/	



	$scope.$on('$messageIncoming', function(event, args) {
        switch(args.plugin_type.toLowerCase()) {
                case 'demo':
                      $scope.isATS=false;
                      $scope.isDisabled=true;     
                      break;
                case 'ats':
                		//TODO add to documentation that if its an ats then we hide CCL input fields, authorization, esign, etc and we assume CCL IDs are provided
                      $scope.isATS=true;       
                      break;
                case 'obs':
                	$scope.isATS=false;
                    break;
                default:
                    sendMessage('stop');
          }

			$scope.tcid.api_key=args.apikey;
			$scope.tcid.username=args.username;
			
			console.log(args);
			$scope.args=args;
			
			
			if(args.logo === false){
				$scope.showLogo=false;
			}else if(args.logo===true || args.logo==''){
				if(window.location.host=='localhost'){$scope.logo='/plugin/widget/iframe/images/retrotax_plugin_logo.png';}else{$scope.logo='/widget/iframe/images/retrotax_plugin_logo.png';}
				$scope.showLogo=true;
			}else{
				console.log("else"+args.logo);
				$scope.logo=args.logo;
				$scope.showLogo=true;
			}
			
			$scope.hasProvided={};
			$scope.hasProvided.clientid=typeof args.clientid!='undefined' ? true : false;
			$scope.hasProvided.companyid= (typeof args.companyid !== 'undefined' && args.companyid !== false) ? true : false;
			$scope.hasProvided.locationid=(typeof args.locationid!='undefined' && args.locationid !== false) ? true : false;
			//$scope.hasProvided.firstname=typeof args.populated_fields.firstname!='undefined' ? true : false;
			console.log($scope.hasProvided);
	
			$scope.tcid.employee=defEmployee(args);
console.log($scope.tcid.employee);
			$scope.getCurrentUser($scope.tcid);



//TODO if companyid or locationid are supplied then we hide those fields; otherwise we make a request to get locations dropdown...if it's a single company, we hide it but if there are additional we dodropdown
		console.log($scope);	
	});
	// TODO: Make this work
	$scope.stopIFRAME=function(){
		var m = JSON.stringify({status: 200, message: 'stop'});
		scope.sender.postMessage(m, '*');
	}
});
/*

app.directive('showErrors', function ($timeout, showErrorsConfig) {
      var getShowSuccess, linkFn;
      getShowSuccess = function (options) {
        var showSuccess;
        showSuccess = showErrorsConfig.showSuccess;
        if (options && options.showSuccess != null) {
          showSuccess = options.showSuccess;
        }
        return showSuccess;
      };
      linkFn = function (scope, el, attrs, formCtrl) {
        var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses;
        blurred = false;
        options = scope.$eval(attrs.showErrors);
        showSuccess = getShowSuccess(options);
        inputEl = el[0].querySelector('[name]');
        inputNgEl = angular.element(inputEl);
        inputName = inputNgEl.attr('name');
        if (!inputName) {
          throw 'show-errors element has no child input elements with a \'name\' attribute';
        }
        inputNgEl.bind('blur', function () {
          blurred = true;
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$watch(function () {
          return formCtrl[inputName] && formCtrl[inputName].$invalid;
        }, function (invalid) {
          if (!blurred) {
            return;
          }
          return toggleClasses(invalid);
        });
        scope.$on('show-errors-check-validity', function () {
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$on('show-errors-reset', function () {
          return $timeout(function () {
            el.removeClass('has-error');
            el.removeClass('has-success');
            return blurred = false;
          }, 0, false);
        });
        return toggleClasses = function (invalid) {
          el.toggleClass('has-error', invalid);
          if (showSuccess) {
            return el.toggleClass('has-success', !invalid);
          }
        };
      };
      return {
        restrict: 'A',
        require: '^form',
        compile: function (elem, attrs) {
          if (!elem.hasClass('form-group')) {
            throw 'show-errors element does not have the \'form-group\' class';
          }
          return linkFn;
        }
      };
    }
  );
  
  app.provider('showErrorsConfig', function () {
    var _showSuccess;
    _showSuccess = false;
    this.showSuccess = function (showSuccess) {
      return _showSuccess = showSuccess;
    };
    this.$get = function () {
      return { showSuccess: _showSuccess };
    };
  });

  */