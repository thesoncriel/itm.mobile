// Evaluation Detail
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorEvaluationDetailController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_evaluationDetail",
			objForm;
				
		$scope.ev = {};
		$scope.param = {
			classid: $stateParams.classid,
			memberseq: $stateParams.memberseq,
			year: $stateParams.year,
			month: $stateParams.month
		};
		
		$scope.selectorOptions = {
			type: "month",
		    defaultDate: util.dateFormat(new Date($scope.param.year, parseInt($scope.param.month) - 1, 1)),
		    minDate: new Date("2000-01-01"),
		    maxDate: new Date("2100-01-01"),
		    dayNamesLength: 3, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
		    click: function(data, b){
		    	$scope.param.year = data.year;
		    	$scope.param.month = data.month;
		    	
		    	objForm.submit();
		    },
		    
		    prev: {
		    	year: $scope.param.year,
		    	month: $scope.param.month
		    },
		    next: {
		    	year: $scope.param.year,
		    	month: $scope.param.month
		    }
		};
		
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.ev = mData.ev;
				$scope.selectorOptions.prev.year = mData.ev.preYear;
				$scope.selectorOptions.prev.month = mData.ev.preMonth;
				$scope.selectorOptions.next.year = mData.ev.nextYear;
				$scope.selectorOptions.next.month = mData.ev.nextMonth;
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



// Evaluation Write
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorEvaluationWriteController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_evaluationWrite",
			objForm;
				
		$scope.param = {};
		$scope.paramCommon = {
			tutorseq: $rootScope.member.tutorseq,
			classid: $stateParams.classid,
			memberseq: $stateParams.memberseq,
			year: $stateParams.year,
			month: $stateParams.month,
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
		
			if (mResult.valid){
				$location.path( 
					"/tutor/evview/" + $scope.paramCommon.classid + 
					"/" + $scope.paramCommon.memberseq +
					"/" + $scope.paramCommon.year +
					"/" + $scope.paramCommon.month 
				);
			}
		});
		// 실패 했을 때
		$scope.$on( sFormName + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sFormName + ".invalid", function($event, $data){
			var mErr = $data.ngForm.$error,
				aErr,
				msg;
			
			for(var ename in mErr){
				aErr = mErr[ ename ];
				
				if (ename === "minlength"){
					msg = "'" + aErr[ 0 ].$name + "' " + $scope.textareaReqMsg;
				}
				else{
					msg = "'" + aErr[ 0 ].$name + "' " + $scope.selectReqMsg;
				}
				
				break;
			}
			
			alert( msg );
		});
		$scope.$on( sFormName + ".ready", function($event, $data){
			objForm = $data.form;
		});
		
		$scope.$watch("$parent.ev", function(data){
			$scope.param = util.convertToStringValues( data );
			//console.log(data);
		});
	}]);
	
	return app;
})(angular, appBase);





// Evaluation View
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorEvaluationViewController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_evaluationView",
			objForm;
				
		$scope.ev = {};
		$scope.param = {
			classid: $stateParams.classid,
			memberseq: $stateParams.memberseq,
			year: $stateParams.year,
			month: $stateParams.month
		};
		
		$scope.color = $rootScope.color;
		$scope.colorL1 = util.colorLuminance( $scope.color, 0.1 );
		$scope.colorL2 = util.colorLuminance( $scope.color, 0.2 );
		$scope.colorD1 = util.colorLuminance( $scope.color, -0.1 );
		$scope.colorD2 = util.colorLuminance( $scope.color, -0.2 );
		$scope.colorD3 = util.colorLuminance( $scope.color, -0.3 );
		
		$scope.selectorOptions = {
			type: "month",
		    defaultDate: util.dateFormat(new Date($scope.param.year, parseInt($scope.param.month) - 1, 1)),
		    minDate: new Date("2000-01-01"),
		    maxDate: new Date("2100-01-01"),
		    dayNamesLength: 3, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
		    click: function(data, b){
		    	$scope.param.year = data.year;
		    	$scope.param.month = data.month;
		    	
		    	objForm.submit();
		    },
		    prev: {
		    	year: $scope.param.year,
		    	month: $scope.param.month
		    },
		    next: {
		    	year: $scope.param.year,
		    	month: $scope.param.month
		    }
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.ev = mData.ev;
				$scope.selectorOptions.prev.year = mData.ev.preYear;
				$scope.selectorOptions.prev.month = mData.ev.preMonth;
				$scope.selectorOptions.next.year = mData.ev.nextYear;
				$scope.selectorOptions.next.month = mData.ev.nextMonth;
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




// Evaluation Write Complete
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorEvaluationWriteCompleteController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_evaluationWriteComplete",
			objForm;
				
		$scope.param = {
			regid: "",
			tutorseq: $rootScope.member.tutorseq,
			classid: $stateParams.classid,
			memberseq: $stateParams.memberseq,
			year: $stateParams.year,
			month: $stateParams.month
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
		
			if (mResult.valid){
				try{
					$scope.$parent.ev.status = mData.data;
				}
				catch(e){
					alert("Error Found.\r\n" + e);
				}
			}
		});
		// 실패 했을 때
		$scope.$on( sFormName + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sFormName + ".invalid", function($event, $data){
			
		});
		$scope.$on( sFormName + ".ready", function($event, $data){
			objForm = $data.form;
		});
		
		$scope.$on("$parent.ev", function(data){
			$scope.param.regid = data.regid;
		});
	}]);
	
	return app;
})(angular, appBase);