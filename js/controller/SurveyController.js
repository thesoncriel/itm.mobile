// Survey - for user
(function(angular, appBase){
	"use strict";
	
	var app = appBase;
	
	app.controller("SurveyForUserController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$timeout", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $$timeout, util){
		
		var iCount = 0,
			index = 0;
		
		$scope.param = {
			classid: $stateParams.classid
		};

		$scope.survey = {};
		$scope.surveyParam = {
			sc_no: $stateParams.sc_no,
			ms_no: "",
			email: $rootScope.member.email,
			classid: $stateParams.classid
		};
		
		$scope.next = function(){
			return ++iCount;
		};
		$scope.end = function(){
			iCount = 0;
			
			return "";
		};
		
		$scope.index = function(){
			return index++;
		};
		$scope.finish = function(){
			index = 0;
			
			return "";
		}
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_surveyDetail", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.survey = mData.survey;
				$scope.surveyParam.sc_no = mData.survey.detail.sc_no;
				$scope.surveyParam.ms_no = mData.survey.detail.ms_no;
				
				return;
			}
			if (mResult.auth === false){
				alert( mResult.msg );
				$location.path( "/user/main" );
			}
		});
		// 실패 했을 때
		$scope.$on("form_surveyDetail.fail", function($event, $data){
			alert( $scope.failMsg + "\r\n" + $data.response );
		});
		// 유효성 실패 했을 때
		$scope.$on("form_surveyDetail.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_surveyDetail.ready", function($event, $data){
			$scope.form = $data.form;
		});
		
		
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_surveySubmit", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;

			if (mResult.valid){
				$location.path( "/user/main" );
			}
		});
		// 실패 했을 때
		$scope.$on("form_surveySubmit.fail", function($event, $data){
			alert( $scope.failMsg + "\r\n" + $data.response );
		});
		// 유효성 실패 했을 때
		$scope.$on("form_surveySubmit.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_surveySubmit.ready", function($event, $data){
			//$scope.form = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);