app.controller("ctlEmployee", function($scope, $http, $route, $routeParams, $location, AuthService ){
	$scope.currentemployeeid;
	$scope.alerts = [];
    $scope.tcid={};
	$scope.tcid.employee={};
	$scope.tcid.employees=[];
	$scope.tmpcomp=null; //$index
	$scope.tcid.searchform={"firstname":"","lastname":"","appstatus":"*","ssn4":""};
	
	$scope.tcid.counties=[];
	$scope.tcid.gettingcounties=[];
	//var $scope.calopenee = [];
	//$scope.calopenee["main"]=false;
	// $scope.calopenee["dgi"]=true;
	$scope.currentemployeeid=0;
	$routeParams.employeeid='new';
	$scope.cals=[dgi=false,dsw=false,dojo=false,dsw=false,doh=false,dob=false,felondc=false,felondr=false];
	//$scope.calOpened=[dgi=false,dsw=false,dojo=false,dsw=false,doh=false,dob=false];

	$scope.isLoggedIn=function(){return AuthService.plugin_auth(tcid);}; 
	$scope.currentuser=function(){return AuthService.currentuser();};
    console.log("IN SCOPE");
    console.log($scope.currentuser);

    console.log($scope);
    $scope.isLoggedIn();
    console.log($scope);


	$scope.thisPath='';
	//$scope.isATS=true;
	

	if ($routeParams.employeeid==undefined) {
		$scope.alerts.push({type:'danger',msg: ''});
	} else {
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

			} else if ($scope.currentemployeeid!=$routeParams.employeeid)  {
				// console.log('calling load function....');

				$scope.alerts.push({type:'success',msg: 'EDITING EMPLOYEE...'});
				$scope.currentemployeeid=$routeParams.employeeid;
				$scope.tcid.employee={};
				
				$scope.load($scope.currentemployeeid);
			}

		});
	}


	$scope.initView = function() {
		//console.log('geting counties: ',$scope.getCounties(17));
	};
	$scope.initEdit = function() {

		// console.log('geting counties 1: ',$scope.getCounties(1));
		// console.log('geting counties 2: ',$scope.getCounties(2));
		// console.log('geting counties 3: ',$scope.getCounties(3));
	};

	$scope.gotoEmployee=function(eid){
		console.log('navigating to employeed: ',eid);
		//$location.path("/employee/"+eid);
	};

	$scope.load = function(eid) {
		//eid=$scope.currentemployeeid;
		console.log('loading employee id: ',eid);
		$http.get('http://tcid.retrotax.co/api/v1/api_employees/view?apikey='+$scope.currentuser().api_key+'&u='+$scope.currentuser().username+'&employeeid='+eid)
		.success(function (data) {
			if (data.SUCCESS) {
				// console.log('laoded employee data from server, source json is: ',data.rows[0]);
				$scope.tcid.employee=setEmployee(data.rows[0]);

				$scope.tcid.employee.SUCCESS=true;
				console.log('employee loadded!');
				console.log($scope.tcid.employee);

// re-redirect to appropriate path based on current location and appstatusid
// console.log('$scope.tcid.employee.maindata.applicationstatusid',$scope.tcid.employee.maindata.applicationstatusid);
// console.log($location.path());

// preload state stuff?
$scope.getCounties(16);
				if ($scope.tcid.employee.maindata.applicationstatusid=='SS') {
					//$location.path("/employee/view/"+$scope.tcid.employee.maindata.id);
				} else {
					console.log('all other status go to edit page: ',$scope.thisPath);
					//$location.path("/employee/"+$scope.tcid.employee.maindata.id);
				}

				return true;

			} else {
				$scope.tcid.employee={};
				$scope.tcid.employee.SUCCESS=false;
				$scope.alerts.push({type:'danger',msg: data.message});
				return false;
			}
		})
		.error(function (data, status, headers, config) {
			console.log('http et eerror is', data);
			return false;
		});
	};

	$scope.atsLoadCCL = function() {
		//eid=$scope.currentemployeeid;
		console.log('loading ccl via employee view id: ');
		$http.get('http://tcid.retrotax.co/api/v1/api_employees/view?apikey='+$scope.currentuser().api_key+'&u='+$scope.currentuser().username+'&employeeid=1')
		.success(function (data) {
			if (data.SUCCESS || !data.SUCCESS) {
				// console.log('laoded employee data from server, source json is: ',data.rows[0]);
				$scope.tcid.employee=setEmployee(data.rows[0]);

				$scope.tcid.employee.SUCCESS=true;
				console.log('employee loadded!');
				console.log($scope.tcid.employee);
$scope.getCounties(16);

				return true;

			} else {
				$scope.tcid.employee={};
				$scope.tcid.employee.SUCCESS=false;
				$scope.alerts.push({type:'danger',msg: data.message});
				return false;
			}
		})
		.error(function (data, status, headers, config) {
			console.log('http et eerror is', data);
			return false;
		});
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



        // // function to submit the form after all validation has occurred            
        // $scope.submitForm = function(isValid) {

        //     // check to make sure the form is completely valid
        //     if (isValid) {
        //         alert('our form is amazing');
        //     }

        // };

	$scope.save = function(isValid) {
		console.log("--> Submitting form.. isValid?? ",isValid,'now check for $errors');


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
		$scope.tcid.employee.maindata.clientid=$scope.tcid.employee.maindata.client.id;
		$scope.tcid.employee.maindata.companyid=$scope.tcid.employee.maindata.company.id;
		$scope.tcid.employee.maindata.locationid=$scope.tcid.employee.maindata.location.id;

		console.log('attempting to save employee object:',$scope.tcid.employee.maindata);

		var responsePromise = $http.post('http://tcid.retrotax.co/api/v1/api_employees/save?u='+$scope.currentuser().username+'&apikey='+$scope.currentuser().api_key + '&companyid='+$scope.tcid.employee.maindata.companyid+'&locationid='+$scope.tcid.employee.maindata.locationid, $scope.tcid.employee.maindata, {});
		responsePromise.success(function(dataFromServer, status, headers, config) {
			console.log(dataFromServer);
			if (dataFromServer.SUCCESS) {
				//$location.path("/employee/"+dataFromServer.SAVEDID);
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


	defEmployee = function() {
		emp={};
		emp.isNew=true;
		emp.isDirty=true;
		
		emp.showhminfo=true;
		emp.maindata={};
		
		emp.maindata.id=0;

		emp.maindata.applicationstatusid='';
		emp.maindata.ssn='325-80-2657';
		emp.maindata.ssnconfirmation='325-80-2657';
		emp.maindata.ssn4='';
		emp.maindata.firstname='tom';
		emp.maindata.lastname='test';
		emp.maindata.middleinitial='';
		emp.maindata.city='chicago';
		//emp.maindata.state='IL';
		emp.maindata.stateid=13;
		emp.maindata.zip='60606';
		emp.maindata.address='123 main street';
		emp.maindata.address2='';
		//emp.maindata.countyid=null;
		emp.maindata.dob='11/11/1973';

		emp.maindata.client={};
		emp.maindata.company={};
		emp.maindata.location={};
		emp.maindata.client.id=$scope.currentuser().client.clientid;
		emp.maindata.client.name=$scope.currentuser().client.name;
		emp.maindata.company.id=null;
		emp.maindata.company.name='';
		emp.maindata.location.id=null;
		emp.maindata.location.name='';

		emp.maindata.clientid=function() {return emp.maindata.client.id};
		emp.maindata.companyid=function() {return emp.maindata.company.id;};
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
		emp.maindata.userentered=$scope.currentuser().id;

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

	setEmployee = function(src) {
		emp={};
		emp.isNew=false;
		emp.isDirty=false;
		
		emp.showhminfo=true;
		emp.maindata={};
		emp.maindata.id=src.maindata.id;
		emp.maindata.employeeid=src.maindata.id;
		emp.maindata.applicationstatusid=src.maindata.applicationstatusid;
		emp.maindata.ssn=src.maindata.ssn;
		emp.maindata.ssnconfirmation=src.maindata.ssnconfirmation;
		emp.maindata.ssn4=src.maindata.ssn4;
		emp.maindata.firstname=src.maindata.firstname;
		emp.maindata.lastname=src.maindata.lastname;
		emp.maindata.middleinitial=src.maindata.middleinitial;
		emp.maindata.city=src.maindata.city;
		// emp.maindata.state=src.maindata.state;
		emp.maindata.stateid=src.maindata.stateid;
		emp.maindata.zip=src.maindata.zip;
		emp.maindata.address=src.maindata.address;
		emp.maindata.address2=src.maindata.address2;
		//emp.maindata.county=src.maindata.county;
		emp.maindata.dob=src.maindata.dob;

		emp.maindata.client={};
		emp.maindata.company={};
		emp.maindata.location={};
		emp.maindata.client.id=src.maindata.clientid;
		emp.maindata.client.name=$scope.currentuser().client.name;
		emp.maindata.company.id=src.maindata.companyid;
		emp.maindata.company.name='';
		emp.maindata.location.id=src.maindata.locationid;
		emp.maindata.location.name='';

		emp.maindata.clientid=function() {return emp.maindata.client.id};
		emp.maindata.companyid=function() {return emp.maindata.company.id;};
		emp.maindata.locationid=emp.maindata.location.id;

		emp.maindata.rehire=src.maindata.rehire;
		emp.maindata.afdc=src.maindata.afdc;
		emp.maindata.foodstamps=src.maindata.foodstamps;
		emp.maindata.ssi=src.maindata.ssi;
		emp.maindata.ttw=src.maindata.ttw;
		emp.maindata.vocrehab=src.maindata.vocrehab;
		emp.maindata.deptva=src.maindata.deptva;
		emp.maindata.vocrehabagency=src.maindata.vocrehabagency;
		emp.maindata.veteran=src.maindata.veteran;
		emp.maindata.felon=src.maindata.felon;
		emp.maindata.unemployed=src.maindata.unemployed;
		emp.maindata.cdib=src.maindata.cdib;
		emp.maindata.cafoster=src.maindata.cafoster;
		emp.maindata.cawia=src.maindata.cawia;
		emp.maindata.cacalworks=src.maindata.cacalworks;
		emp.maindata.cafarmer=src.maindata.cafarmer;
		emp.maindata.camisdemeanor=src.maindata.camisdemeanor;
		
		emp.maindata.recipient={};
		if (src.maindata.afdc != undefined || src.maindata.foodstamps != undefined) {

			emp.maindata.recipient=src.maindata.recipient;
			
			// emp.maindata.recipient.recipient_name=src.maindata.recipient.recipient_name;
			// emp.maindata.recipient.recipient_relationship=src.maindata.recipient.recipient_relationship;
			// emp.maindata.recipient.recipient_cityreceived=src.maindata.recipient.recipient_cityreceived;
			// emp.maindata.recipient.recipient_countyreceived=src.maindata.recipient.recipient_countyreceived;
			// emp.maindata.recipient.recipient_statereceived=src.maindata.recipient.recipient_statereceived;
		}

		emp.maindata.feloninfo={};
		if (src.maindata.feloninfo != undefined) {
			emp.maindata.feloninfo.stateid=src.maindata.feloninfo.stateid;
			emp.maindata.feloninfo.countyid=src.maindata.feloninfo.countyid;
			emp.maindata.feloninfo.isstateconviction=src.maindata.feloninfo.isstateconviction;
			emp.maindata.feloninfo.isfederalconviction=src.maindata.feloninfo.isfederalconviction;
			emp.maindata.feloninfo.dateconviction=src.maindata.feloninfo.dateconviction;
			emp.maindata.feloninfo.daterelease=src.maindata.feloninfo.daterelease;
			emp.maindata.feloninfo.paroleofficer=src.maindata.feloninfo.paroleofficer;
			emp.maindata.feloninfo.paroleofficerphone=src.maindata.feloninfo.paroleofficerphone;
		}
		emp.maindata.veteraninfo={};
		if (src.maindata.veteraninfo != undefined) {
			emp.maindata.veteraninfo.branchid=src.maindata.veteraninfo.branchid;
			emp.maindata.veteraninfo.disabled=src.maindata.veteraninfo.disabled;
			emp.maindata.veteraninfo.servicestart=src.maindata.veteraninfo.servicestart;
			emp.maindata.veteraninfo.servicestop=src.maindata.veteraninfo.servicestop;
		}
		emp.maindata.vocrehabinfo={};
		if (src.maindata.vocrehabinfo != undefined) {
			emp.maindata.vocrehabinfo.address=src.maindata.vocrehabinfo.address;
			emp.maindata.vocrehabinfo.city=src.maindata.vocrehabinfo.city;
			emp.maindata.vocrehabinfo.address2=src.maindata.vocrehabinfo.address2;
			emp.maindata.vocrehabinfo.agency=src.maindata.vocrehabinfo.agency;
			emp.maindata.vocrehabinfo.countyid=src.maindata.vocrehabinfo.countyid;
			emp.maindata.vocrehabinfo.phone=src.maindata.vocrehabinfo.phone;
			emp.maindata.vocrehabinfo.stateid=src.maindata.vocrehabinfo.stateid;
			emp.maindata.vocrehabinfo.zip=src.maindata.vocrehabinfo.zip;
		}
		emp.maindata.unemploymentinfo={};
		if (src.maindata.unemploymentinfo != undefined) {
			emp.maindata.unemploymentinfo.unemployedstart=src.maindata.unemploymentinfo.unemployedstart;
			emp.maindata.unemploymentinfo.unemployedstop=src.maindata.unemploymentinfo.unemployedstop;
			emp.maindata.unemploymentinfo.compensated=src.maindata.unemploymentinfo.compensated;
			emp.maindata.unemploymentinfo.compensatedstart=src.maindata.unemploymentinfo.compensatedstart;
			emp.maindata.unemploymentinfo.compensatedstop=src.maindata.unemploymentinfo.compensatedstop;
		}
		
		emp.maindata.doh=src.maindata.doh;
		emp.maindata.dgi=src.maindata.dgi;
		emp.maindata.dsw=src.maindata.dsw;
		emp.maindata.dojo=src.maindata.dojo;
		emp.maindata.startingwage=src.maindata.startingwage;
		emp.maindata.occupationid=src.maindata.occupationid;
		emp.maindata.hashiringmanager=src.maindata.hashiringmanager;
		emp.maindata.userentered=src.maindata.userentered;

		emp.maindata.hiring_manager_completed=src.maindata.hiring_manager_completed;
		emp.maindata.esign=1;
		emp.maindata.authorization=1;

		emp.maindata.formQualify=0;
		emp.maindata.autoQualify=0;
		emp.maindata.qualifications = [];
		emp.maindata.tractid = '';
		emp.maindata.geoqualify = null;
		emp.maindata.ruralrenewalcity = '';

		return emp;
	}	






	$scope.searchinit = function() {
		$scope.tcid.searchform={"firstname":"","lastname":"","appstatus":"*","ssn4":""};
	}


	$scope.getEmployees = function(prm) {
		$scope.alerts=[];
		if (prm==undefined) {prm={};}
		if (prm.ref==undefined) {prm.ref=false;}
		
		console.log('search form criteria:',$scope.tcid.searchform);
		
		addURL='';
		if ($scope.tcid.searchform.firstname.length > 1) {addURL+='&firstname='+$scope.tcid.searchform.firstname;}
		if ($scope.tcid.searchform.lastname.length > 1) {addURL+='&lastname='+$scope.tcid.searchform.lastname;}
		if ($scope.tcid.searchform.ssn4.length==4) {addURL+='&ssn4='+$scope.tcid.searchform.ssn4;}
	
		if ($scope.tcid.searchform.appstatus=='*') {
			addURL+='&sortField=id&sortDir=DESC';
		}
		if ($scope.tcid.searchform.appstatus=='recent') {
			addURL+='&sortField=id&sortDir=DESC';
		}
		if ($scope.tcid.searchform.appstatus=='incomplete') {
			addURL+='&applicationstatusid=';
		}
		if ($scope.tcid.searchform.appstatus.length==2) {
			addURL+='&applicationstatusid='+$scope.tcid.searchform.appstatus;
		}
		

		console.log('getemployees.. passed params: ',prm);

		if ($scope.tcid.employees == undefined) {$scope.tcid.employees=[];}	

		if (!prm.ref) {
			if ($scope.tcid.employees.length>0) {
				console.log('using exising employees data');
				return true;
			} else {
				var tmpemps = JSON.parse(localStorage.getItem('employees'));
				console.log('setting employees data from local sorage successfully');
				if (angular.isArray(tmpemps)) {
					$scope.tcid.employees=tmpemps;
					return true;
				}
			}
		}

		doref=($scope.tcid.employees.length==0);
		if (prm.ref!=undefined) {doref=prm.ref;} 

		if (doref) {
			$http.get('http://tcid.retrotax.co/api/v1/api_employees/list?apikey='+$scope.currentuser().api_key+'&u='+$scope.currentuser().username +addURL)
			.success(function (data) {
				if (angular.isArray(data.rows)) {
					$scope.tcid.employees=data.rows;
					console.log('employees loadded from ajax!');
					localStorage.setItem("employees", JSON.stringify($scope.tcid.employees));
					return true;

				} else {
					console.log('dailed to get fata::::::::::: ',data);
					$scope.alerts.push({type:'danger',msg: 'nodata: '+data.message});
					return false;
				}
			})
			.error(function (data, status, headers, config) {
				console.log('http et eerror is', data);
				return false;
			});
		} else {
			console.log('not refreshing employees list',$scope.tcid.employees);}
	};

	 $scope.getCounties=function(st){
	 	if (st == undefined) {return false;}
	 	if (st.length==0) {return false;}
	 	if ($scope.tcid.gettingcounties[st]) {return false;}
		$scope.tcid.gettingcounties[st]=true;

		if ($scope.tcid.counties[st] == undefined) {
			console.log(st,'*** hopefully only once*****   counties for this state yet, so load it up!!!',st);

			$http.get('http://tcid.retrotax.co/counties/getbystate?stateid='+st)
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
/*
    console.log(angular.element(document.querySelector('#plugin_type')).val());
	console.log(angular.element('plugin_type'));
	$scope.plugin_type=angular.element(document.querySelector('#plugin_type')).val();
	console.log($scope.plugin_type);
*/

    addEventListener('load', loadedPlugin, false);
    function loadedPlugin() {
    	$scope.$apply(function () {
            $scope.plugin_type = document.getElementById("plugin_type").value;
            $scope.firstname = document.getElementById("firstname").value;
            $scope.lastname = document.getElementById("lastname").value;
            if($scope.plugin_type=='ats'){
            	$scope.isATS=true;
            }else{
            	$scope.isATS=false;
            } 
            //$scope.authorizationReq = ($scope.tcid.employee.maindata.rehire==0 && $scope.isATS==false);
            //console.log("AUTH REQ");
            //console.log($scope.authorizationReq);
        });
        //$scope.plugin_type = document.getElementById("plugin_type").value;
        console.log($scope.plugin_type);
        console.log($scope.firstname);
        //$scope.plugin_type=angular.element(document.querySelector('#plugin_type')).val();
    }
});

