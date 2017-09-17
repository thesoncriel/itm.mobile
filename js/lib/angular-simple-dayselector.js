(function(angular){
angular.module("day-selector", []).directive("daySelector", function(){
	var undefined;
	
	return {
		restrict: "E",
		scope: {
			options: "=?",
			events: "=?"
		},
		template: function(elem, attr){
			var sInnerTemplate = elem.text();
			
			if (!sInnerTemplate){
				sInnerTemplate = "{{year}} {{month}} {{day}} {{weekday}}";
			}
			
			return '<div class="simple-day-selector day-selector simple-calendar">' +
				'<div class="current-day current-month">' +
					'<span class="move-month prev-month" ng-click="prev()"><span class="prev" ng-class="{active: allowedPrev()}">&#x2039;</span></span>' +
					'<span>' + sInnerTemplate + '</span>' +
					'<span class="move-month next-month" ng-click="next()"><span class="next" ng-class="{active: allowedNext()}">&#x203a;</span></span>' +
				'</div>' +
			'</div>';
		},
		controller: ["$scope", function($scope){
/************************************************************************************
INNER METHODS
************************************************************************************/
/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber(d, dont) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    
    var iMonth = d.getMonth(),
    	prevMonthWeek = 0,
    	iWeekNoMonth = weekNo;
    
    if (!dont){
		prevMonthWeek = getWeekNumber( new Date( d.getFullYear(), d.getMonth(), 0 ), true );
		
		if (d.getMonth() === 0){
			iWeekNoMonth = weekNo;
		}
		else if (weekNo === prevMonthWeek){
			prevMonthWeek = getWeekNumber( new Date( d.getFullYear(), d.getMonth() - 1, 0 ), true );
			iWeekNoMonth = weekNo - prevMonthWeek;
		}
		else{
			iWeekNoMonth = weekNo - prevMonthWeek;
		}
	}
	else{
		return weekNo;
	}
	
	// Return array of year and week number
    return [weekNo, iWeekNoMonth];
}
/************************************************************************************
LOCAL VARIABLES
************************************************************************************/
			var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      		var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
/************************************************************************************
LOCAL METHODS
************************************************************************************/
      		var allowedDate = function (date) {
		        if (!$scope.options.minDate && !$scope.options.maxDate) {
		          return true;
		        }
		        var currDate = new Date([date.year, date.month + 1, date.day]);
		        if ($scope.options.minDate && (currDate < $scope.options.minDate)) { return false; }
		        if ($scope.options.maxDate && (currDate > $scope.options.maxDate)) { return false; }
		        return true;
		      };
		      
		    var calculateSelectedDate = function (weekInfo) {
		    	var mWeekInfo = weekInfo;
		    	
		        $scope.year = mWeekInfo.year;
		        $scope.month = mWeekInfo.monthEng;
		        $scope.day = mWeekInfo.day;
		        $scope.weekday = mWeekInfo.weekday;
		        $scope.weekno = mWeekInfo.weeksMonth;
		        $scope.selectedDate = mWeekInfo.date;
		    };
		      
		    var initSelectedDate = function(){
		    	var mWeekInfo;
		    	
		    	if ($scope.options.defaultDate) {
		          $scope.options._defaultDate = new Date($scope.options.defaultDate);
		        } else {
		          $scope.options._defaultDate = new Date();
		        }
		        
		        $scope.selectedDate = $scope.options._defaultDate;
		        mWeekInfo = getWeekInfoCase( $scope.options.type, $scope.selectedDate );
				calculateSelectedDate(mWeekInfo);
		    };
		      
		    var getMaxDay = function (date){
		    	var date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		    	
		    	return date.getDate();
		    };
		    
		    var addDate = function (date, inc){
		    	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + inc);
		    };
		    
		    var dateFormat = function (date){
		    	var iMonth = date.getMonth() + 1,
		    		iYear = date.getFullYear(),
		    		iDay = date.getDate(),
		    		sMonth = (iMonth < 10)? "0" + iMonth : iMonth,
		    		sDay = (iDay < 10)? "0" + iDay : iDay;
		    	
		    	return iYear + "-" + sMonth + "-" + sDay;
		    };
		    
		    var getWeekInfo = function (date, startDay, inc){
		    	var dateCurr = date,
		    		iInc = inc || 0,
		    		iStartDay = startDay || 0,
		    		iCurrDay,
		    		dateStart,
		    		dateEnd,
		    		aWeekNo,
		    		mRet
		    		;
		    	
		    	try{
		    		iInc = parseInt( iInc );
		    		
		    		if (iInc === NaN){
		    			throw "inc is not number.";
		    		}
		    	}catch(e){}
		    	
		    	if (iInc !== 0){
		    		dateCurr = addDate( date, iInc * 7 );
		    	}
		    	
		    	iCurrDay = dateCurr.getDay();
		    	dateStart = addDate( dateCurr, (-1 * iCurrDay) + iStartDay );
		    	dateEnd = addDate( dateCurr, 6 - iCurrDay + iStartDay );
		    	aWeekNo = getWeekNumber( dateCurr );
		    	
		    	mRet = {
		    		year:		dateCurr.getFullYear(),
		    		month:		dateCurr.getMonth() + 1,
		    		monthEng:	MONTHS[ dateCurr.getMonth() ],
		    		day:		dateCurr.getDate(),
		    		weekday:	WEEKDAYS[ dateCurr.getDay() ],
		    		date: 		dateCurr,
		    		start: 		dateStart,
		    		startStr: 	dateFormat( dateStart ),
		    		end:		dateEnd,
		    		endStr: 	dateFormat( dateEnd ),
		    		weeksYear:	aWeekNo[0],
		    		weeksMonth:	aWeekNo[1]
		    	};
		    	
		    	console.log("getWeekInfo", mRet);
		    	console.log("startStr", mRet.startStr);
		    	console.log("endStr", mRet.endStr);
		    	
		    	return mRet
		    };
		    
		    var getWeekInfoCase = function(type, datePrev, addDirection){
		    	var date,
		        	iAddDirection = addDirection || 0,
		        	mWeekInfo;
		        
		        switch(type){
		        	case "day":
		        		date = addDate( datePrev, iAddDirection );
		        		mWeekInfo = getWeekInfo( date, 1 );
		        		break;
		        	case "week":
		        		date = datePrev;
		        		mWeekInfo = getWeekInfo( date, 1, iAddDirection );
		        		break;
		        	case "month":
		        		date = new Date( datePrev.getFullYear(), datePrev.getMonth() + iAddDirection, 1 );
		        		mWeekInfo = getWeekInfo( date, 1 ); 
		        }
		        
		        return mWeekInfo;
		    };
		    
		    var getNextDate = function(type, currDate, direction){
		    	var iDir = direction || 1,
		    		iYear = currDate.getFullYear(),
		    		iMonth = currDate.getMonth(),
		    		iDate = currDate.getDate();
		    	
		    	switch(type){
		    		case "day":
		    			return new Date( iYear, iMonth, iDate + (1 * iDir) );
		    			break;
		    		case "week":
		    			return new Date( iYear, iMonth, iDate + (7 * iDir) );
		    			break;
		    		case "month":
		    			return new Date( iYear, iMonth + (1 * iDir), 1 );
		    			break;
		    	}
		    	
		    	return currDate;
		    };
/************************************************************************************
SCOPE METHODS
************************************************************************************/
      		$scope.allowedPrev = function () {
		        if (!$scope.options.minDate || !$scope.selectedDate) { return true; }

		        var prevDate = getNextDate( $scope.options.type, $scope.selectedDate, -1 ),
		        	minDate = $scope.options.minDate;
		        
		        return prevDate.getTime() > minDate.getTime();
		      };
		
		      $scope.allowedNext = function () {
		      	if (!$scope.options.maxDate || !$scope.selectedDate) { return true; }
		      	
		        var nextDate = getNextDate( $scope.options.type, $scope.selectedDate, 1 ),
		        	maxDate = $scope.options.maxDate;
		        
		        return nextDate.getTime() < maxDate.getTime();
		      };
		      
		    $scope.prev = function () {
		        if (!$scope.allowedPrev()) { return; }
		        
		        var mWeekInfo = getWeekInfoCase( $scope.options.type, $scope.selectedDate, -1 );
		        
		        calculateSelectedDate(mWeekInfo);

		        try{
		        	$scope.options.click( mWeekInfo );
		        }catch(e){}
		      };
		
		      $scope.next = function () {
		        if (!$scope.allowedNext()) { return; }
		        
		        var mWeekInfo = getWeekInfoCase( $scope.options.type, $scope.selectedDate, 1 );
		        
		        calculateSelectedDate(mWeekInfo);

		        try{
		        	$scope.options.click( mWeekInfo );
		        }catch(e){}
		      };
/************************************************************************************
SCOPE MEMBERS
************************************************************************************/
      		$scope.options = $scope.options || {};
      		
      		if ($scope.options.minDate){
      			$scope.options.minDate = new Date( $scope.options.minDate );
      		}
      		if ($scope.options.maxDate){
      			$scope.options.maxDate = new Date( $scope.options.maxDate );
      		}
      		if (!$scope.options.type || $scope.options.type === "date"){
      			$scope.options.type = "day";
      		}
      		
      		$scope.$watch('options.defaultDate', function() {
		    	initSelectedDate();
		    });
      		
		}] // controller [end]
		
	};
});
})(angular);