'use strict';

/**
 * @ngdoc function
 * @name tasksAppApp.directive:datePicker
 * @description
 * # createTaskController
 * Controller of the tasksAppApp
 */


var app = angular.module('tasksAppApp');

app.directive('datepicker', function () {
  return {
    restrict: 'EA',
    templateUrl: '/views/modals/datePicker.html',
    scope: true,
    require: 'ngModel',
    link: function (scope, elm, attrib, ngModel) {
      //initialize vars
      scope.viewDate = moment();
      var selectedDate = null;

      function generateDays() {
        scope.days = [];
        var startOfselectedDate = moment.isMoment(selectedDate) ? selectedDate.clone().startOf('day') : null;
        var startDate = scope.viewDate.clone().startOf('month').startOf('week').startOf('day');
        var endDate = scope.viewDate.clone().endOf('month').endOf('week').endOf('day');

        while (startDate < endDate) {
          scope.days.push({
            lable: startDate.date(),
            inMonth: startDate.month() === scope.viewDate.month() && startDate.year() === scope.viewDate.year(),
            date: startDate.valueOf(),
            selected: startDate.isSame(startOfselectedDate)
          });
          startDate.add(1, 'day');
        }
      }

      ngModel.$parsers.push(function (value) {
        return value;
      });

      ngModel.$formatters.push(function (value) {
        if (value) {
          selectedDate = moment(value);
          scope.viewDate = selectedDate.clone();
        }
        else {
          selectedDate = null;
        }
        return selectedDate;
      });

      ngModel.$render = generateDays;

      scope.setSelectedDate = function (date) {
        var tempDate = moment(date);
        selectedDate = selectedDate ? moment(selectedDate) : moment();

        selectedDate.year(tempDate.year());
        selectedDate.month(tempDate.month());
        selectedDate.date(tempDate.date());

        generateDays();

        ngModel.$setViewValue(selectedDate);
      };

      scope.move = function (amount, unit) {
        scope.viewDate.add(amount, unit);
        generateDays();
      };
    }
  };
});
