'use strict';

/**
 * @ngdoc function
 * @name starscreamBootstrapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the starscreamBootstrapApp
 */
angular.module('starscreamBootstrapApp')
  .controller('MainCtrl', ['$scope','baseUrlService', function ($scope, baseUrlService) {

        $scope.getStarscream = function(){

            if($scope.projectname == ''){
                return;
            }

            var url = baseUrlService.GetBaseUrl();
            var downloadLink = url + '/getStarscream?projectname='+$scope.projectname;

            window.location = downloadLink;
        }
  }]);
