var app = angular.module("app", ['ngRoute','ui.bootstrap','ngMask']);




app.config(function($routeProvider, $locationProvider){
//app.config(function($routeProvider){

	$routeProvider.
		when("/",
			{	templateUrl: "/widget/iframe/js/modal.html",
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
