// ClassComm - comment write
(function(angular, appBase){
	"use strict";
	
	var app = appBase;
	
	app.controller("ClassCommCommentWriteController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$timeout", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $$timeout, util){
		
		$scope.initParam = function($scope, $rootScope){
			var sToday = $rootScope.today,
				dateNow = new Date();
				
			
			$scope.param = {
				classid: $stateParams.regid,
				boardid: $stateParams.boardid,
				writer: $rootScope.member.memberseq,
				createdate: sToday + " " + dateNow.getHours() + ":" + dateNow.getMinutes(),
				//memberseq: $rootScope.member.memberseq,
				gubun: $rootScope.member.gubun,
				email: $rootScope.member.email,
				contents: "",
				
				writer_ename: $rootScope.member.ename,
				writer_kname: $rootScope.member.kname,
				writer_imgfile: $rootScope.member.imgfile,
				writer_email: $rootScope.member.email
			};
		};
		
		$scope.initParam( $scope, $rootScope );
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classCommCommentWrite", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result,
				mComment;

			if (mResult.valid){
				mComment = angular.copy( $scope.param );
				mComment.regid = mData.lastInsertId;
				
				if ($scope.$parent.commentList === undefined){
					$scope.$parent.commentList = [];
				}
				
				$scope.$parent.commentList.unshift( mComment );
				$scope.initParam( $scope, $rootScope );
			}
		});
		// 실패 했을 때
		$scope.$on("form_classCommCommentWrite.fail", function($event, $data){

		});
		// 유효성 실패 했을 때
		$scope.$on("form_classCommCommentWrite.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classCommCommentWrite.ready", function($event, $data){
			$scope.form = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);




// ClassComm - comment delete
(function(angular, appBase){
	"use strict";
	
	var app = appBase;
	
	app.controller("ClassCommCommentDeleteController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$timeout", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $$timeout, util){
		
		$scope.param = {
			classid: $stateParams.regid,
			boardid: $stateParams.boardid,
			regid: ""
		};

		$scope.classComm = {};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classCommCommentDelete", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;

			if (mResult.valid){
				util.removeArrayItem( $scope.$parent.commentList, $scope.item );
			}
		});
		// 실패 했을 때
		$scope.$on("form_classCommCommentDelete.fail", function($event, $data){
			alert( $scope.failMsg + "\r\n" + $data.response );
		});
		// 유효성 실패 했을 때
		$scope.$on("form_classCommCommentDelete.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classCommCommentDelete.ready", function($event, $data){
			$scope.form = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);