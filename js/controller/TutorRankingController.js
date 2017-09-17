// Tutor Ranking
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorRankingController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_tutorRanking",
			objForm;
				
		$scope.schedule = [];
		$scope.param = {
			tutorseq: $rootScope.member.tutorseq,
			count: 10,
			page: 1
		};
		
		$scope.ranking = {};
		$scope.eol = false;
		
		$scope.onMoreClick = function(a,b,c){
			if ($scope.eol === true){
				return;
			}
			
			console.log(this, a,b,c);
			
			$scope.param.page++;
			objForm.submit();
			
			return false;
		};

		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				if ($scope.ranking.list !== undefined){
					for(var i = 0, iLen = mData.ranking.list.length; i < iLen; i++){
						$scope.ranking.list.push( mData.ranking.list[i] );
					}
					//$scope.ranking.list.concat( mData.ranking.list );
				}
				else{
					$scope.ranking = mData.ranking;
				}
				
				try{
					if ($scope.ranking.list.length >= mData.ranking.totalcount){
						$scope.eol = true;
					}
				}
				catch(e){}
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