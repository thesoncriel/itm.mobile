// ClassComm (Not Use... Why Not? 아직 필요 없습니다 ^^;)
/* - Class Community 상단의 Class Info 부분이 
 * ClassDetailController 와 업무 성향이 완전히 동일하기에
 * 특별히 달라지지 않는 한 같은 Controller를 사용함.
 * (혹시 달라지면 아래의 컨트롤을 수정하여 활용 할 것)
 */
(function(angular, appBase){
	"use strict";
	
	var app = appBase;
	
	app.controller("ClassCommController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		$scope.param = {
			regid: $stateParams.regid
		};
		
		$scope.classInfo = {};
		$scope.sub = $stateParams.sub;
		
		$scope.noFmt = util.noFmt;
		$scope.dtFmt = util.dtFmt;
		$scope.cdaysFmt = util.cdaysFmt;
		$scope.cdaysCount = util.cdaysCount;
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classComm", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;

			if (mResult.valid){
				$scope.classInfo = mData.classInfo;
			}
		});
		// 실패 했을 때
		$scope.$on("form_classComm.fail", function($event, $data){

		});
		// 유효성 실패 했을 때
		$scope.$on("form_classComm.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classComm.ready", function($event, $data){
			//$data.form.submit();
		});
		
	}]);
	
	return app;
})(angular, appBase);


// ClassComm - list
(function(angular, appBase){
	"use strict";
	
	var app = appBase;
	
	app.controller("ClassCommListController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$timeout", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $timeout, util){
		
		$scope.param = {
			regid: $stateParams.regid,
			page: 1,
			count: 10
		};

		$scope.classComm = {};
		$scope.isClassCommList = true;

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
				iTotalCount = $scope.classComm.totalcount || 0;
			
			if (( iPage * iCount ) < iTotalCount ){
				$scope.param.page++;
				$scope.nowLoading = true;
				$scope.form.submit();
			}
			
			//$scope.nowLazy = false;
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classCommList", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;

			if (mResult.valid){
				if ($scope.classComm.list && $scope.classComm.list.length > 0){
					for(var i = 0, iLen = mData.classComm.list.length; i < iLen; i++){
						$scope.classComm.list.push( mData.classComm.list[ i ] );
					}
				}
				else{
					$scope.classComm = mData.classComm;
				}
				
				$scope.nowLoading = false;
				$scope.nowLazy = false;
			}
		});
		// 실패 했을 때
		$scope.$on("form_classCommList.fail", function($event, $data){
			$scope.nowLoading = false;
			$scope.nowLazy = false;
		});
		// 유효성 실패 했을 때
		$scope.$on("form_classCommList.invalid", function($event, $data){
			alert( $scope.invalidMsg );
			$scope.nowLoading = false;
			$scope.nowLazy = false;
		});
		$scope.$on("form_classCommList.ready", function($event, $data){
			$scope.form = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);




// ClassComm - detail
(function(angular, appBase){
	"use strict";
	
	var app = appBase;
	
	app.controller("ClassCommDetailController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$timeout", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $$timeout, util){
		
		$scope.param = {
			classid: $stateParams.regid,
			regid: $stateParams.boardid
		};

		$scope.detail = {};
		$scope.commentList = [];
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classCommDetail", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result,
				aList, sTmp;

			if (mResult.valid){
				$scope.detail = mData.detail;
				aList = mData.commentList;
				
				// 한글로 된 오전, 오후를 대체 한다.
				for(var i = 0, iLen = aList.length; i < iLen; i++){
					sTmp = aList[ i ].createdate;
					sTmp = sTmp.replace("오전", "AM");
					sTmp = sTmp.replace("오후", "PM");
					aList[ i ].createdate = sTmp;
				}
				
				$scope.commentList = aList;
			}
		});
		// 실패 했을 때
		$scope.$on("form_classCommDetail.fail", function($event, $data){

		});
		// 유효성 실패 했을 때
		$scope.$on("form_classCommDetail.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classCommDetail.ready", function($event, $data){
			$scope.form = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);




// ClassComm - modify
(function(angular, appBase){
	"use strict";
	
	var app = appBase;
	
	app.controller("ClassCommModifyController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$timeout", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $$timeout, util){
		
		var sMode = "modify";
		
		$scope.param = {
			classid: $stateParams.regid,
			regid: $stateParams.boardid || -1,
			bcode: $stateParams.bcode,
			
			writer: $rootScope.member.memberseq,
			gubun: $rootScope.member.gubun,
			email: $rootScope.member.email,
			korname: $rootScope.member.kname,
			engname: $rootScope.member.ename,
			
			contents: ""
		};
		
		setTimeout(function(){
			try{
				$scope.param.contents = $scope.$parent.detail.contents;
				
				if ((sMode === "modify") && 
					($scope.param.email !== $scope.$parent.detail.email)){
					alert($scope.classCommModifyAuthMsg);
					history.back();
				}
			}
			catch(e){
				sMode = "write";
			}
		}, 300);

		$scope.detail = {};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classCommModify", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;

			if (mResult.valid){
				if (sMode === "modify"){
					$location.path( "/" + $scope.type + "/classcomm/" + $scope.param.classid + "/detail/" + $scope.param.regid );
				}
				else{
					$location.path( "/" + $scope.type + "/classcomm/" + $scope.param.classid + "/list" );
				}
			}
		});
		// 실패 했을 때
		$scope.$on("form_classCommModify.fail", function($event, $data){

		});
		// 유효성 실패 했을 때
		$scope.$on("form_classCommModify.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classCommModify.ready", function($event, $data){
			$scope.form = $data.form;
		});
		
		$rootScope.$on("uploadfile", function($event, $data){
			var sCont = $scope.param.contents;
			//console.log("file_picture_ccmod", $event, $data);
			$scope.param.contents = sCont + '<img src="' + $data + '" class="img-by-wysiwyg upload-by-mobile"/><br/>';
			
			$rootScope.$broadcast("contenteditable.refresh");
			//console.log("bbbb uploadFile:::", $data);
			//$scope.$broadcast( "contenteditable.refresh" );
		});
	}]);
	
	return app;
})(angular, appBase);



// ClassComm - delete
(function(angular, appBase){
	"use strict";
	
	var app = appBase;
	
	app.controller("ClassCommDeleteController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$timeout", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $$timeout, util){
			
		var sMode = "byDetail";
		
		$scope.param = {
			classid: $stateParams.regid,
			regid: $stateParams.boardid
		};

		$scope.classComm = {};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classCommDelete", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
					
			if (mResult.valid){
				if ($scope.$parent.isClassCommList){
					util.removeArrayItem( $scope.$parent.classComm.list, $scope.citem );
				}
				else{
					$location.path("/" + $scope.type + "/classcomm/" + $scope.param.classid + "/list");
				}
			}
		});
		// 실패 했을 때
		$scope.$on("form_classCommDelete.fail", function($event, $data){
			alert( $scope.failMsg + "\r\n" + $data.response );
		});
		// 유효성 실패 했을 때
		$scope.$on("form_classCommDelete.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classCommDelete.ready", function($event, $data){
			$scope.form = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);

