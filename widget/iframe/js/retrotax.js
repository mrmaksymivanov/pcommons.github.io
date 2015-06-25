//(function(){"use strict";var a;a=angular.module("ngPostMessage",["ng"]),a.run(["$window","$postMessage","$rootScope",function(a,b,c){c.$on("$messageOutgoing",function(b,d,e){var f;return null==e&&(e="*"),f=c.sender||a.parent,f.postMessage(d,e)}),angular.element(a).bind("message",function(a){var d,e;if(a=a.originalEvent||a,a&&a.data){e=null,c.sender=a.source;try{e=angular.fromJson(a.data)}catch(f){d=f,console.error("ahem",d),e=a.data}return c.$root.$broadcast("$messageIncoming",e),b.messages(e)}})}]),a.factory("$postMessage",["$rootScope",function(a){var b,c;return b=[],c={messages:function(c){return c&&(b.push(c),a.$digest()),b},lastMessage:function(){return b[b.length-1]},post:function(b,c){return c||(c="*"),a.$broadcast("$messageOutgoing",b,c)}}}])}).call(this);

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


var app = angular.module("retrotax", ['ngRoute','ui.bootstrap','ngMask','ngPostMessage']);




app.config(function($routeProvider, $locationProvider){
//app.config(function($routeProvider){

	$routeProvider.
		when("/:param1",
			{	templateUrl: "/widget/iframe/modal.html",
				controller: "ctlEmployee"});

	//$locationProvider.html5Mode(false);
	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});

});


app.factory('AuthService', ['$http', '$q', function ($http, $q) {
	var lcurrentuser={};
	var lcu_locations=[];
	var lcu_companies=[];
	var lcu_clients=[];
	var TCID_DOMAIN='http://tcid.retrotax.co/api/v1/';
	var isLoggedIn=false;
	var isDeviceAuth=false;
  

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

		// console.log('mergeccl ret: ',ret);

		return ret;
	}

	var cnt=0;
	return {
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
	plugin_auth: function(tcid) {
		console.log(tcid);
		//return $http.get('http://tcid.retrotax.co/api/v1/api_employees/view?apikey='+$scope.currentuser().api_key+'&u='+$scope.currentuser().username+'&employeeid=0')
		return $http.get(this.getRetroURL()+'/api/v1/documents/list?apikey=111BC0B55FEF6737944B37B1CA2DBED3&u=demoapi.new.employee&employeeid=0')

			.then(function(response) {
					console.log("PLUGIN AUTH");
					console.log(response);
					if (angular.isDefined(response.data.APIKEY)) {tcid.api_key=response.data.APIKEY;}
					if (angular.isDefined(response.data.apikey)) {tcid.api_key=response.data.apikey;}
					tcid.api_key='F5171AE353A64CD396A45F54EC10F373';
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

						//tcid.ccl=mergeCCL(response.data.loggedInAPIUser.ccl.data);

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
	currentuser: function() {return lcurrentuser;},

	getRetroURL: function(debug){
		console.log(window.location.hostname);
        if(typeof device != "undefined") return (debug==true) ? "http://tcid.retrotax.co":"https://webscreen.retrotax-aci.com";
 		return (window.location.hostname=="plugin-paulcommons.rhcloud.com" || window.location.hostname=="localhost") ? "http://tcid.retrotax.co":"https://webscreen.retrotax-aci.com";     
    }

	};

}]);










app.controller("ctlEmployee", function($scope, $http, $route, $routeParams, $location, $window, $postMessage, $rootScope){
	console.log("Employees Controller");
	var param1 = $routeParams.param1;
	console.log(param1);
	$scope.currentemployeeid;
	$scope.alerts = [];
    $scope.tcid={};
	$scope.tcid.employee={};
	$scope.tcid.employees=[];
	$scope.tmpcomp=null; //$index
	//$scope.tcid.searchform={"firstname":"","lastname":"","appstatus":"*","ssn4":""};
	
	$scope.tcid.counties=[];
	$scope.tcid.gettingcounties=[];

	$scope.currentemployeeid=0;
	$routeParams.employeeid='new';
	$scope.cals=[dgi=false,dsw=false,dojo=false,dsw=false,doh=false,dob=false,felondc=false,felondr=false];

	//$scope.isLoggedIn=function(tcid){return AuthService.plugin_auth(tcid);}; 
	//$scope.currentuser=function(){return AuthService.currentuser();};
	var getRetroURL=function(debug){
		console.log(window.location.hostname);
        if(typeof device != "undefined") return (debug==true) ? "http://tcid.retrotax.co":"https://webscreen.retrotax-aci.com";
 		return (window.location.hostname=="plugin-paulcommons.rhcloud.com" || window.location.hostname=="localhost") ? "http://tcid.retrotax.co":"https://webscreen.retrotax-aci.com";     
    }

	$scope.apiURL=getRetroURL(false);
	console.log($scope.apiURL);
    //console.log($scope.currentuser);

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


	$scope.initView = function() {
		//console.log('geting counties: ',$scope.getCounties(17));
	};
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
 		if ($scope.tcid.employee.maindata == undefined) { return false; }
 		if($scope.isATS){
 			return 364;
 		}else{
			//return getIndexOf($scope.currentuser().ccl.clients, $scope.tcid.employee.maindata.client.id, 'id');
 		}
	};
	$scope.getSelectedCompanyIndex = function() {
		if ($scope.tcid.employee.maindata == undefined) { return false; }
 		if($scope.isATS){
 			return 1054;
 		}else{
			//return getIndexOf($scope.currentuser().ccl.clients[$scope.getSelectedClientIndex()].companies, $scope.tcid.employee.maindata.company.id, 'id');
		}
	};

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
				$location.path("/new");
				//dataFromServer.SAVEDID
			}
		});
		responsePromise.error(function(data, status, headers, config) {
		alert("Submitting form failed!");
		});
	}

	$scope.calop = function($event,obj) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.cals[obj] = !$scope.cals[obj];
	};


	defEmployee = function(user_provided_data, currentuser) {
		console.log(currentuser);
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
		emp.maindata.stateid=0;
		emp.maindata.zip=typeof user_provided_data.populated_fields.zip!='undefined' ? user_provided_data.populated_fields.zip : '';
		emp.maindata.address=typeof user_provided_data.populated_fields.address!='undefined' ? user_provided_data.populated_fields.address : '';
		emp.maindata.address2=typeof user_provided_data.populated_fields.address2!='undefined' ? user_provided_data.populated_fields.address2 : '';
		//emp.maindata.countyid=null;
		emp.maindata.dob=typeof user_provided_data.populated_fields.dob!='undefined' ? user_provided_data.populated_fields.dob : '';

		emp.maindata.client={};
		emp.maindata.company={};
		emp.maindata.location={};
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

		var today = new Date();
    	var dd = today.getDate();
    	var mm = today.getMonth()+1; //January is 0!
    	var yyyy = today.getFullYear();
    	if(dd<10){dd='0'+dd} 
    	if(mm<10){mm='0'+mm} 
        var today = dd+'/'+mm+'/'+yyyy;

		emp.maindata.doh=today;
		emp.maindata.dgi=today;
		emp.maindata.dsw=today;
		emp.maindata.dojo=today;
		emp.maindata.startingwage=null;
		emp.maindata.occupationid=null;
		emp.maindata.hashiringmanager=0;
		//emp.maindata.userentered=$scope.currentuser().id;

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

	$scope.$on('$messageIncoming', function(event, args) {
		console.log(args);
		console.log(args.populated_fields.firstname);
				console.log(args.clientid);
						console.log(args.companyid);
								console.log(args.locationid);



		console.log($scope.tcid);
		$scope.tcid.employee=defEmployee(args,$scope.tcid);
		console.log($scope.tcid);

        switch(args.plugin_type) {
                case 'demo':
                      $scope.isATS=false;
                      $scope.isDisabled=true;     
                      break;
                case 'ats':
                      $scope.isATS=true;       
                      break;
                case 'obs':
                	$scope.isATS=false;
                    break;
                default:
                    sendMessage('stop');
          }
	});

	$scope.stopIFRAME=function(){
		var m = JSON.stringify({status: 200, message: 'stop'});
		scope.sender.postMessage(m, '*');
	}
});


