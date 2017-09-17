var appBase = (function(angular, undefined){
	"use strict";
	// route info [begin]
	var aRoute = [
		{
			name: "login",
			url: "/login",
			templateUrl: "view/login.html"
		},
		{
			name: "idsearch",
			url: "/idsearch",
			templateUrl: "view/idsearch.html"
		},
		{
			name: "pwsearch",
			url: "/pwsearch",
			templateUrl: "view/pwsearch.html"
		},
		// User (Member or Student) Part ###########################################################################
		{
			name: "user",
			abstract: true,
			url: "/user",
			templateUrl: "view/user/default.html"
		},
		{
			name: "user.modify",
			parent: "user",
			url: "/modify",
			templateUrl: "view/user/modify.html"
		},
		{
			name: "user.main",
			url: "/main",
			templateUrl: "view/user/main.html"
		},
		{
			name: "user.todayeng",
			parent: "user",
			url: "/todayeng/:date/:type",
			templateUrl: "view/user/today_english.html"
		},
		{
			name: "user.class",
			abstract: true,
			parent: "user",
			url: "/class/:regid",
			templateUrl: "view/user/class.html"
		},
		{
			name: "user.class.tab",
			parent: "user.class",
			url: "/:tab",
			templateUrl: function($stateParams){
				return "view/user/class_" + $stateParams.tab + ".html";
			}
		},
		{
			name: "user.classcomm",
			abstract: true,
			parent: "user",
			url: "/classcomm/:regid",
			templateUrl: "view/user/classcomm.html"
		},
		{
			name: "user.classcomm.sub",
			parent: "user.classcomm",
			url: "/:sub",
			templateUrl: function($stateParams){
				return "view/user/classcomm_" + $stateParams.sub + ".html";
			}
		},
		{
			name: "user.classcomm.detail",
			parent: "user.classcomm",
			url: "/detail/:boardid",
			templateUrl: "view/user/classcomm_detail.html"
		},
		{
			name: "user.classcomm.modify",
			parent: "user.classcomm",
			url: "/modify/:boardid",
			templateUrl: "view/user/classcomm_modify.html"
		},
		{
			name: "user.classcomm.write",
			parent: "user.classcomm",
			url: "/write/:bcode",
			templateUrl: "view/user/classcomm_write.html"
		},
		{
			name: "user.survey",
			parent: "user",
			url: "/survey/:classid",
			templateUrl: "view/user/survey.html"
		},
		{
			name: "user.contents",
			parent: "user",
			url: "/contents/:filename",
			templateUrl: function($stateParams){
				return "view/contents/user/" + $stateParams.filename + ".html";
			}
		},
		// Tutor (Teacher) Part ###########################################################################
		{
			name: "tutor",
			abstract: true,
			url: "/tutor",
			templateUrl: "view/tutor/default.html"
		},
		{
			name: "tutor.modify",
			parent: "tutor",
			url: "/modify",
			templateUrl: "view/tutor/modify.html"
		},
		{
			name: "tutor.main",
			url: "/main",
			templateUrl: "view/tutor/main.html"
		},
		{
			name: "tutor.quitclass",
			url: "/quitclass",
			templateUrl: "view/tutor/main.html"
		},
		{
			name: "tutor.class",
			abstract: true,
			parent: "tutor",
			url: "/class/:regid",
			templateUrl: "view/tutor/class.html"
		},
		{
			name: "tutor.class.tab",
			parent: "tutor.class",
			url: "/:tab",
			templateUrl: function($stateParams){
				return "view/tutor/class_" + $stateParams.tab + ".html";
			}
		},
		{
			name: "tutor.evview",
			parent: "tutor",
			url: "/evview/:classid/:memberseq/:year/:month",
			templateUrl: "view/tutor/evview.html"
		},
		{
			name: "tutor.evwrite",
			parent: "tutor",
			url: "/evwrite/:classid/:memberseq/:year/:month",
			templateUrl: "view/tutor/evwrite.html"
		},
		{
			name: "tutor.classcomm",
			abstract: true,
			parent: "tutor",
			url: "/classcomm/:regid",
			templateUrl: "view/tutor/classcomm.html"
		},
		{
			name: "tutor.classcomm.sub",
			parent: "tutor.classcomm",
			url: "/:sub",
			templateUrl: function($stateParams){
				return "view/tutor/classcomm_" + $stateParams.sub + ".html";
			}
		},
		{
			name: "tutor.classcomm.detail",
			parent: "tutor.classcomm",
			url: "/detail/:boardid",
			templateUrl: "view/tutor/classcomm_detail.html"
		},
		{
			name: "tutor.classcomm.modify",
			parent: "tutor.classcomm",
			url: "/modify/:boardid",
			templateUrl: "view/tutor/classcomm_modify.html"
		},
		{
			name: "tutor.classcomm.write",
			parent: "tutor.classcomm",
			url: "/write/:bcode",
			templateUrl: "view/tutor/classcomm_write.html"
		},
		{
			name: "tutor.schedule",
			parent: "tutor",
			url: "/schedule",
			templateUrl: "view/tutor/schedule.html"
		},
		{
			name: "tutor.schedule.write",
			parent: "tutor",
			url: "/schedule/write",
			templateUrl: "view/tutor/schedule_write.html"
		},
		{
			name: "tutor.appstatus",
			parent: "tutor",
			url: "/appstatus",
			templateUrl: "view/tutor/appstatus.html"
		},
		{
			name: "tutor.appstatus.detail",
			parent: "tutor",
			url: "/appstatus/:regid",
			templateUrl: "view/tutor/appstatus_detail.html"
		},
		{
			name: "tutor.jobpos",
			parent: "tutor",
			url: "/jobpos",
			templateUrl: "view/tutor/jobpos.html"
		},
		{
			name: "tutor.jobpos.detail",
			parent: "tutor",
			url: "/jobpos/:regid",
			templateUrl: "view/tutor/jobpos_detail.html"
		},
		{
			name: "tutor.monthpay",
			parent: "tutor",
			url: "/monthpay",
			templateUrl: "view/tutor/monthpay.html"
		},
		{
			name: "tutor.statepay",
			parent: "tutor",
			url: "/statepay",
			templateUrl: "view/tutor/statepay.html"
		},
		{
			name: "tutor.ranking",
			parent: "tutor",
			url: "/ranking",
			templateUrl: "view/tutor/ranking.html"
		},
		{
			name: "tutor.contents",
			parent: "tutor",
			url: "/contents/:filename",
			templateUrl: function($stateParams){
				return "view/contents/tutor/" + $stateParams.filename + ".html";
			}
		}
		
	];// route info [end] ############################################################################################
	
	
	
	
	
	
	// 최초 기본 모듈 생성
	var app = angular.module("itm", ["ui.router", "ngAnimate", "ngSanitize", "infinite-scroll", "500tech.simple-calendar", "day-selector", "pointcolor"]);
	
	// 무한스크롤 요청시간 제한 설정
	//angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);
    //console.log("app" ,aRoute);
        
    app.config([
    	"$stateProvider",
    	"$urlRouterProvider",
    	"$httpProvider",
    	"$sceDelegateProvider",
    function(
    	$stateProvider,
    	$urlRouterProvider,
    	$httpProvider,
    	$sceDelegateProvider
    ){
    	// Appling Router [begin]
    	var mRouteInfo;
    	
    	for(var i = 0, iLen = aRoute.length; i < iLen; i++){
    		
    		mRouteInfo = aRoute[ i ];
    		
    		//console.log("mRouteInfo", mRouteInfo);
    		
    		$stateProvider.state(mRouteInfo);
    	}
    	
    	mRouteInfo = undefined;
    	aRoute = undefined;
    	
    	$urlRouterProvider.otherwise('/login');
    	// Appling Router [end]
    	
    	$sceDelegateProvider.resourceUrlWhitelist(['**']);
    	
    	
    }]);
    
    app.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', 
        function ($rootScope, $state, $stateParams, $window, $templateCache) {
		}]);

    //angular.element( document ).find("html").attr("ng-app", "itm");
    //angular.bootstrap(document, ["itm"]);

	app.controller("base", ["$scope", "$rootScope", "$httpBackend", "pointcolor", function($scope, $rootScope, $httpBackend, pointcolor){
		$scope.title = ":::";
		$rootScope.theme = "mint";
		$rootScope._locale = __locale;
		
		$scope.loc = function(key){
			try{
				return $rootScope._locale[ key ];
			}
			catch(e){}
			
			return "unknown key: " + key;
		};
		
		$rootScope.setColor = function(theme){
			$rootScope.color = pointcolor[ $rootScope.theme ].active;
			$rootScope.colorDisable = pointcolor[ $rootScope.theme ].disable;
		}
		/*
		$rootScope.$watch("theme", function(){
			//console.log("color", $scope.color, pointcolor);
			
		}, true);
		*/
		//document.addEventListener("DOMContentLoaded", tellAngular, false);
		// 모바일이면 뭔가 하려고 했는데 뭐였지 -_-; 아무튼 필요 없어서 제거..
		/*
		$rootScope.mobileScreen = true;
		
		angular.element( window ).on("resize", function(event){
			if ($scope.mobileWidth === undefined){
				$scope.mobileWidth = 960;
			}
			
			if ($scope.mobileWidth >= event.currentTarget.innerWidth){
				$rootScope.mobileScreen = true;
			}
			else{
				$rootScope.mobileScreen = false;
			}
		});
		try{
			$httpBackend.expectGET(/class_detail/).respond(function(data){
				console.log("$httpBackend" + data);
			});
		}
		catch(e){}
		*/
	}]);
	
	// 공통 Service 설정
	app.service("const", function(){
		return {
			smk: "__itm_member",
			tdy: "__itm_today"
		};
	});
	
	app.service("cache", function(){
		var mData = {};
		
		return {
			has: function(key){
				return mData.hasOwnProperty( key );
			},
			remove: function(key){
				delete mData[ key ];
			},
			put: function(key, value, time){
				mData[ key ] = value;
				
				if (time !== undefined){
					setTimeout(function(){
						delete mData[ key ];
					}, time);
				}
			},
			get: function(key){
				return mData[ key ];
			}
		};
	});
	
	// util
	app.service("util", ["$rootScope", function($rootScope){
		var isAndroidDefault = undefined,
		
			util = {
			serializeMap : function( jqElem, arrToOneStr, delimiter ){
		    	var mData = {};
		    	var isArrToOneStr = angular.isArray(arrToOneStr);
		    	var sDelimiter = delimiter || ",";
		    	var mCacheChecked = {};
		    	var jqInputList;
		    	
		    	var fnSerializeMap = function(elem, index){
					var jqInput = angular.element(elem),
		    			sType = jqInput.attr("type"),
		    			sName = "",
		    			sTmp = "",
		    			sValue = "";
		    				
		    		//console.log("jqInput", jqInput);
		    		if (jqInput.attr("disabled") !== undefined) return;
		    		if (sType === "button" || sType === "submit" || sType === "image") return;
		    		
		    		sName = jqInput.attr("name");
		    		sValue = jqInput[0].value;
		    		
		    		if (mData.hasOwnProperty( sName ) === false){
		    			if ((sType === "checkbox") || (sType === "radio")){
		    				if (jqInput[0].checked === true){
		    					mData[ sName ] = sValue;
		    				}
		    				else{
		    					mCacheChecked[ sName ] = "";
		    				}
		    			}
		    			else{
		    				mData[ sName ] = sValue;
		    			}
		    		}
		    		else {
		    			if (sType === "checkbox"){
		    				if (mCacheChecked.hasOwnProperty( sName ) === true){
			    				mData[ sName ] = "";
			    				delete mCacheChecked[ sName ];
			    			}
			    			if (jqInput[0].checked === false){
		    					sValue = "";
		    				}
		    			}
		    			else if (sType === "radio"){
		    				if ((jqInput[0].checked === true) && (mData[ sName ] === "")){
		    					mData[ sName ] = sValue;
		    				}
		    				
		    				return;
		    			}
		    			
		    			if (isArrToOneStr === true){
		    				if (arrToOneStr.indexOf( sName ) >= 0){
		    					mData[ sName ] = mData[ sName ] + sDelimiter + sValue;
		    				}
		    			}
		    			else{
		    				if (angular.isArray(mData[ sName ]) === false){
			    				sTmp = mData[ sName ];
			    				mData[ sName ] = [];
			    				mData[ sName ][0] = sTmp;
			    			}
			    			mData[ sName ][ mData[ sName ].length ] = sValue;
		    			}
		    		}
				};
				
		    	angular.forEach( jqElem.find("input"), fnSerializeMap );
		    	angular.forEach( jqElem.find("select"), fnSerializeMap );
		    	angular.forEach( jqElem.find("textarea"), fnSerializeMap );
		    	
		    	return mData;
			},
			
			removeArrayItem: function(arr, item){
				var index = arr.indexOf( item );
				
				return arr.splice( index, 1 );
			},
			// 출처: http://www.sitepoint.com/javascript-generate-lighter-darker-color/
			colorLuminance: function (hex, lum) {

				// validate hex string
				hex = String(hex).replace(/[^0-9a-f]/gi, '');
				if (hex.length < 6) {
					hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
				}
				lum = lum || 0;
			
				// convert to decimal and change luminosity
				var rgb = "#", c, i;
				for (i = 0; i < 3; i++) {
					c = parseInt(hex.substr(i*2,2), 16);
					c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
					rgb += ("00"+c).substr(c.length);
				}
			
				return rgb;
			},
			
			colorLuminanceArray: function(hex, lumDist, count){
				var dLumDist = lumDist || 0.1,
					iCount = count || 5,
					aRet = [],
					iEnd = Math.ceil( iCount / 2 ),
					i = 0,
					dLumFst = dLumDist * iEnd,
					dLumLst = dLumFst,
					iFst = (iCount % 2 === 0)? -1 : 0,
					iLst = iCount - 1,
					dLum = dLumDist * iEnd;
				
				for(i = 0; i < iEnd; i++){
					if (iFst >= 0){
						aRet[ iFst ] = util.colorLuminance(hex, dLum);
					}
					aRet[ iLst ] = util.colorLuminance(hex, -dLum);
					
					iFst++;
					iLst--;
					dLum -= dLumDist;
				}
				
				aRet[ iEnd - 1 ] = hex;
				
				return aRet;
			},
			
			noFmt: function(index, digit){
				if (digit === 2){
					if (index < 10){
						return "0" + index;
					}
				}
				else{
					if (index < 10){
						return "00" + index;
					}
					if (index < 100){
						return "0" + index;
					}
				}
				
				return index;
			},
			dtFmt: function(gubun, hh, mm){
				try{
					var gubun = gubun,
						hh = hh,
						mm = mm,
						sHHMM;
					
					if (arguments.length === 2){
						hh = arguments[0];
						mm = arguments[1];
					}
					
					if (hh === undefined || mm === undefined){
						throw "parameters are undefined !";
					}
					
					sHHMM = ( (parseInt(hh) < 10)? "0" + hh : hh ) + ":" +
						( (parseInt(mm) < 10)? "0" + mm : mm );
					
					if (gubun === undefined){
						return sHHMM;
					}
					
					return gubun + " " + sHHMM;
				}
				catch(e){}
				
				return "";
			},
			cdaysFmt: function(mo, tu, we, th, fr, sa, su, delimiter, arrLabel){
				var arrLabel = arrLabel || ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
					sMerge = "",
					sDelimiter = delimiter || ", ";
				
				try{
					for(var i = 0; i < 7; i++){
						if (arguments[ i ] === "Y"){
							if (sMerge.length > 0){
								sMerge += sDelimiter;
							}
							sMerge += arrLabel[ i ];
						}
					}
				}
				catch(e){}
				
				return sMerge;
			},
			cdaysCount: function(mo, tu, we, th, fr, sa, su){
				var iCount = 0;
				
				try{
					for(var i = 0; i < 7; i++){
						if (arguments[ i ] === "Y"){
							iCount++;
						}
					}
				}
				catch(e){}
				
				return iCount;
			},
			
			arrayGroupBy: function(arr, fieldNames, field1, field2, field3){
				var aTmp = [],
					aGroup,
					mItem,
					sVal,
					iParentIndex = 0,
					iCurrItemIndex = 0,
					mNewItem,
					fieldName,
					aFieldNames,
					iFieldLen,
					mHistory = {};
				
				if (angular.isArray(arr) === false){
					return aTmp;
				}
				
				if (angular.isArray(arr) === false){
					aFieldNames = [ fieldNames ];
				}
				else{
					aFieldNames = fieldNames;
				}
				
				iFieldLen = aFieldNames.length;
				fieldName = aFieldNames[ 0 ];
				
				for(var i = 0, iLen = arr.length; i < iLen; i++){
					mItem = arr[ i ];
					sVal = mItem[ fieldName ];
					
					if (mHistory.hasOwnProperty( sVal ) === false){
						mHistory[ sVal ] = iParentIndex;
						mNewItem = {};
						
						mNewItem[ fieldName ] = sVal;
						
						for(var j = 1; j < iFieldLen; j++){
							mNewItem[ aFieldNames[ j ] ] = mItem[ aFieldNames[ j ] ];
						}
						
						mNewItem.list = [];
						aTmp[ iParentIndex ] = mNewItem;
						iParentIndex++;
					}
					
					iCurrItemIndex = mHistory[ sVal ];
					aTmp[ iCurrItemIndex ].list.push( mItem );
				}
				
				return aTmp;
			},
			
			countFieldData: function(arr, fieldName, targetData, retFieldName1, retFieldName2, refStatus){
				var aData,
					mRet,
					val,
					index,
					aRet = [],
					iCnt,
					iAllCnt = 0,
					sFieldName_value = retFieldName1 || "value",
					sFieldName_count = retFieldName2 || "count";
				
				if (angular.isArray(targetData) === false){
					aData = [ targetData ];
				}
				else{
					aData = targetData;
				}
				
				for(var i = 0, iLen = aData.length; i < iLen; i++){
					mRet = {};
					mRet[ sFieldName_value ] = aData[ i ];
					mRet[ sFieldName_count ] = 0;
					
					aRet.push( mRet );
				}
				
				for(var i = 0, iLen = arr.length; i < iLen; i++){
					val = arr[ i ][ fieldName ];
					index = aData.indexOf( val );
					
					if (index > -1){
						iCnt = aRet[ index ][ sFieldName_count ];
						iCnt++;
						iAllCnt++;
						aRet[ index ][ sFieldName_count ] = iCnt;
					}
				}
				
				if (refStatus !== undefined){
					refStatus.allcount = iAllCnt;
				}
				
				return aRet;
			},
			
			extWeekName: function(date, len){
				var aWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
					iLen = len || 10,
					sWeekName;
				
				if (!date){
					try{console.log("util.extWeekName-- argument 'date' is empty! : " + date)}catch(e){}
					
					return "";
				}
				
				sWeekName = aWeekNames[ (new Date(date)).getDay() ];
				
				return sWeekName.slice(0, iLen);
			},
			
			extDate: function(date){
				var iDate;
				
				try{
					iDate = (new Date(date)).getDate();
				}
				catch(e){}
				
				if (iDate < 10){
					return "0" + iDate;
				}
				
				return iDate + "";
			},
			
			removeYear: function(date, delimiter){
				var date = new Date(date),
					iMonth = date.getMonth() + 1,
					iDate = date.getDate(),
					sMonth = (iMonth < 10)? "0" + iMonth : iMonth + "",
					sDate = (iDate < 10)? "0" + iDate : iDate + "",
					sDelimiter = delimiter || "-";
					
				return sMonth + sDelimiter + sDate;
			},
			
			dateFormat: function (date, delimiter){
		    	var iMonth = date.getMonth() + 1,
		    		iYear = date.getFullYear(),
		    		iDay = date.getDate(),
		    		sMonth = (iMonth < 10)? "0" + iMonth : iMonth,
		    		sDay = (iDay < 10)? "0" + iDay : iDay,
		    		sDelimiter = delimiter || "-";
		    	
		    	return iYear + sDelimiter + sMonth + sDelimiter + sDay;
		   },
		   
		   timeFormat: function (date, delimiter){
		    	var iHour = date.getHours() + 1,
		    		iMin = date.getMinutes(),
		    		iSec = date.getSeconds(),
		    		sHour = (iHour < 10)? "0" + iHour : iHour,
		    		sMin = (iMin < 10)? "0" + iMin : iMin,
		    		sSec = (iSec < 10)? "0" + iSec : iSec,
		    		sDelimiter = delimiter || ":";
		    	
		    	return sHour + sDelimiter + sMin + sDelimiter + sSec;
		   },
		   
			numberFormat: function(num) {
				var pattern = /(-?[0-9]+)([0-9]{3})/;
				var sNum = num + "";
				
				while(pattern.test(sNum)) {
					sNum = sNum.replace(pattern,"$1,$2");
				}
				return sNum;
			},
			
			convertToMonthName: function(month, len, names){
				var MONTHS = names || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					iLen = len || false;
				
				if (iLen){
					return (MONTHS[ parseInt(month) - 1 ]).slice(0, iLen);
				}
				else{
					return MONTHS[ parseInt(month) - 1 ];
				}
			},
			
			convertToStringValues: function(map){
				var val,
					ng = angular,
					mNew = {};
				
				for(var key in map){
					val = map[ key ];
					
					if ((isFinite( val ) === true) && (val !== null)){
						mNew[ key ] = val + "";
					}
					else if (ng.isNumber( val ) || (val === null)){
						console.log(val);
						mNew[ key ] = "";
					}
					else{
						mNew[ key ] = val;
					}
				}
				
				return mNew;
			},
			
			equals: function(m1, m2, fields){
				if (fields){
					for(var i = 0, iLen = fields.length, key; i < iLen; i++){
						try{
							key = fields[i];
							if(m1[ key ] !== m2[ key ]){
								return false;
							}
						}
						catch(e){
							return false;
						}
					}
				}
				else{
					for(var key in m1){
						try{
							if(m1[key] !== m2[key]){
								return false;
							}
						}
						catch(e){
							return false;
						}
					}
				}
				
				return true;
			},
			// repeat values
			repeatValues: function(start, end, step, format){
				var iStep = step | 1,
					val,
					aRet = [];
				
				for(var i = start; i <= end; i += iStep){
					if (format){
						val = (i < 10)? "0" + i : i;
					}
					else{
						val = i;
					}
					aRet.push( val );
				}
				
				return aRet;
			},
			
			getDataValidReason: function(data, allowEmpty){
				var bAllowEmpty = (allowEmpty !== undefined)? allowEmpty : false,
					sReason;
				
				if (data === undefined){
					sReason = "undefined";
				}
				else if (data === null){
					sReason = "null";
				}
				else if (data === NaN){
					sReason = "NaN";
				}
				else if ((allowEmpty === false) && (data === "")){
					sReason = "empty";
				}
				else{
					sReason = "";
				}
				
				return sReason;
			},
			
			checkDataValid: function(data, key, allowEmpty){
				var sKey,
					val,
					bAllowEmpty = (allowEmpty !== undefined)? allowEmpty : false,
					bValid = false,
					sReason = "",
					oTmp = data;
					
				if ((key instanceof Array) === false){
					return util.checkDataValid(data, key.split("."), bAllowEmpty);
				}
				
				try{
					if (key.length > 0){
						sKey = key[0];
						val = data[ sKey ];
						sReason = util.getDataValidReason(val, bAllowEmpty);
						
						bValid = sReason === "";
						
						if (bValid){
							key.shift();
							return util.checkDataValid(val, key, bAllowEmpty);
						}
					}
					else{
						bValid = true;
					}
				}
				catch(e){
					//console.log(e);
					//console.log("checkDataValid", data);
					sReason = "data is not object";
				}
					
				return {
					valid: bValid,
					reason: sReason,
					leftKeys: key
				};
			},
			
			checkBatchValid: function(data, key, allowEmpty){
				var aKey = (key instanceof Array)? key : [key],
					aKeySplit,
					aRet = [],
					mItem,
					iSeq = 0,
					bRet;
				
				try{
					for(var i = 0, iLen = aKey.length; i < iLen; i++){
						mItem = util.checkDataValid(data, aKey[i]);
						
						if (mItem.valid){
							mItem.seq = ++iSeq;
						}
						else{
							mItem.seq = 0;
						}
						
						aRet[i] = mItem;
					}
				}
				catch(e){}
				
				return aRet;
			},
			
			serializeParams: function(params){
				var str = "";
				for (var key in params) {
				    if (str != "") {
				        str += "&";
				    }
				    str += key + "=" + encodeURIComponent(params[key]);
				}
				
				return "?" + str;
			},
			
			isDefaultBrowser: function(){
				//return true;
				
				var sUa;
				
				if (isAndroidDefault !== undefined){
					return isAndroidDefault;
				}
				
				sUa = navigator.userAgent;
				isAndroidDefault = (sUa.indexOf("Android") > -1) &&
					(sUa.indexOf("Version") > -1);
				
				return isAndroidDefault;
			}
		};
		
		return util;
	}]); // app.service("util" // [end]
	
	
	app.service("amchart", ["$rootScope", "util", function($rootScope, util){
		var _AmCharts = AmCharts;
		
		return {
			findFieldCount: function (data){
				var iCnt = 0,
					arr,
					item,
					key;
				
				if (angular.isArray(data) && (data.length > 0)){
					arr = data;
					
					for(var i = 1; i < 20; i++){
						item = arr[ 0 ];
						
						if (i > 1){
							key = "value" + i;
						}
						else{
							key = "value";
						}
						
						if (item.hasOwnProperty( key )){
							iCnt++;
						}
					}
				}
				
				return iCnt;
			},
			
			createLineGraphInfo: function(count){
				var aRet = [],
					item,
					mDef = {
						"balloonText": "[[title]] of [[category]]:[[value]]",
						"bullet": "round",
						"id": "AmGraph-2",
						"labelText": "[[value]]",
						"lineThickness": 2,
						"title": "graph 2",
						"valueField": "value2"
					};
				
				for(var i = 1; i <= count; i++){
					item = angular.copy( mDef );
					item.id = "AmGraph-" + i;
					item.title = "graph" + i;
					item.valueField = "value" + ((i > 1)? i : "");
					aRet.push( item );
				}
				
				return aRet;
			},
			
			makePieChart: function (AmCharts, id, color, colorDist, data){
				var aColors;
				
				if (angular.isArray(color)){
					aColors = color;
				}
				else{
					aColors = util.colorLuminanceArray(color, colorDist);
				}
								
				return AmCharts.makeChart(id,
					{
						"type": "pie",
						"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
						"labelRadius": -20,
						"labelText": " [[percents]]%",
						"minRadius": 0,
						"pullOutRadius": "5%",
						"startRadius": "0%",
						"colors": aColors,
						"marginBottom": 0,
						"marginTop": 0,
						"outlineThickness": 0,
						"titleField": "category",
						"valueField": "value",
						"backgroundColor": "#FFFFFF",
						"color": "#FFFFFF",
						"fontFamily": "Arial",
						"fontSize": 14,
						"handDrawn": false,
						"percentPrecision": 0,
						"precision": 0,
						"theme": "chalk",
						"allLabels": [],
						"balloon": {
							"maxWidth": 200
						},
						"titles": [],
						"dataProvider": data
					}
				);
			},// makePieChart [end]
			
			makeRadarChart: function (AmCharts, id, color, data){
				return AmCharts.makeChart(id, {
					"type": "radar",
					"categoryField": "category",
					"colors": [
						color
					],
					"color": "#636363",
					"fontSize": 12,
					"graphs": [
						{
							"balloonText": "[[value]]",
							"bullet": "round",
							"id": "AmGraph-1",
							"valueField": "value"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"axisTitleOffset": 20,
							"id": "ValueAxis-1",
							"minimum": 0,
							"axisAlpha": 0.15,
							"dashLength": 3
						}
					],
					"allLabels": [],
					"balloon": {},
					"titles": [],
					"dataProvider": data
				});
			},// makeRadarChart [end]
			
			makeCircProg: function (AmCharts, id, color1, color2, percent){
				return AmCharts.makeChart(id, {
					"type": "pie",
					"balloonText": "",
					"innerRadius": "90%",
					"labelRadius": 0,
					"pullOutRadius": "0%",
					"labelsEnabled": false,
					"marginBottom": 0,
					"marginTop": 0,
					"colors": [
						color1,
						color2
					],
					"sequencedAnimation": false,
					"startDuration": 0,
					"titleField": "category",
					"valueField": "column-1",
					"allLabels": [],
					"balloon": {},
					"titles": [],
					"dataProvider": [
						{
							"category": "enable",
							"column-1": percent
						},
						{
							"category": "disable",
							"column-1": 100 - percent
						}
					]
				});
			},// makeCircProg [end]
			
			makeBarChart: function (AmCharts, id, color1, data){
				return AmCharts.makeChart(id, {
					"type": "serial",
					"categoryField": "category",
					"columnWidth": 0.27,
					"colors": [
						color1
					],
					"sequencedAnimation": false,
					"startDuration": 0,
					"startEffect": "easeOutSine",
					"color": "#626262",
					"categoryAxis": {
						"gridPosition": "start",
						"axisColor": "#C2C2C2",
						"minorTickLength": -1
					},
					"trendLines": [],
					"graphs": [
						{
							"colorField": "color",
							"fillAlphas": 1,
							"id": "AmGraph-1",
							"lineColorField": "color",
							"title": "graph 1",
							"type": "column",
							"valueField": "value"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							//"minimum": 200,
							"axisColor": "#C2C2C2",
							"labelFrequency": 1,
							"showLastLabel": false,
							"title": ""
						}
					],
					"allLabels": [],
					"balloon": {},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": ""
						}
					],
					"dataProvider": data
				});
			},// makeBarChart [end]
			
			makeBarLineChart: function (AmCharts, id, color1, data){
				if (data === undefined) return;
				
				var colorLine = util.colorLuminance( color1, -0.6 );
				
				return AmCharts.makeChart(id, {
					"type": "serial",
					"categoryField": "category",
					"columnWidth": 0.27,
					"colors": [
						color1,
						colorLine
					],
					"color": "#000000",
					"categoryAxis": {
						"autoWrap": true,
						"gridPosition": "start",
						"axisColor": "#C2C2C2",
						"color": "#626262",
						"minorTickLength": -1
					},
					"trendLines": [],
					"graphs": [
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-1",
							"title": "graph 1",
							"type": "column",
							"colorField": "color",
							"valueField": "value"
						},
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"bullet": "round",
							"id": "AmGraph-2",
							"labelText": "[[value]]",
							"lineThickness": 2,
							"title": "graph 2",
							"valueField": "value2"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							//"minimum": 200,
							"axisColor": "#C2C2C2",
							"color": "#626262",
							"labelFrequency": 1,
							"showLastLabel": false,
							"title": ""
						}
					],
					"allLabels": [],
					"balloon": {},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": ""
						}
					],
					"dataProvider": data
				});
			},// makeBarLineChart [end]
			
			makeLineChart: function (AmCharts, id, color1, colorDist, data){
				
				var iFieldCnt = this.findFieldCount( data ),
					aColors = util.colorLuminanceArray( color1, colorDist, iFieldCnt ),
					aGraphInfo = this.createLineGraphInfo( iFieldCnt );
					
				
				return AmCharts.makeChart(id, {
					"type": "serial",
					"categoryField": "category",
					"columnWidth": 0.27,
					"colors": aColors,
					"color": "#626262",
					"categoryAxis": {
						"gridPosition": "start",
						"axisColor": "#C2C2C2",
						"minorTickLength": -1
					},
					"trendLines": [],
					"graphs": aGraphInfo,
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							//"minimum": 200,
							"axisColor": "#C2C2C2",
							"labelFrequency": 1,
							"showLastLabel": false,
							"title": ""
						}
					],
					"allLabels": [],
					"balloon": {},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": ""
						}
					],
					"dataProvider": data
				});
			},// makeBarLineChart [end]
			
			makeChart: function (type, id, color1, color2, colorDist, data){
				//console.log("color", color1, color2);
				
				switch(type){
					case "radar":
						return this.makeRadarChart( _AmCharts, id, color1, data );
						break;
					case "circprog":
						return this.makeCircProg( _AmCharts, id, color1, color2, data );
						break;
					case "pie":
						return this.makePieChart( _AmCharts, id, color1, colorDist, data );
						break;
					case "bar":
						return this.makeBarChart( _AmCharts, id, color1, data );
						break;
					case "line":
						return this.makeLineChart( _AmCharts, id, color1, colorDist, data );
						break;
					case "barline":
						return this.makeBarLineChart( _AmCharts, id, color1, data );
						break;
				}
				
				return null;
			}
		};
	}]); // app.service("amchart" [end]
	
	
	
	
	
	
	// 공통 Directive 설정
	
	/*
	 * ngAsyncform
	 * 속성이 적용 된 form은 비동기 기능을 가지게 된다.
	 * 본 기능이 적용된 form 요소는 기본 submit 기능을 상실 하게 된다.
	 * controller가 가진 Model 과는 별도로 form 안에 구성된 input, select, textarea 등을 이용하여
	 * 데이터 전송을 시도 한다.
	 * 비동기 결과는 해당 controller 에서 
	 * $scope.$on( formName, function($event, data){...})
	 * 처럼 구성 하여 처리 한다.
	 * callback 
	 * - $event: angular 의 $event object.
	 * - data
	 *   ├ action	: 수행된 url
	 *   ├ params	: 사용된 파라메터
	 *   ├ response : $http를 통해 가져온 response data.
	 */
	app.directive("ngAsyncform", function(){
		return {
			restrict: "A",
			controller: ["$scope", "$rootScope", "$http", "$document", "$location", "$timeout", "cache", "util", function($scope, $rootScope, $http, $document, $location, $timeout, cache, util){
				//console.log("parent", $scope.$parent);
				$scope.$http = $http;
				$scope.util = util;
				$scope.$document = $document;
				$scope.$location = $location;
				$scope.$timeout = $timeout;
				$scope.cache = cache;
				
				
				if ($rootScope.loadingQueue === undefined){
					$rootScope.loadingQueue = {
						vals: [],
						put: function(val){
							this.vals.push(val);
							$rootScope.loading = true;
							$rootScope.loadingEnd = false;
						},
						get: function(){
							var ret;
							
							if (this.isEmpty()){
								return;
							}
							
							ret = this.vals.pop();
							
							if (this.isEmpty()){
								$rootScope.loading = false;
								$rootScope.loadingEnd = true;
							}
							
							return ret;
						},
						isEmpty: function(){
							return this.vals.length === 0;
						}
					};

					$rootScope.loading = false;
				}
				
				$scope.lqPut = function(){
					$rootScope.loadingQueue.put("-");
				};
				$scope.lqGet = function(){
					$rootScope.loadingQueue.get();
				};
			}],
			link: function(scope, element, attr){
				var util = scope.util;
				var name = element.attr("name");
				
				var fnDoAjaxSubmit = function(scope, elem, attr){// console.log("ffff", elem);
					var elem = elem,
						sMethod = elem.method.toUpperCase(),
						sAction = elem.action,
						name = elem.name,
						sConfirmMsg = attr.confirm,
						bConfirm = false,
						bManual = attr.hasOwnProperty("manual"),
						bUseCache = attr.hasOwnProperty( "cache" ),
						iCacheTime = (bUseCache)? parseInt( attr.cache || 10 ) * 60 * 1000 : 0,
						$location = scope.$location,
						ngForm,
						mParam,
						sUrlWithParam;
					
					if (attr.param){
						//console.log( JSON.stringify( scope[ attr.param ] ) )
						mParam = scope[ attr.param ];
						
						if (!mParam){
							throw "ngAsyncform: scope must have to property '" + attr.param + "' !";
						}
					}
					else{
						mParam = util.serializeMap( angular.element(elem) );
					}
					
					sMethod = (sMethod)? sMethod : "GET";
					
					//console.log("e", e);
					//console.log("param", mParam);
					//console.log("directive param", scope.param);
					//console.log("attr", attr);
					
					if (angular.isString( name )){
						ngForm = scope[ name ];
						
						if (ngForm.$invalid){
							if (navigator.userAgent.indexOf("MSIE") > -1){
								// IE는 angular 의 valid 기능을 씹어 먹는다 -_-
								// 명불허전 IE... Shit..
							}
							else{
								scope.$broadcast( name + ".invalid", {
									form: elem,
									action: elem.action,
									params: mParam,
									ngForm: ngForm
								});
								return;
							}
						}
					}
					else{
						throw "ngAsyncform: form element must have to name attribute!";
					}
					
					try{
						
						/*
						var xhr = new XMLHttpRequest();
						
						xhr.onreadystatechange = function(){
							if (xhr.readyState == 4 && xhr.status == 200) {
								try{
									scope.$broadcast( name, {
										form: elem,
										action: elem.action,
										params: mParam,
										ngForm: ngForm,
										response: {data: JSON.parse(xhr.responseText)}
									});
								}
								catch(e){
									scope.$broadcast( name + ".fail", {
										form: elem,
										action: elem.action,
										params: mParam,
										ngForm: ngForm,
										response: e + "\r\n" + xhr.responseText
									});
								}
							}
							else if(xhr.readyState == 404){
								scope.$broadcast( name + ".fail", {
									form: elem,
									action: elem.action,
									params: mParam,
									ngForm: ngForm,
									response: xhr.responseText
								});
							}
						};
						
						xhr.open("GET", elem.action, true);
						xhr.send();
						*/
						
						try{
							delete mParam.prevent;
						}
						catch(e){}
						
						scope.$broadcast( name + ".before", {
							form: elem,
							action: elem.action,
							params: mParam,
							ngForm: ngForm
						});
						
						if (mParam.prevent === true){
							return;
						}
						
						if (angular.isString( sConfirmMsg )){
							bConfirm = confirm( sConfirmMsg );
							
							if (bConfirm === false){
								return;
							}
						}

						/*
						$.get(elem.action, mParam, function(data){
							var response = {
								data: $.parseJSON(data)
							};
							
							var mResult;
							console.log("data", data);
							try{
								if (bManual === false){
									mResult = response.data.result;
									
									if (mResult === undefined){
										throw "ngAsyncform: manual attribute is undefined (=auto). but cannot found 'result' from response's data. please check xhr response data.";
									}
									
									if (mResult.msg){
										if (scope.cache.has( mResult.redirect ) === false){
											alert( mResult.msg );
											scope.cache.put( mResult.redirect, "-", 1000 );
										}
									}
									if (mResult.redirect){
										if (mResult.redirect === "@back"){
											history.back();
										}
										else{
											$location.path( mResult.redirect );
										}
										
										return;
									}
								}
							}
							catch(e){
								if (console){
									console.log( e );
								}
							}
							
							scope.$broadcast( name, {
								form: elem,
								action: elem.action,
								params: mParam,
								ngForm: ngForm,
								response: response
							});
						});*/
						//$.getJSON
						//console.log(elem.action + "------------" + JSON.stringify(mParam));
						sUrlWithParam = elem.action + util.serializeParams(mParam);
						
						if (bUseCache && scope.cache.has(sUrlWithParam)){
							scope.$broadcast( name, {
								form: elem,
								action: elem.action,
								params: mParam,
								ngForm: ngForm,
								response: scope.cache.get(sUrlWithParam)
							});
							
							return;
						}
						
						scope.lqPut();
						scope.$http({
							method: elem.method.toUpperCase(),
							url: elem.action,
							params: mParam
						})
						.then(function(response){
							var mResult, sMsg = "";
							
							try{
								scope.lqGet();
								if (bManual === false){
									mResult = response.data.result;
									
									if (mResult === undefined){
										throw "ngAsyncform: manual attribute is undefined (=auto). but cannot found 'result' from response's data. please check xhr response data.";
									}
									
									if (mResult.msg){
										if (scope.cache.has( mResult.redirect ) === false){
											
											scope.$timeout(function(){
											
												alert( mResult.msg );
											}, 10);
											scope.cache.put( mResult.redirect, "-", 1000 );
										}
									}
									if (mResult.redirect !== ""){
										if (mResult.redirect === "@back"){
											history.back();
										}
										else{
											$location.path( mResult.redirect );
										}
										
										return;
									}
								}
							}
							catch(e){
								if (console){
									console.log( e );
								}
							}
							
							if (bUseCache){
								scope.cache.put(sUrlWithParam, response, iCacheTime);
							}
							
							scope.$broadcast( name, {
								form: elem,
								action: elem.action,
								params: mParam,
								ngForm: ngForm,
								response: response
							});
						}, function(response, a, b){
							if (response.code === 12){
								var xhr = new XMLHttpRequest();
								console.log("retry");
								xhr.onreadystatechange = function(){
									//console.log("xhr.result===" + );
									//console.log("xhr.readyState=" + xhr.readyState);
									//console.log("xhr.status=" + xhr.status);
									if ((xhr.readyState == 4) && xhr.status == 200) {
										scope.lqGet();
										scope.$timeout(function(){
											//console.log("success?" + xhr.responseText);
											try{
												scope.$broadcast( name, {
													form: elem,
													action: elem.action,
													params: mParam,
													ngForm: ngForm,
													response: {data: JSON.parse(xhr.responseText)}
												});
											}
											catch(e){
												//console.log("e*******" + e);
												scope.$broadcast( name + ".fail", {
													form: elem,
													action: elem.action,
													params: mParam,
													ngForm: ngForm,
													response: e + "\r\n" + xhr.responseText
												});
											}
										}, 100);
										
									}
									else if(xhr.readyState == 404){
										scope.lqGet();
										scope.$broadcast( name + ".fail", {
											form: elem,
											action: elem.action,
											params: mParam,
											ngForm: ngForm,
											response: xhr.responseText
										});
									}
								};
								
								xhr.open("GET", elem.action + util.serializeParams( mParam ), true);
								xhr.send();
								
								return;
							}
							scope.lqGet();
							scope.$broadcast( name + ".fail", {
								form: elem,
								action: elem.action,
								params: mParam,
								ngForm: ngForm,
								response: response
							});
						});
				
					}
					catch(e){
						console.log(e);
					}
				};// fnDoAjaxSubmit [end]
				
				var fnOnSubmit = function(e){
					fnDoAjaxSubmit(scope, e.target, attr);
					e.preventDefault();
				}; // fnOnSubmit [end]
				
				var fnAttrObserve = function(value, scope, element, attr){
					var isAuto = value === "auto",
						element = element;//angular.element( document.getElementsByName( name ) );
					
					element.bind("submit", fnOnSubmit );
					
					if (isAuto){
						fnDoAjaxSubmit( scope, element[0], attr );
					}
					
					scope.$broadcast( name + ".ready", {
						form: {
							element: element,
							submit: function(){
								fnDoAjaxSubmit( scope, element[0], attr );
							}
						}
					});
				}; // fnAttrObserve [end]
				
				if (!name){
					throw "ngAsyncform: form element must have to name attribute!";
				}
				
				fnAttrObserve( attr.ngAsyncform, scope, element, attr );
				
				//console.log("element", element);
			}
		};
	});
	
	app.directive('ngHtml', ['$compile', function($compile) {
	    return function(scope, elem, attrs) {
	        if(attrs.ngHtml){
	            elem.html(scope.$eval(attrs.ngHtml));
	            $compile(elem.contents())(scope);
	        }
	        scope.$watch(attrs.ngHtml, function(newValue, oldValue) {
	            if (newValue && newValue !== oldValue) {
	                elem.html(newValue);
	                $compile(elem.contents())(scope);
	            }
	        });
	    };
	}]);
	
	// 출처: http://jsfiddle.net/Tentonaxe/V4axn/
	app.directive('contenteditable', ["$interval", "$timeout", "$rootScope", function($interval, $timeout, $rootScope) {
	    return {
	      restrict: 'A', // only activate on element attribute
	      require: '?ngModel', // get a hold of NgModelController
	      link: function(scope, element, attrs, ngModel) {
	      	var timer;
	      	
	        if(!ngModel) return; // do nothing if no ng-model
	
	        // Specify how UI should be updated
	        ngModel.$render = function() {
	          element.html(ngModel.$viewValue || '');
	        };
	
	        // Listen for change events to enable binding
	        element.on('blur keyup change', function() {
	          scope.$apply(read);
	        });
	        
	        $timeout(read, 500);;
	        //read(); // initialize
	
	        // Write data to the model
	        function read() {
	          var html = element.html();
	          // When we clear the content editable the browser leaves a <br> behind
	          // If strip-br attribute is provided then we strip this out
	          if( attrs.stripBr && html == '<br>' ) {
	            html = '';
	          }
	          ngModel.$setViewValue(html);
	        }
	        
	        $rootScope.$on("contenteditable.refresh", function(){
	        	read();
	        });
	      }
	    };
	}]);

    
    app.directive("ngAmchart", ["util", "amchart", function(util, amchart){
    	return {
    		restrict: "A",
    		require: "ngModel",
    		/*template: function(elem, attr){
    			return '<div id="amchart_' + attr.id + '" style="width: 100%; height: 100%;"></div>';
    		},*/
    		link: function(scope, elem, attr, ctrl){
    			var sId = attr.id,
    				sType = attr.ngAmchart || "bar",
    				sColorActive = attr.color || "#ff8844",
    				sColorDisable = attr.colorDisable || "#ebebeb",
    				sColorDist = attr.colorDist || "0.15",
    				chart;
    			
    			if (sColorActive.charAt(0) === "[" ){
    				sColorActive = JSON.parse( sColorActive );
    			}
    			
    			ctrl.$render = function() {
    				if (chart){
    					chart.destroy();
    				}
    				
    				setTimeout(function(){
    					chart = amchart.makeChart(sType, sId, sColorActive, sColorDisable, parseFloat( sColorDist ), ctrl.$modelValue);
    				}, 250);
    				
    				
    				//console.log("ctrl.event", ctrl);
    				//console.log("attr", attr);
                };
                
                scope.$on("$destroy", function(){
                	sId = undefined;
                	sType = undefined;
                	sColorActive = undefined;
                	sColorDisable = undefined;
                	sColorDist = undefined;
                	
                	if (chart){
                		chart.destroy();
                	}
                	
                	chart = undefined;
                });
    			
    			//chart = makeChart(AmCharts, sType, sId, );
    		}
    	};
    }]);
/*    
    app.directive("ngAjaxupload", function(){
    	return {
    		restrict: "A",
    		template: '<form action="{{action}}" enctype="multipart/form-data" method="post"><input type="file" accept="image/*" capture="camera" name="{{name}}"  class="hidden ng-hide"/><button type="button" ng-class="buttonClass" ng-click="onClick($event)"><i ng-class="iconClass"></i>{{buttonText}}</button></form>',
    		link: function(scope, elem, attr, ctrl){
    			scope.id			= attr.id || "ngAjaxupload";
    			scope.action 		= attr.action || "";
    			scope.name 			= attr.name || "";
    			scope.buttonClass 	= attr.buttonClass || "";
    			scope.iconClass 	= attr.iconClass || "";
    			scope.buttonText 	= attr.buttonText || "";
    			scope.jqForm 		= $(elem).find("form");
    			
    			scope.jqForm.ajaxForm({
					dataType: "json",
					
					complete: function(response, textStatus, jqXhr){
						var mRes = response.responseJSON;
						
						//console.log("complete", response);
						
						scope.$broadcast( scope.id, {
							action: scope.action,
							form: scope.jqForm,
							response: mRes,
							responseRaw: response
						});
					},
					
					error: function(jqXhr, textStatus, errorThrown){
						alert(errorThrown);
					}
				});
				
				scope.jqForm.find("input").on("change", function(event){
					scope.jqForm.submit();
				});
    			
    			scope.onClick = function($event){
    				scope.jqForm.find("input").trigger("click");
    			};
    		}
    	}
    });
*/    
    app.directive("ngBack", function(){
    	return {
    		restrict: "A",
    		link: function(scope, element, attr){
    			element.click(function(event){
    				history.back();
    				
    				return false;
    			});
    		}
    	}
    });
    
	app.directive("ngVideo", function(){
		return {
			restrict: "EA",
			template: '<video src="{{src}}"></video>',
			controller: ["$scope", function($scope){
				$scope.src = "";
			}],
			link: function(scope, element, attr){
				scope.src = attr.src;
			}
		}
	});
	
	return app;
})(angular);