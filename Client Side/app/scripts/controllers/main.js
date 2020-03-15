'use strict';

/**
 * @ngdoc function
 * @name tasksAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tasksAppApp
 */
angular.module('tasksAppApp')
  .controller('MainCtrl', function ($scope, $http, $window, $uibModal, taskServices) {
    $scope.init = function () {
      $scope.timeTasks = null;
      $scope.severityTasks = null;
      $scope.isEditMode = false;
    };

    $scope.getTimeTasks = function () {
      var promise = taskServices.GetTimeTasks();
      promise.then(function (response) {
        if (response.data != null)
          $scope.timeTasks = response.data;
      }, function (error) {
        alert(error.data.Message);
      })
    };

    $scope.getSeverity = function (task) {
      var sev = '';
      switch (task.Severity) {
        case 1:
          sev = "Low";
          break;
        case 2:
          sev = "Medium";
          break;
        case 3:
          sev = "High";
          break;
        case 4:
          sev = "Red";
          break;
      }
      return sev;
    };

    $scope.getSeverityTasks = function () {
      var promise = taskServices.GetSeverityTasks();
      promise.then(function (response) {
        if (response.data != null)
          $scope.severityTasks = response.data;
      }, function (error) {
        alert(error.data.Message);
      });
    };

    $scope.deleteTask = function (task, type) {
      var promise = taskServices.DeleteTask(task, type);
      promise.then(function (response) {
        if (response.statusText == "OK") {
          alert('Delete Task Success');
          $scope.getTimeTasks();
          $scope.getSeverityTasks();
          $window.location.reload();
        }
      }, function (error) {
          alert(error.data.Message);
        });
    };

    $scope.addNewTask = function () {
      $scope.isEditMode = false;
      $scope.openModal(null);
    };

    $scope.updateTask = function (task, type) {
      debugger
      $scope.isEditMode = true;
      $scope.openModal(task, type);
    };

    $scope.openModal = function (updateTask, type) {
      var modalInstance = $uibModal.open({
        templateUrl: '/views/modals/createTaskManager.html',
        controller: 'createTaskController',
        scope: $scope,
        backdrop: 'static',
        resolve:
        {
          isEditMode: function () {
            return $scope.isEditMode;
          },
          updateTask: function () {
            return updateTask;
          },
          taskType: function () {
            return type;
          }
        }
      }).result.then(function (request) {
        if (request != null) {
          debugger
          if (!$scope.isEditMode) {
            var promise = taskServices.AddTask(request);
            promise.then(function (response) {
              if (response.data != null) {
                alert('Task has been added succesfully');
                $window.location.reload();
              }
            }, function (error) {
              alert(error.data.Message);
            });
          }
          else {
            var promise = taskServices.EditTask(request);
            promise.then(function (response) {
              if (response.data != null) {
                alert('Task has been updated succesfully');
                $window.location.reload();
              }
            }, function (error) {
                alert(error.data.Message);
                $window.location.reload();
            }
            );
          }
        }
      });
    };

    $scope.init();
    $scope.getTimeTasks();
    $scope.getSeverityTasks();
  })
