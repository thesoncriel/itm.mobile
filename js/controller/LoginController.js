// Login
(function(angular, appBase){
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("LoginController", 
		["$scope", "$rootScope", "$location", "$state", "const", function($scope, $rootScope, $location, $state, Const){
		$scope.uid = "";
		$scope.upass = "";
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_login", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result,
				sData;
			
			if (mResult.valid && mData.member){
				//$state.go("user.main");
				
				$rootScope.member = mData.member;
				$rootScope.today = mData.today;
				$rootScope.theme = mData.member.theme;
				$rootScope.setColor( $rootScope.theme );
				
				switch(mData.member.gubun){
					case "MEMBER":
						$rootScope.type = "user";
						break;
					case "TUTOR":
						$rootScope.type = "tutor";
						break;
					default:
						alert( $rootScope.loc("access.denied") );
						return;
				}
				
				sData = angular.toJson(mData.member);
				
				//console.log(mData.member, sData);
				
				try{
					// 사파리가 private mode 대응. 이 때는 local Storage 사용 불가.
					sessionStorage.setItem( Const.smk, sData );
					sessionStorage.setItem( Const.tdy, mData.today );
				}
				catch(e){
					
				}
				
				alert( mResult.msg );
				
				$location.path( mResult.redirect );
				/*
				if (mData.member.gubun === "TUTOR"){
					$location.path("/tutor/main");
				}
				else if (mData.member.gubun === "MEMBER"){
					$location.path("/user/main");
				}*/
			}
			
		});
		// 실패 했을 때
		$scope.$on("form_login.fail", function($event, $data){
			alert("Login Fail.\r\n" + $data.response);
		});
		// 유효성 실패 했을 때
		$scope.$on("form_login.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
	}]);
	
	return app;
})(angular, appBase);



// Logout
(function(angular, appBase){
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("LogoutController", 
		["$scope", "$rootScope", "$location", "$state", "const", function($scope, $rootScope, $location, $state, Const){
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_logout", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;

			if (mResult.valid){
				//$state.go("user.main");
				$rootScope.member = undefined;
				$rootScope.today = undefined;
				$rootScope.type = undefined;
				sessionStorage.clear();
				
				alert(mResult.msg);
				
				$location.path("/login");
			}
		});
		// 실패 했을 때
		$scope.$on("form_logout.fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on("form_logout.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
	}]);
	
	return app;
})(angular, appBase);




// 멤버 정보 수정
(function(angular, appBase){
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("MemberModifyController", 
		["$scope", "$rootScope", "$location", "$state", "const", function($scope, $rootScope, $location, $state, Const){
		
		var sForm = "form_memberModify";
		
		$scope.member = $rootScope.member;
		
		$scope.param = {
			uid: $scope.member.memberid,
			upass: "",
			upassnew: "",
			upassnewre: ""
		};
		
		
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sForm, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid && mResult.auth){
				
				if ($scope.member.gubun === "TUTOR"){
					$location.path("/tutor/main");
				}
				else if ($scope.member.gubun === "MEMBER"){
					$location.path("/user/main");
				}
			}
		});
		// 수행 전
		$scope.$on( sForm + ".before", function($event, $data){
			if ($scope.param.upassnew !== $scope.param.upassnewre){
				alert( $scope.passNotEqualMsg );
				$data.params.prevent = true; // 파라메터에 prevent=true 로 주면 submit을 중단 한다.
			}
		});
		// 실패 했을 때
		$scope.$on( sForm + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sForm + ".invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
	}]);
	
	return app;
})(angular, appBase);



// 멤버 이미지(사진) 정보 수정
(function(angular, appBase){
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("MemberModifyImgfileController", 
		["$scope", "$rootScope", "$location", "$state", "$timeout", "const", function($scope, $rootScope, $location, $state, $timeout, Const){
		
		var sForm = "form_memberModifyImgfile";
		
		$scope.member = $rootScope.member;
		
		$scope.param = {
			memberseq: $scope.member.memberseq,
			imgfile: ""
		};
		
		
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sForm, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid && mResult.auth){
				$rootScope.member.imgfile = $scope.param.imgfile;
				// local Storage 못쓸 경우에 대한 예외 처리
				try{
					sessionStorage.setItem( Const.smk, angular.toJson( $rootScope.member ) );
				}
				catch(e){}
			}
			
			$scope.param.imgfile = "";
		});
		// 수행 전
		$scope.$on( sForm + ".before", function($event, $data){
			if ($scope.param.imgfile === ""){
				$scope.onAjaxUpload("frame_ajaxupload_photo", {memberseq: $rootScope.member.memberseq});
				$data.params.prevent = true; // 파라메터에 prevent=true 로 주면 submit을 중단 한다.
			}
			
			$scope.param.imgfile = "";
		});
		// 실패 했을 때
		$scope.$on( sForm + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sForm + ".invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		
		$scope.$on( sForm + ".ready", function($event, $data){
			$scope.form = $data.form;
		});
		
		$rootScope.$on("uploadfile", function($event, $data){
			$timeout(function(){
				$rootScope.member.imgfile = $data;
				
				try{
					// 로컬 세션 세팅
					sessionStorage.setItem( Const.smk, angular.toJson( $rootScope.member ) );
				}
				catch(e){}
			}, 100);
			
			//$scope.form.submit();
		});
	}]);
	
	return app;
})(angular, appBase);



// 아이디 혹은 비밀번호 찾기
(function(angular, appBase){
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("MemberInfoSearchController", 
		["$scope", "$rootScope", "$location", "$state", "const", function($scope, $rootScope, $location, $state, Const){
		
		var sForm = "form_memberInfoSearch";
		
		$scope.member = $rootScope.member;
		
		$scope.param = {
			uid: "",
			upass: "",
			uname: "",
			uphone: "",
			uemail: ""
		};
		
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sForm, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid && mResult.auth){
				for(var key in $scope.param){
					$scope.param[key] = "";
				}
			}
		});
		// 수행 전
		$scope.$on( sForm + ".before", function($event, $data){
			// $data.params.prevent = true; // submit을 취소 시키고 싶을 때 사용.
		});
		// 실패 했을 때
		$scope.$on( sForm + ".fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on( sForm + ".invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
	}]);
	
	return app;
})(angular, appBase);