/*
 * angular: 500tech's simple-calendar
 * 원본출처: https://github.com/500tech/angular-simple-calendar
 * 수정내역:
 * - Div - inline-block layout을 table로 변경
 * - 각 cell day 마다 status class 정보 추가
 * - 달(Month) 선택기 옵션 useSimpleMonth 추가 및 관련 기능 추가
 */
angular.module('500tech.simple-calendar', []).directive('simpleCalendar', function () {
  return {
    restrict: 'E',
    scope: {
      options: '=?',
      events: '=?'
    },
    template: '<div class="simple-calendar calendar" ng-class="{\'simple-month\': allowedSimpleMonth()}">' +
      '<div class="current-month">' +
	      '<div class="move-month prev-month" ng-click="prevMonth()">' +
		      '<span class="prev" ng-class="{active: allowedPrevMonth()}">&#x2039;</span>' +
	      '</div>' +
	      '<span>{{ selectedMonth }}</span>' +
	      '&nbsp;' +
	      '<span>{{ selectedYear }}</span>' +
	      '<div class="move-month next-month" ng-click="nextMonth()">' +
	  	    '<span class="next" ng-class="{active: allowedNextMonth()}">&#x203a;</span>' +
	      '</div>' +
      '</div>' +
      '<ul class="legend" ng-hide="allowedSimpleMonth()">' +
      	'<li class="legend-item" ng-repeat="legend in legends track by $index" ng-class="\'status\' + $index">{{ legend }}</li>' +
      '</ul>' +
      '<table ng-hide="allowedSimpleMonth()">' +
	      '<thead><tr>' +
	      	'<th ng-repeat="day in weekDays(options.dayNamesLength) track by $index" class="weekday" ng-class="{sun: $index == 0, sat: $index == 6}">{{ day }}</th>' +
	      '</tr></thead>' +
	      '<tbody>' +
		      '<tr ng-repeat="week in weeks track by $index" class="week">' +
			      '<td class="day"' +
			      'ng-class="{default: isDefaultDate(date), event: date.event, disabled: date.disabled || !date}"' +
			      'ng-repeat="date in week  track by $index"' +
			      'ng-click="onClick(date)">' +
			      '<div class="day-number" ng-class="\'status\' + getStatus(date.event)">{{ date.day || "&nbsp;" }}</div>' +
			      '<div class="event-title">{{ date.event.title || "&nbsp;" }}</div>' +
			      ' </td>' +
		      '</tr>' +
	      '</tbody>' +
      '</table>' +
	'</div>',
    controller: ['$scope', function ($scope) {
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var calculateSelectedDate, calculateWeeks, allowedDate, bindEvent;

      $scope.options = $scope.options || {};
      $scope.options.dayNamesLength = $scope.options.dayNamesLength || 1;
      
      //console.log("option.legends", $scope.legends);

      $scope.onClick = function (date) {
        if (!date || date.disabled) { return; }
        if (date.event) {
          $scope.options.eventClick(date);
        } else {
          $scope.options.dateClick(date);
        }
      };

      if ($scope.options.minDate) {
        $scope.options.minDate = new Date($scope.options.minDate);
      }

      if ($scope.options.maxDate) {
        $scope.options.maxDate = new Date($scope.options.maxDate);
      }

      bindEvent = function (date) {
        if (!date || !$scope.events) { return; }
        $scope.events.forEach(function(event) {
          event.date = new Date(event.date);
          if (date.year === event.date.getFullYear() && date.month === event.date.getMonth() && date.day === event.date.getDate()) {
            date.event = event;
          }
        });
      };

      allowedDate = function (date) {
        if (!$scope.options.minDate && !$scope.options.maxDate) {
          return true;
        }
        var currDate = new Date([date.year, date.month + 1, date.day]);
        if ($scope.options.minDate && (currDate < $scope.options.minDate)) { return false; }
        if ($scope.options.maxDate && (currDate > $scope.options.maxDate)) { return false; }
        return true;
      };
      
      $scope.allowedSimpleMonth = function(){
      	try{
      		return ($scope.options.useSimpleMonth === true);
      	}
      	catch(e){}
      	
      	return false;
      };

      $scope.allowedPrevMonth = function () {
        var prevYear = null;
        var prevMonth = null;
        if (!$scope.options.minDate) { return true; }
        var currMonth = MONTHS.indexOf($scope.selectedMonth);
        if (currMonth === 0) {
          prevYear = ($scope.selectedYear - 1);
        } else {
          prevYear = $scope.selectedYear;
        }
        if (currMonth === 0) {
          prevMonth = 11;
        } else {
          prevMonth = (currMonth - 1);
        }
        if (prevYear < $scope.options.minDate.getFullYear()) { return false; }
        if (prevYear === $scope.options.minDate.getFullYear()) {
          if (prevMonth < $scope.options.minDate.getMonth()) { return false; }
        }
        return true;
      };

      $scope.allowedNextMonth = function () {
        var nextYear = null;
        var nextMonth = null;
        if (!$scope.options.maxDate) { return true; }
        var currMonth = MONTHS.indexOf($scope.selectedMonth);
        if (currMonth === 11) {
          nextYear = ($scope.selectedYear + 1);
        } else {
          nextYear = $scope.selectedYear;
        }
        if (currMonth === 11) {
          nextMonth = 0;
        } else {
          nextMonth = (currMonth + 1);
        }
        if (nextYear > $scope.options.maxDate.getFullYear()) { return false; }
        if (nextYear === $scope.options.maxDate.getFullYear()) {
          if (nextMonth > $scope.options.maxDate.getMonth()) { return false; }
        }
        return true;
      };

      calculateWeeks = function () {
        $scope.weeks = [];
        var week = null;
        var daysInCurrentMonth = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth) + 1, 0).getDate();
        for (var day = 1; day < daysInCurrentMonth + 1; day += 1) {
          var dayNumber = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), day).getDay();
          week = week || [null, null, null, null, null, null, null];
          week[dayNumber] = {
            year: $scope.selectedYear,
            month: MONTHS.indexOf($scope.selectedMonth),
            day: day
          };

          if (allowedDate(week[dayNumber])) {
            if ($scope.events) { bindEvent(week[dayNumber]); }
          } else {
            week[dayNumber].disabled = true;
          }

          if (dayNumber === 6 || day === daysInCurrentMonth) {
            $scope.weeks.push(week);
            week = undefined;
          }
        }
      };

      calculateSelectedDate = function () {
        if ($scope.options.defaultDate) {
          $scope.options._defaultDate = new Date($scope.options.defaultDate);
        } else {
          $scope.options._defaultDate = new Date();
        }

        $scope.selectedYear  = $scope.options._defaultDate.getFullYear();
        $scope.selectedMonth = MONTHS[$scope.options._defaultDate.getMonth()];
        $scope.selectedDay   = $scope.options._defaultDate.getDate();
        calculateWeeks();
      };

      $scope.weekDays = function (size) {
        return WEEKDAYS.map(function(name) { return name.slice(0, size) });
      };

      $scope.isDefaultDate = function (date) {
        if (!date) { return; }
        return date.year === $scope.options._defaultDate.getFullYear() &&
          date.month === $scope.options._defaultDate.getMonth() &&
          date.day === $scope.options._defaultDate.getDate()
      };
      
      $scope.getStatus = function (event){
      	if (!event) { return ""; }
      	if (event.status === undefined) { return ""; }
      	
      	return event.status;
      };

      $scope.prevMonth = function () {
        if (!$scope.allowedPrevMonth()) { return; }
        var currIndex = MONTHS.indexOf($scope.selectedMonth),
        	iMonth;
        if (currIndex === 0) {
          $scope.selectedYear -= 1;
          $scope.selectedMonth = MONTHS[11];
          iMonth = 12;
        } else {
          $scope.selectedMonth = MONTHS[currIndex - 1];
          iMonth = currIndex;
        }
        
        if ($scope.allowedSimpleMonth() === false){
        	calculateWeeks();
        }
        
        try{
        	$scope.options.monthClick({
        		year: $scope.selectedYear,
        		month: iMonth,
        		monthEng: $scope.selectedMonth
        	})
        }catch(e){}
      };

      $scope.nextMonth = function () {
        if (!$scope.allowedNextMonth()) { return; }
        var currIndex = MONTHS.indexOf($scope.selectedMonth),
        	iMonth;
        if (currIndex === 11) {
          $scope.selectedYear += 1;
          $scope.selectedMonth = MONTHS[0];
          iMonth = 1;
        } else {
          $scope.selectedMonth = MONTHS[currIndex + 1];
          iMonth = currIndex + 2;
        }
        if ($scope.allowedSimpleMonth() === false){
        	calculateWeeks();
        }
        
        try{
        	$scope.options.monthClick({
        		year: $scope.selectedYear,
        		month: iMonth,
        		monthEng: $scope.selectedMonth
        	})
        }catch(e){}
      };

      $scope.$watch('options.defaultDate', function() {
        calculateSelectedDate();
      });

      $scope.$watch('events', function() {
        calculateWeeks();
      });

    }], //controller [end]
    
    link: function(scope, element, attr){
    	try{
    		var aLegends = scope.$eval(attr.legends);
	    	
	    	if (aLegends){
	    		scope.legends = aLegends;
	    	}
	    	else{
	    		scope.legends = scope.legends || [];
	    	}
    	}
    	catch(e){}
    }
  };
});