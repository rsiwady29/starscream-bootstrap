'use strict';

/**
 * @ngdoc function
 * @name starscreamBootstrapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the starscreamBootstrapApp
 */
angular.module('starscreamBootstrapApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
