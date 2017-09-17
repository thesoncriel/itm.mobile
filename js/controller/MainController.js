(function(angular, appBase){
	var app = appBase;//angular.module("login", ["itm"]);
	
	//app = angular.module("user", ["itm"]);
	
	app.controller("ItmController", 
		["$scope", "$rootScope", "$location", "$document", "$stateParams", "$timeout", "const", "util", function($scope, $rootScope, $location, $document, $stateParams, $timeout, Const, util){
		
		var session = sessionStorage,
			sMemberInfo;
		
		$scope.isActive = function (path, path2, path3) {
			var bRet = false;
			
			try{
				for(var i = 0, iLen = arguments.length; i < iLen; i++){
					bRet = bRet || ($location.path().indexOf( arguments[ i ] ) > -1);
				}
				
				return bRet;
			}
			catch(e){
				return false;
			}
		};
		// 모바일 화면 때 네비게이션 열기 기능 [begin]
		$scope.getContainer = function(){
			return angular.element( document.getElementById("uiView_main") ).parent();
		};
		$scope.getNav = function(){
			return angular.element( document.getElementById("sidenav") );
		};
		$scope.getOverlay = function(){
			return angular.element( document.getElementById("overlay_main") );
		};
		$scope.toggleSlide = function(close){
			var jqContainer = $scope.getContainer(),
				jqNav = $scope.getNav(),
				jqOverlay = $scope.getOverlay(),
				/*
				 * 원래는 안드로이드 기본 브라우저에서만 좌->우 애니메이션 시 네비게이션이 덮는걸로 하려고 했음.
				 * 그러나 기존 방식(우측 메인이 덮는 형식)은 웹브라우저 (특히 안드로이드 기본 브라우저)별로 처리를 달리 해 줘야 해서
				 * 그나마 구현하기 쉬운 네비게이션이 덮는 방식으로 통일 함.
				 */ 
				isAD = true;//util.isDefaultBrowser(),
				sAniCss = (isAD)? "slide-right" : "slide-right";
			
			
			
			if ((close === true) || jqContainer.hasClass( sAniCss ) || jqNav.hasClass( sAniCss )){
				jqOverlay.removeClass("active");
				
				if (isAD === true){
					jqNav.removeClass( sAniCss );
					
					return;
				}
				jqContainer.removeClass( sAniCss );
				jqNav.removeClass("to-front");
			}
			else{
				jqOverlay.addClass("active");
				
				if (isAD === true){
					jqNav.addClass( sAniCss );
					
					return;
				}
				
				jqContainer.addClass( sAniCss );
				setTimeout(function(){
					jqNav.addClass("to-front");
				}, 700);
			}
		};
		$scope.openNav = function(){
			$scope.toggleSlide();
		};
		$scope.closeNav = function(){
			$scope.toggleSlide(false);
		};
		$scope.onNavClick = function(){
			$scope.toggleSlide(true);
		};
		
		$scope.initNav = function(){
			var jqContainer = $scope.getContainer(),
				jqNav = $scope.getNav(),
				jqOverlay = $scope.getOverlay(),
				isAD = util.isDefaultBrowser();

			jqNav.on("touchmove", function(e){
				e.preventDefault();
			});
			jqOverlay.on("touchmove", function(e){
				e.preventDefault();
			});
			jqNav.addClass("to-front");
			jqNav.addClass("ad-fix");
		};
		// 모바일 화면 때 네비게이션 열기 기능 [end]
		
		$scope.findFileInput = function(elem){
			var jqInput = angular.element(elem),
				jqFile;
			
			angular.forEach( jqInput, function(elem, index){
				var jqElem = angular.element(elem);
				
				if (jqElem.attr("type") === "file"){
					jqFile = jqElem;
				}
			});
			
			return jqFile;
		};
		
		$scope.onAjaxUpload = function(iframeId, param){
			var elemFrame = document.getElementById( iframeId || "frame_ajaxupload" );
			var jqFrame = angular.element( elemFrame );
			var jqInput = angular.element( elemFrame.contentDocument.getElementsByTagName("input") );
			var jqFile = $scope.findFileInput(jqInput),
				isParamExist = angular.isUndefined(param) === false; 
			
			angular.forEach( jqInput, function(elem, index){
				var jqElem = angular.element(elem),
					sName;
				
				if ( isParamExist ){
					sName = jqElem.attr("name");
					
					if (param.hasOwnProperty(sName)){
						jqElem.val(param[sName]);
					}
				}
			});
			
			try{
				jqFile[0].click();
			}
			catch(e){
				
			}
			
			//jqInput.eq(0).trigger("click");
		};
		
		var InitAjaxUpload = function(iframeId){
			try{
				var elemFrame = document.getElementById( iframeId || "frame_ajaxupload" );
				var src = elemFrame.src;
				var jqFrame = angular.element( elemFrame );
				var jqForm = angular.element( elemFrame.contentDocument.getElementsByTagName("form") );
				var jqInput = angular.element( elemFrame.contentDocument.getElementsByTagName("input") );
				var action = jqForm[0].action;
				
				jqInput = $scope.findFileInput( jqInput );		
				
				jqInput.on("change", function(event){
					var jqInput = angular.element(event.target);
					var jqForm = jqInput.parent();
					
					jqForm[0].submit();
					
				});
				
				jqFrame.on("load", function(event){
					var elemFrame = event.target;
					var jqFrame = angular.element( elemFrame );
					var jqForm = angular.element( elemFrame.contentDocument.getElementsByTagName("form") );
					var jqInput = angular.element( elemFrame.contentDocument.getElementsByTagName("input") );
					var path = elemFrame.contentDocument.body.innerHTML;
					
					if (jqForm.length === 0){
						$rootScope.$broadcast("uploadfile", path);
						
						//$scope.uploadFile = path;
						
						//console.log("rootScope.uploadFile", path);
						
						elemFrame.src = src;
						
						return;
					}
					
					jqInput = $scope.findFileInput( jqInput );
					
					jqInput.on("change", function(event){
						var jqInput = angular.element(event.target);
						var jqForm = jqInput.parent();
						
						jqForm[0].submit();
					});
				
					
					//console.log("frame change: ", event);
					//console.log("changed text: ", elemFrame.contentDocument.body.innerHTML);
				});
			}
			catch(e){}
		};
		
		$scope.checkAjaxUploadInit = function(){
			if ($scope.ajaxUploadInit === false){
				setTimeout( $scope.initAjaxUpload, 1000 );
			}
		};
		
		$scope.applyType = function(gubun){
			switch(gubun){
				case "MEMBER":
					$rootScope.type = "user";
					break;
				case "TUTOR":
					$rootScope.type = "tutor";
					break;
				default:
					alert( $rootScope.loc("access.denied") );
					return false;
			}
			
			return true;
		};
		
		$scope.checkUserType = function(){
			var sType;
			
			try{
				sType = $rootScope.type;
				
				if ((sType === "user") && $scope.isActive("user")){
					return true;
				}
				
				if ((sType === "tutor") && $scope.isActive("tutor")){
					return true;
				}
				
				sType = "";
			}
			catch(e){}
			
			if (!sType){
				alert( $scope.loc("access.invalid") );
				
				try{
					delete $rootScope.member;
					sessionStorage.clear();
				}catch(e){}
				
				$location.path("/login");
			}
			
			return false;
		};
		
		$scope.ajaxUploadInit = false;
		$scope.uploadFile = "";
		
		$timeout(function(){
			$scope.ajaxUpload1 = new InitAjaxUpload();
			$scope.ajaxUpload2 = new InitAjaxUpload("frame_ajaxupload_photo");
		}, 500);
		
		//$scope.checkAjaxUploadInit( "frame_ajaxupload_photo" );
		$scope.initNav();
		
		// 로그인 여부 체크
		if ($rootScope.member){
			$scope.applyType( $rootScope.member.gubun );
			$rootScope.setColor( $rootScope.theme );
			
			$scope.checkUserType();
		}
		else if(sMemberInfo = session.getItem( Const.smk )){
			$rootScope.member = angular.fromJson( sMemberInfo );
			$rootScope.today = session.getItem( Const.tdy );
			$rootScope.theme = $rootScope.member.theme;
			$scope.applyType( $rootScope.member.gubun );
			$rootScope.setColor( $rootScope.theme );
			
			$scope.checkUserType();
		}
		else{
			// asyncform 을 통한 submit 성공 했을 때
			$scope.$on("form_memberInfo", function($event, $data){
				var mData = $data.response.data,
					mResult = mData.result;
				
				if (mResult.valid && mResult.auth && mData.member){
					$rootScope.member = mData.member;
					$rootScope.today = mData.today;
					$rootScope.theme = mData.member.theme;
					$scope.applyType( $rootScope.member.gubun );
					$rootScope.setColor( $rootScope.theme );
					try{
						sessionStorage.setItem( Const.smk, angular.toJson( mData.member ) );
						sessionStorage.setItem( Const.tdy, mData.today );
					}
					catch(e){}
					
					$scope.checkUserType();
				}
				else{
					alert( $scope.loc( "access.invalid" ) );
					$location.path("/login");
				}
			});
			$scope.$on("form_memberInfo.fail", function($event, $data){// 실패 했을 때
				
			});
			$scope.$on("form_memberInfo.invalid", function($event, $data){// 유효성 실패 했을 때
				alert( $scope.invalidMsg );
			});
			
			$scope.$on("form_memberInfo.ready", function($event, $data){
				$data.form.submit();
				//console.log($data);
				//$event.target.submit();
			});
		}
		
		$scope.$on("$destruct", function(){
			try{
				delete $scope.ajaxUpload1;
				delete $scope.ajaxUpload2;
			}
			catch(e){}
		});
		
	}]);
	
	return app;
})(angular, appBase);

(function(angular, appBase){
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("MainController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$timeout", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $timeout, util){
		
		$scope.param = {
			count: 10,
			page: 1,
			quit: ""
		};
		
		$scope.no_todayeng = "";
		//$scope.gubun = $rootScope.member.gubun;
		$scope.pcinfo = {
			imgfile: "",
			kname: "",
			ename: "",
			current_classes: 0,
			total_class_completion: 0
		};
		$scope.clist = [];
		$scope.classInfo = {};
		
		$scope.noFmt = util.noFmt;
		$scope.dtFmt = util.dtFmt;
		$scope.cdaysFmt = util.cdaysFmt;
		$scope.cdaysCount = util.cdaysCount;
		$scope.isActive = function (path) {
			try{
				return $location.path().indexOf(path) > -1;
			}
			catch(e){
				return false;
			}
		};
		
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
				iTotalCount = $scope.classInfo.totalcount || 0;
			
			if ($scope.param.quit === ""){
				return;
			}
			
			if (( iPage * iCount ) < iTotalCount ){
				$scope.param.page++;
				$scope.nowLoading = true;
				$scope.form.submit();
			}
			
			//$scope.nowLazy = false;
		};
				
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_main", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			//mData.classInfo = false;
			
			if (mResult.valid){
				if (mData.classInfo){
					if ($scope.clist && $scope.clist.length > 0){
						for(var i = 0, iLen = mData.classInfo.list.length; i < iLen; i++){
							$scope.clist.push( mData.classInfo.list[ i ] );
						}
					}
					else{
						$scope.classInfo = mData.classInfo;
						$scope.current_classes = mData.classInfo.current_classes;
						$scope.total_class_completion = mData.classInfo.total_class_completion;
						$scope.clist = mData.classInfo.list;
					}
				}
				else{
					$scope.classInfo = {};
					$scope.current_classes = 0;
					$scope.total_class_completion = 0;
					$scope.clist = [];
				}
				
				if (mData.todayEnglish){
					$scope.todayEnglish = mData.todayEnglish;
				}
				
				$scope.nowLoading = false;
				$scope.nowLazy = false;
			}
		});
		// 실패 했을 때
		$scope.$on("form_main.fail", function($event, $data){
			$scope.nowLoading = false;
			$scope.nowLazy = false;
		});
		// 유효성 실패 했을 때
		$scope.$on("form_main.invalid", function($event, $data){
			$scope.nowLoading = false;
			$scope.nowLazy = false;
		});
		$scope.$on("form_main.ready", function($event, $data){
			$scope.form = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);




(function(angular, appBase){
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TodayEnglishController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", function($scope, $rootScope, $location, $document, $state, $stateParams){
		
		$scope.param = {
			date: $stateParams.date,
			type: $stateParams.type
		};
		
		//$scope.date = $stateParams.date;
		//$scope.type = $stateParams.type;
		//$scope.activeTab = $stateParams.type;
		$scope.todayEnglish = {
			/*seq: 0,
			title: "",
			transtitle: "",
			example: "",
			transexample: "",
			content: "",
			mp3: "",
			category_code: "",
			library_code: "",
			view_check: "",
			view_date: ""*/
		};
		/*
		$scope.tabClass0 = "";
		$scope.tabClass1 = "";
		
		if ($scope.type = "b"){
			$scope.tabClass0 = "on";
		}
		else{
			$scope.tabClass1 = "on";
		}
		*/
		
		$scope.mp3list = [];
		
		$scope.playAudio = function(){
			var elemAudio = document.getElementById("audio_todayEnglish");
			
			if (elemAudio.ended){
				elemAudio.currentTime = 0;
			}
			
			if (elemAudio.paused){
				elemAudio.play();
			}
			else{
				elemAudio.pause();
			}
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_todayEnglish", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result,
				model = $scope.todayEnglish,
				mFrom = mData.todayEnglish;
			
			if (mResult.valid && mData.todayEnglish){
				$scope.todayEnglish = mData.todayEnglish;
				$scope.mp3list[0] = mData.todayEnglish.mp3name;
				/*model.seq 			= mFrom.seq;
				model.title 		= mFrom.title;
				model.transtitle 	= mFrom.transtitle;
				model.example 		= mFrom.example;
				model.transexample 	= mFrom.transexample;
				model.content 		= mFrom.content;
				model.mp3 			= mFrom.mp3;
				model.category_code = mFrom.category_code;
				model.library_code 	= mFrom.library_code;
				model.view_check 	= mFrom.view_check;
				model.view_date 	= mFrom.view_date;
				
				model.view_date = model.view_date.replace(/\-/g, "/");*/
			}
		});
		// 실패 했을 때
		$scope.$on("form_todayEnglish.fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on("form_todayEnglish.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_todayEnglish.ready", function($event, $data){
			//$data.form.submit();
		});
	}]);
	
	return app;
})(angular, appBase);