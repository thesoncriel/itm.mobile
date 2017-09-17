// Tutor Monthly Payment
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorPaymentController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_tutorPayment",
			objForm,
			dateToday = new Date($rootScope.today);
				
		$scope.schedule = [];
		$scope.param = {
			tutorseq: $rootScope.member.tutorseq,
			year: dateToday.getFullYear(),
			month: dateToday.getMonth() + 1
		};
		
		$scope.noFmt = util.noFmt;
		$scope.dtFmt = util.dtFmt;
		$scope.cdaysFmt = util.cdaysFmt;
		$scope.cdaysCount = util.cdaysCount;
		
		$scope.selectorOptions = {
			type: "month",
		    defaultDate: $rootScope.today,
		    minDate: new Date("2000-01-01"),
		    maxDate: new Date("2100-01-01"),
		    rememberSelectedDate: true,
		    click: function(data, b){
		    	$scope.param.year = data.year;
		    	$scope.param.month = data.month;
		    	
		    	objForm.submit();
		    }
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.payment = mData.payment;
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


// Tutor Statement of Payment
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorStatePaymentController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_tutorPayment",
			objForm,
			dateToday = new Date($rootScope.today),
			sToday = $rootScope.today;
				
		$scope.schedule = [];
		
		if (dateToday.getDate() < 11){
			dateToday = new Date( dateToday.getFullYear(), dateToday.getMonth() - 1, 1 );
			sToday = util.dateFormat( dateToday );
		}
		
		$scope.param = {
			tutorseq: $rootScope.member.tutorseq,
			year: dateToday.getFullYear(),
			month: dateToday.getMonth() + 1
		};
		
		$scope.noFmt = util.noFmt;
		$scope.dtFmt = util.dtFmt;
		$scope.cdaysFmt = util.cdaysFmt;
		$scope.cdaysCount = util.cdaysCount;
		
		$scope.selectorOptions = {
			type: "month",
		    defaultDate: sToday,
		    minDate: new Date("2000-01-01"),
		    maxDate: new Date("2100-01-01"),
		    rememberSelectedDate: true,
		    click: function(data, b){
		    	$scope.param.year = data.year;
		    	$scope.param.month = data.month;
		    	
		    	objForm.submit();
		    }
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.payment = mData.payment;
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