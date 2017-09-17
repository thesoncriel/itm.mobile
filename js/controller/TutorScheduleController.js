// Tutor Schedule
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorScheduleController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_tutorSchedule",
			objForm,
			dateToday = new Date($rootScope.today);
				
		$scope.schedule = [];
		$scope.param = {
			tutorseq: $rootScope.member.tutorseq,
			year: dateToday.getFullYear(),
			month: dateToday.getMonth() + 1
		};
		
		$scope.selectedDate = {};
		
		$scope.calendarOptions = {
		    defaultDate: $rootScope.today,
		    minDate: new Date("2000-01-01"),
		    maxDate: new Date("2100-01-01"),
		    dayNamesLength: 3, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
		    rememberSelectedDate: true,
		    monthClick: function(data, b){
		    	$scope.param.year = data.year;
		    	$scope.param.month = data.month;
		    	
		    	objForm.submit();
		    },
		    eventClick: function(data, b){
		    	$scope.selectedDate = angular.copy(data);
		    },
		    dateClick: function(data, b){
		    	$scope.selectedDate = angular.copy(data);
		    	$scope.selectedDate.hasNoEvent = true;
		    }
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.schedule = mData.schedule;
			}
			
			if ($scope.selectedDate.month === undefined){
				$scope.selectedDate = {
					year: dateToday.getFullYear(),
					month: dateToday.getMonth(),
					day: dateToday.getDate()
				};
			}
		});
		// 실패 했을 때
		$scope.$on( sFormName + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sFormName + ".invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on( sFormName + ".ready", function($event, $data){
			objForm = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);



// Tutor Schedule List By Date
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorScheduleListByDateController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_tutorScheduleListByDate",
			objForm,
			dateToday = new Date($rootScope.today);
				
		$scope.list = [];
		$scope.param = {
			tutorseq: $rootScope.member.tutorseq,
			date: $rootScope.today
		};
		
		$scope.date = {};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.list = mData.list;
			}
		});
		// 실패 했을 때
		$scope.$on( sFormName + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sFormName + ".invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on( sFormName + ".ready", function($event, $data){
			objForm = $data.form;
		});
		
		$scope.$watch( "$parent.selectedDate", function(data){
			var dateTmp;
			
			if (util.equals( $scope.date, data, ["year", "month", "day"] ) === true){
				return;
			}
			
			dateTmp = new Date(data.year, data.month, data.day);
			$scope.date = angular.copy( data );
			$scope.date.month++;
			$scope.date.monthEng = util.convertToMonthName( $scope.date.month );
			$scope.param.date = util.dateFormat( dateTmp );
			//console.log( $scope.param.date );
			
			if (objForm === undefined){
				setTimeout(function(){
					objForm.submit();
				}, 1000);
			}
			else{
				objForm.submit();
			}
		} );
	}]);
	
	return app;
})(angular, appBase);



// Tutor Schedule Write
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorScheduleWriteController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_tutorScheduleWrite",
			objForm,
			dateToday = new Date($rootScope.today),
			fnOnTimeChange_stime,
			fnOnTimeChange_etime;
				
		$scope.list = [];
		$scope.param = {
			tutorseq: $rootScope.member.tutorseq,
			classid: 0,//$stateParams.classid,
			sdate: new Date($rootScope.today),
			edate: new Date($rootScope.today),
			stime: new Date(1970,1,1,0,0),
			etime: new Date(1970,1,1,0,0),
			cdaysmo: false,
			cdaystu: false,		
			cdayswe: false,		
			cdaysth: false,		
			cdaysfr: false,		
			cdayssa: false,		
			cdayssu: false,
			memo: ""		
			/*
			stime_hour: "00",
			stime_min: "00",
			etime_hour: "00",
			etime_min: "00"
			*/
		};
		
		$scope.date = {};
		
		$scope.repeatValues = util.repeatValues;
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$location.path( "/tutor/schedule" );
				//$scope.list = mData.list;
			}
		});
		// 실패 했을 때
		$scope.$on( sFormName + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sFormName + ".invalid", function($event, $data){
			console.log($event, $data);
			alert( $scope.invalidMsg );
		});
		$scope.$on( sFormName + ".ready", function($event, $data){
			objForm = $data.form;
		});
		// 수행전
		$scope.$on( sFormName + ".before", function($event, $data){
			var aTmp;
			
			aTmp = $data.params.stime.split(":");
			$data.params.stime = aTmp[0] + ":" + aTmp[1];
			aTmp = $data.params.etime.split(":");
			$data.params.etime = aTmp[0] + ":" + aTmp[1];
		});
	}]);
	
	return app;
})(angular, appBase);