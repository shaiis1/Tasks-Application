'use strict';

/**
 * @ngdoc function
 * @name tasksAppApp.Service:TaskServices
 * @description
 * # createTaskController
 * Controller of the tasksAppApp
 */


var app = angular.module('tasksAppApp');

app.service('taskServices', function ($http, $window) {

  this.AddTask = function (request) {
    if (request.type == 0) {
      return $http({
        method: 'POST',
        url: 'http://localhost:44312/time/add',
        data: request
      });
    }
    else {
      return $http({
        method: 'POST',
        url: 'http://localhost:44312/severity/add',
        data: request
      });
    }
  };

  this.DeleteTask = function (task, type) {
    if (type == 0) {
      return $http({
        method: 'POST',
        url: 'http://localhost:44312/time/delete',
        data: task
      });
    }
    else {
      return $http({
        method: 'POST',
        url: 'http://localhost:44312/severity/delete',
        data: task
      });
    }
  };

  this.EditTask = function (request) {
    debugger
    if (request.type == 0) {
      return $http({
        method: 'POST',
        url: 'http://localhost:44312/time/update',
        data: request
      });
    }
    else {
      return $http({
        method: 'POST',
        url: 'http://localhost:44312/severity/update',
        data: request
      });
    }
  };

  this.GetTimeTasks = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:44312/time/getall'
    });
  };

  this.GetSeverityTasks = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:44312/severity/getall'
    });
  };
})
