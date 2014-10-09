'use strict';

/**
 * @ngdoc function
 * @name starscreamBootstrapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the starscreamBootstrapApp
 */
angular.module('starscreamBootstrapApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
