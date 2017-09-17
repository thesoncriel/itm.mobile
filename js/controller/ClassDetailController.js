// ClassDetail
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("ClassDetailController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		$scope.param = {
			regid: $stateParams.regid
		};
		
		$scope.classInfo = {};
		$scope.tab = $stateParams.tab;
		
		$scope.noFmt = util.noFmt;
		$scope.dtFmt = util.dtFmt;
		$scope.cdaysFmt = util.cdaysFmt;
		$scope.cdaysCount = util.cdaysCount;
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classDetail", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.classInfo = mData.classInfo;
			}
		});
		// 실패 했을 때
		$scope.$on("form_classDetail.fail", function($event, $data){
			var s = "";
			
			for(var name in $data.params){
				s += name + ":" + $data.params[name] + "\r\n";
			}
			
			//console.log("form_classDetail.fail");
			//console.log($data.response);
			//console.log($data.action + ",,," + s);
			
			//alert( $data.response );
		});
		// 유효성 실패 했을 때
		$scope.$on("form_classDetail.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classDetail.ready", function($event, $data){
			//$data.form.submit();
		});
		
	}]);
	
	return app;
})(angular, appBase);


// ClassDetail - info
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("ClassDetailInfoController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		$scope.param = {
			regid: $stateParams.regid
		};
		
		$scope.$parent.$parent.tab = $stateParams.tab;
		$scope.info = {};
		$scope.intro_movie = []; // http://www.w3schools.com/jsref/movie.mp4 -- 테스트용 샘플
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classDetailInfo", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.info = mData.info;
				
				if (mData.info.intro_movie){
					$scope.intro_movie[ 0 ] = mData.info.intro_movie;
				}
				else{
					$scope.intro_movie[ 0 ] = undefined;
					$scope.intro_movie = [];
				}
			}
		});
		// 실패 했을 때
		$scope.$on("form_classDetailInfo.fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on("form_classDetailInfo.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classDetailInfo.ready", function($event, $data){
			//$data.form.submit();
		});
	}]);
	
	return app;
})(angular, appBase);



// ClassDetail - attend
// 출결 현황
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("ClassDetailAttendController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var dateToday = new Date( $rootScope.today ),
			objForm;
		
		$scope.param = {
			regid: $stateParams.regid,
			year: dateToday.getFullYear(),
			month: dateToday.getMonth() + 1
		};
		
		$scope.$parent.$parent.tab = $stateParams.tab;
		
		$scope.info = {};
		
		$scope.calendarOptions = {
		    defaultDate: $rootScope.today,
		    minDate: new Date("2000-01-01"),
		    maxDate: new Date("2100-01-01"),
		    dayNamesLength: 3, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
		    monthClick: function(data, b){
		    	$scope.param.year = data.year;
		    	$scope.param.month = data.month;
		    	
		    	objForm.submit();
		    }
		    //eventClick: $scope.eventClick,
		    //dateClick: $scope.dateClick
		  };
		
		$scope.attendlist = [];
		
		dateToday = undefined;

		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classDetailAttend", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.attendlist = mData.attendlist;
			}
		});
		// 실패 했을 때
		$scope.$on("form_classDetailAttend.fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on("form_classDetailAttend.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classDetailAttend.ready", function($event, $data){
			objForm = $data.form;
			//$data.form.submit();
		});
	}]);
	
	return app;
})(angular, appBase);


// ClassDetail - plans
// 강의 계획서
try{
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("ClassDetailPlansController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		var iCount = 0
		
		$scope.param = {
			regid: $stateParams.regid
		};
		
		$scope.$parent.$parent.tab = $stateParams.tab;
		$scope.plans = {};
		$scope.lessonAllMinute = 0;
		$scope.lessonMinutes = [];
		$scope.hasNoPlans = false;
		$scope.plan1 = 0;
		$scope.plan2 = 0;
		$scope.plan3 = 0;
		
		// 시간 누적의 백분율 구하기
		$scope.accuTimePercent = function(index){
			var aLMin = $scope.lessonMinutes,
				iAll = $scope.lessonAllMinute,
				iAccu = 0,
				iPercent = 0;
			
			for(var i = 0, iLen = index + 1; i < iLen; i++){
				iAccu += aLMin[i];
			}
			
			iPercent = parseInt( (iAccu / iAll) * 100 );
			
			if (iPercent > 100){
				iPercent = 100;
			}
			
			return iPercent;
		};
		
		$scope.calcProgressWidth = function(width){
			try{
				var iRet = 0,
					iAllMin = $scope.lessonAllMinute;
					
				iRet = parseInt( width * (iAllMin / 10) );

				if (iRet === NaN){
					throw "result is NaN !!: " + width + ", " + iAllMin;
				}
				
				return iRet;
			}
			catch(e){
				console.log(e);
			}
			
			return width; 
		}
		
		// 클래스 레슨 시간 분류 및 적용
		$scope.applyLessonTime = function(plans){
			var mLessonPlan;
			
			if (plans && plans.lessonPlan){
				mLessonPlan = plans.lessonPlan;
				$scope.lessonMinutes = [
					parseInt( mLessonPlan.timemng1 ),
					parseInt( mLessonPlan.timemng2 ),
					parseInt( mLessonPlan.timemng3 ),
					parseInt( mLessonPlan.timemng4 ),
					parseInt( mLessonPlan.timemng5 )
				];
				$scope.lessonAllMinute = parseInt( parseFloat( mLessonPlan.timemng6 ) * 60 );
			}
			else{
				// 데이터 오류가 있을 경우 기본 값으로 초기화
				$scope.plans = {};
				$scope.lessonAllMinute = 0;
				$scope.lessonMinutes = [];
			}
		};

		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classDetailPlans", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result,
				aValid;
			
			if (mResult.valid){
				$scope.plans = mData.plans;
				$scope.applyLessonTime( mData.plans );
				
				//test
				//$scope.plans.lessonPlan.courseobj = undefined;
				//$scope.plans.lessonPlan.timemng6 = "";
				//$scope.plans.lessonPlan = undefined;
				//$scope.plans.lessonPlanWeek = undefined;
				
				
			}
			
			//console.log("$scope.plans", $scope.plans);
			aValid = util.checkBatchValid($scope.plans, 
					["lessonPlan.courseobj", "lessonPlan.timemng6", "lessonPlanWeek"]);
			
			//console.log("aValid", aValid);
					
			$scope.plan1 = aValid[0].seq;
			$scope.plan2 = aValid[1].seq;
			$scope.plan3 = aValid[2].seq;
			$scope.hasNoPlans = (aValid[0].valid || aValid[1].valid || aValid[2].valid) === false;
		});
		// 실패 했을 때
		$scope.$on("form_classDetailPlans.fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on("form_classDetailPlans.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
	}]);
	
	return app;
})(angular, appBase);
}
catch(e){}



// ClassDetail - report
// 월별 평가서
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("ClassDetailReportController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var objForm;
		
		$scope.param = {
			regid: $stateParams.regid,
			year_month: ""
		};
		
		$scope.$parent.$parent.tab = $stateParams.tab;
		$scope.report = {};
		$scope.hasReport = true;

		$scope.color = $rootScope.color;
		
		
		$scope.calendarOptions = {
		    defaultDate: $rootScope.today,
		    minDate: new Date("2000-01-01"),
		    maxDate: new Date("2100-01-01"),
		    useSimpleMonth: true,
		    monthClick: function(data){
		    	var iYear = data.year,
		    		iMonth = data.month,
		    		sMonth = (iMonth < 10)? "0" + iMonth : iMonth + ""
		    		;
		    	$scope.param.year_month = iYear + "-" + sMonth;
		    	
		    	objForm.submit();
		    }
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on("form_classDetailReport", function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result,
				arr, aColor;
			
			if (mResult.valid){
				// test
				//mData.report = null;
				if (mData.report){
					if (mData.report.curr_stat){
						arr = mData.report.curr_stat;
						aColor = util.colorLuminanceArray($scope.color, $scope.colorDist, arr.length);
						
						for(var i = 0, iLen = aColor.length; i < iLen; i++){
							arr[i].color = aColor[i];
						}
						
						mData.report.curr_stat = arr;
					}
					//test
					//mData.report.language = "EN";
					if (mData.report.language !== "EN"){
						if (mData.report.curr_stat){
							arr = mData.report.curr_stat;
							
							arr.pop();
							arr.pop();
							mData.report.curr_stat = arr;
						}
						if (mData.report.accu_recd){
							arr = mData.report.accu_recd;
							
							for(var i = 0, iLen = arr.length; i < iLen; i++){
								delete arr[i].value5;
								delete arr[i].value6;
							}
							
							mData.report.accu_recd = arr;
						}
					}
					$scope.hasReport = true;
				}
				else{
					$scope.hasReport = false;
				}
				
				$scope.report = mData.report;
			}
		});
		// 실패 했을 때
		$scope.$on("form_classDetailReport.fail", function($event, $data){
			
		});
		// 유효성 실패 했을 때
		$scope.$on("form_classDetailReport.invalid", function($event, $data){
			alert( $scope.invalidMsg );
		});
		$scope.$on("form_classDetailReport.ready", function($event, $data){
			objForm = $data.form;
			//$data.form.submit();
		});
	}]);
	
	return app;
})(angular, appBase);


////////////////////////////////////////////////////////////////////////////////////
// TUTOR ONLY
////////////////////////////////////////////////////////////////////////////////////

// ClassDetail - Class 현황
// 월별 평가서
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorClassDetailCurrController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", "pointcolor", function($scope, $rootScope, $location, $document, $state, $stateParams, util, pointcolor){
		
		var sFormName = "form_classDetailCurr",
			objForm,
			dateToday = new Date($rootScope.today);
		
		$scope.param = {
			classid: $stateParams.regid,
			datestart: $rootScope.today
		};
		
		$scope.$parent.$parent.tab = $stateParams.tab;
		$scope.attendlist = [];
		$scope.classid = $stateParams.regid;
		$scope.year = dateToday.getFullYear();
		$scope.month = dateToday.getMonth() + 1;
		
		$scope.colorList = pointcolor._pieChart;
		$scope.color1 = $scope.colorList[0];//util.colorLuminance( $scope.color, -0.2 );
		$scope.color2 = $scope.colorList[1];//util.colorLuminance( $scope.color, 0.2 );
		$scope.color3 = $scope.colorList[2];//util.colorLuminance( $scope.color, 0.1 );
		$scope.color4 = $scope.colorList[3];//util.colorLuminance( $scope.color, -0.1 );
		$scope.color5 = $scope.colorList[4];//util.colorLuminance( $scope.color, -0.1 );
		$scope.color6 = $scope.colorList[5];//util.colorLuminance( $scope.color, -0.3 );
		
		$scope.selectorOptions = {
			type: "week",
		    defaultDate: $rootScope.today,
		    minDate: new Date("2000-01-01"),
		    maxDate: new Date("2100-01-01"),
		    click: function(data){
		    	$scope.param.datestart = data.startStr;
		    	$scope.year = data.date.getFullYear();
				$scope.month = data.date.getMonth() + 1;
		    	
		    	objForm.submit();
		    }
		};
		
		$scope.extDate = util.extDate;
		$scope.extWeekName = util.extWeekName;
		$scope.removeYear = util.removeYear;
		
		dateToday = undefined;
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on(sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result,
				aList, mItem, mRef = {};
			
			if (mResult.valid){
				aList = util.arrayGroupBy( mData.attendlist, ["memberseq", "membername", "memberimg", "evregid"] );
				// Pie Chart 데이터 별도로 만들기
				for (var i = 0, iLen = aList.length; i < iLen; i++){
					mItem = aList[ i ];
					mItem.chartData = util.countFieldData( mItem.list, "status", ["Y", "N", "BZ", "VA", "C", "L"], "category", "value", mRef);
					mItem.hasChartData = mRef.allcount > 0;
				}
				
				$scope.attendlist = aList; 
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
			//$data.form.submit();
		});
	}]);
	
	return app;
})(angular, appBase);




// ClassDetail - Class 출석 입력용 목록
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorClassDetailAttendListForInputController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_classDetailAttendListForInput",
			objForm;
		
		$scope.param = {
			classid: $stateParams.regid,
			tutorseq: $rootScope.member.tutorseq,
			datestart: $rootScope.today,
			timestart: util.timeFormat( new Date() )
		};
		
		$scope.$parent.$parent.tab = $stateParams.tab;
		$scope.attendlist = [];

		$scope.selectorOptions = {
			type: "day",
		    defaultDate: $rootScope.today,
		    minDate: new Date("2000-01-01"),
		    maxDate: new Date("2100-01-01"),
		    click: function(data){
		    	$scope.param.datestart = data.dateStr;
		    	
		    	objForm.submit();
		    }
		};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on(sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result,
				aList, mItem;

			if (mResult.valid){
				$scope.attendlist = mData.attendlist; 
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
			//$data.form.submit();
		});
	}]);
	
	return app;
})(angular, appBase);



// ClassDetail - Class 출석 입력
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorClassDetailAttendInputController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$timeout", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $timeout, util){
		
		var sFormName = "form_classDetailAttendInput",
			objForm,
			bChangeStatus = false;
		
		$scope.param = {};
		
		$scope.onChange = function(){
			objForm.submit();
			bChangeStatus = true;
		};
		$scope.onClick = function(){
			if (bChangeStatus === false){
				$scope.param.status = "";
				$timeout($scope.onChange, 150);
			}
			bChangeStatus = false;
		};

		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on( sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				if (!$scope.param.regid){
					$scope.param.regid = mData.lastInsertId;
				}
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



// ClassDetail - Today's Lesson List
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorClassDetailTodayLessonController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "$sanitize", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, $sanitize, util){
		
		var sFormName = "form_todayLessonList",
			objForm;
		
		$scope.param = {
			classid: $stateParams.regid,
			tutorseq: $rootScope.member.tutorseq,
			datestart: $rootScope.today
		};
		
		$scope.$parent.$parent.tab = $stateParams.tab;
		$scope.todayLesson = [];
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on(sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.todayList = mData.todayList; 
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



// ClassDetail - Today's Lesson Write
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorClassDetailTodayLessonWriteController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_todayLessonWrite",
			elemSample = document.getElementById("text_todayLessonSample"),
			objForm;
		
		$scope.contentsSample = angular.element(elemSample).text().replace(/(\r\n|\t)/ig, "");
				
		$scope.param = {
			classid: $stateParams.regid,
			contents: $scope.contentsSample
		};
		
		$scope.$parent.$parent.tab = $stateParams.tab;
		$scope.todayLesson = [];
		
		elemSample = undefined;
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on(sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result;
			
			if (mResult.valid){
				$scope.$parent.todayList.unshift( {
					regid: mData.lastInsertId,
					tutorseq: $rootScope.member.tutorseq,
					memberseq: $rootScope.member.memberseq,
					ename: $rootScope.member.ename,
					kname: $rootScope.member.kname,
					createdate: util.dateFormat( new Date() ),
					contents: $scope.param.contents.replace(/\r\n/ig, "<br/>").replace(/\n/ig, "<br/>")
				} );
				
				$scope.param.contents = $scope.contentsSample;
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



// ClassDetail - Today's Lesson Delete
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorClassDetailTodayLessonDeleteController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_todayLessonDelete",
			objForm;

		$scope.param = {};
		
		// asyncform 을 통한 submit 성공 했을 때
		$scope.$on(sFormName, function($event, $data){
			var mData = $data.response.data,
				mResult = mData.result,
				index;
			
			if (mResult.valid && mResult.auth){
				index = $scope.$parent.todayList.indexOf( $scope.param )
				$scope.$parent.todayList.splice( index, 1 );
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




// ClassDetail - Class More Info
(function(angular, appBase){
	"use strict";
	
	var app = appBase;//angular.module("login", ["itm"]);
	
	app.controller("TutorClassDetailMoreInfoController", 
		["$scope", "$rootScope", "$location", "$document", "$state", "$stateParams", "util", function($scope, $rootScope, $location, $document, $state, $stateParams, util){
		
		var sFormName = "form_classDetailMoreInfo",
			objForm;
				
		$scope.$parent.$parent.tab = $stateParams.tab;
		
		$scope.info = {};
		$scope.param = {
			classid: $stateParams.regid
		};
		
		$scope.numberFormat = util.numberFormat;

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
			alert( $scope.invalidMsg );
		});
		$scope.$on( sFormName + ".ready", function($event, $data){
			objForm = $data.form;
		});
	}]);
	
	return app;
})(angular, appBase);