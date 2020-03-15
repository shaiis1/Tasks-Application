'use strict';

/**
 * @ngdoc function
 * @name tasksAppApp.controller:createTaskController
 * @description
 * # createTaskController
 * Controller of the tasksAppApp
 */

angular.module('tasksAppApp').controller('createTaskController', function ($scope, $http, $uibModalInstance, isEditMode, updateTask, taskType) {
  $scope.init = function () {
    $scope.isTitleValid = false;
    $scope.isDescValid = false;
    $scope.isSeverityValid = false;
    $scope.taskType = 0 // 0 == Time, 1 == Severity
    $scope.startDate = '';
    $scope.selectedStartDate = '';
    $scope.selectedEndDate = '';
    $scope.severities = getSeverities();
    
    $scope.saveTaskDetails = {
      type: 0,
      Title: '',
      Description: '',
      Severity: 1,
      StartDate: '',
      EndDate: ''
    };
    if (isEditMode) {
      $scope.taskType = taskType;
      initTaskParams();
    }
  };

  $scope.today = function () {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function (date, mode) {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  };

  $scope.toggleMin = function () {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.appliedOnChanged = function (type) {
    $scope.taskType = type;
  };

  $scope.getTitle = function(){
    if (!isEditMode)
      return 'Create New Task';
    else
      return 'Edit Task';
  };

  function initTaskParams() {
    $scope.saveTaskDetails = updateTask;

  };

  function checkIfTaskValid() {
    if ($scope.saveTaskDetails.Title.length == 0 || $scope.saveTaskDetails.Description.length == 0) {
      alert('You must insert Title and Description!');
      return false;
    }
    if (($scope.saveTaskDetails.StartDate != '' && $scope.saveTaskDetails.EndDate != '') ||
      ($scope.saveTaskDetails.StartDate._d != null && $scope.saveTaskDetails.EndDate != null))
    {
      var start = new Date($scope.saveTaskDetails.StartDate);
      var end = new Date($scope.saveTaskDetails.EndDate);
      if (start > end) {
        alert('start Date must be greater than End Date');
        return false;
      }
      else
        return true;
    }
    else
      return true;
  };

  function getSeverities() {
    var arr = [];
    arr.push({ value: "Low", selected: false, id: 1 });
    arr.push({ value: "Medium", selected: false, id: 2 });
    arr.push({ value: "High", selected: false, id: 3 });
    arr.push({ value: "Red", selected: false, id: 4 });
    return arr;
  };

  $scope.close = function () {
    $uibModalInstance.close(null);
  };

  $scope.save = function () {
    debugger
    if (checkIfTaskValid()) {
      if (!isEditMode) {
        $scope.saveTaskDetails.StartDate = $scope.saveTaskDetails.StartDate._d === 'undefined' || $scope.saveTaskDetails.StartDate == null ? '' : $scope.saveTaskDetails.StartDate._d;
        $scope.saveTaskDetails.EndDate = $scope.saveTaskDetails.EndDate._d === 'undefined' || $scope.saveTaskDetails.EndDate == null ? '' : $scope.saveTaskDetails.EndDate._d;
      }
      else {
        $scope.saveTaskDetails.StartDate =  $scope.saveTaskDetails.StartDate == null ? '' : $scope.saveTaskDetails.StartDate;
        $scope.saveTaskDetails.EndDate =  $scope.saveTaskDetails.EndDate == null ? '' : $scope.saveTaskDetails.EndDate;
      }
        $scope.saveTaskDetails.type = $scope.taskType;
      var request = {};
      request = $scope.saveTaskDetails;

      $uibModalInstance.close(request);
    }
  };


  $scope.init();
})
