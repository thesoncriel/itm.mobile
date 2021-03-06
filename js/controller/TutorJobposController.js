// Tutor Job Position
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorJobposController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$timeout", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $timeout, $stateParams, util){
		
		var sFormName = "form_tutorJobpos",
			objForm;
				
		$scope.list = [];
		$scope.param = {
			tutorseq: $rootScope.member.tutorseq,
			count: 10,
			page: 1
		};
		
		$scope.noFmt = util.noFmt;
		$scope.dtFmt = util.dtFmt;
		$scope.cdaysFmt = util.cdaysFmt;
		$scope.cdaysCount = util.cdaysCount;
		
		// 무한스크롤 처리 이벤트 부분
		$scope.loadMore = function(){
			if ($scope.nowLoading && $scope.nowLazy === true){
				return;
			}
			if ($scope.form === undefined || $scope.nowLoading){
				$scope.nowLazy = true;
				$timeout($scope.loadMoreDoIt, 500);
				
				return;
			}
			
			$scope.loadMoreDoIt();
		};
		
		$scope.loadMoreDoIt = function(){
			var iPage = $scope.param.page,
				iCount = $scope.param.count,
				iTotalCount = $scope.totalcount || 0;
			
			if (( iPage * iCount ) < iTotalCount ){
				$scope.param.page++;
				$scope.nowLoading = true;
				$scope.form.submit();
			}
			
			//$scope.nowLazy = false;
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				if ($scope.list && $scope.list.length > 0){
					for(var i = 0, iLen = mData.list.length; i < iLen; i++){
						$scope.list.push( mData.list[ i ] );
					}
				}
				else{
					$scope.list = mData.list;
					$scope.totalcount = mData.totalcount;
				}
			}
			
			$scope.nowLoading = false;
			$scope.nowLazy = false;
		});
		// 실패 했을 때
		$scope.$on( sFormName + ".fail", function($event, $data){
			$scope.nowLoading = false;
			$scope.nowLazy = false;
		});
		// 유효성 실패 했을 때
		$scope.$on( sFormName + ".invalid", function($event, $data){
			$scope.nowLoading = false;
			$scope.nowLazy = false;
		});
		$scope.$on( sFormName + ".ready", function($event, $data){
			$scope.form = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);



// Tutor Job Position Detail
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorJobposDetailController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_tutorJobposDetail",
			objForm;
				
		$scope.info = {};
		$scope.param = {
			regid: $stateParams.regid
		};
		
		$scope.noFmt = util.noFmt;
		$scope.dtFmt = util.dtFmt;
		$scope.cdaysFmt = util.cdaysFmt;
		$scope.cdaysCount = util.cdaysCount;
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.info = mData.info;
			}
		});
		// 실패 했을 때
		$scope.$on( sFormName + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sFormName + ".invalid", function($event, $data){
			//alert( $scope.invalidMsg );
		});
		$scope.$on( sFormName + ".ready", function($event, $data){
			objForm = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);





// Tutor Job Position Apply
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorJobposApplyController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_tutorJobposApply",
			objForm;
				
		$scope.info = {};
		$scope.param = {
			regid: $stateParams.regid
		};
		
		$scope.noFmt = util.noFmt;
		$scope.dtFmt = util.dtFmt;
		$scope.cdaysFmt = util.cdaysFmt;
		$scope.cdaysCount = util.cdaysCount;
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.info = mData.info;
			}
		});
		// 실패 했을 때
		$scope.$on( sFormName + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sFormName + ".invalid", function($event, $data){
			//alert( $scope.invalidMsg );
		});
		$scope.$on( sFormName + ".ready", function($event, $data){
			objForm = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);