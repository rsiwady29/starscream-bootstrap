'use strict';

/**
 * @ngdoc function
 * @name starscreamBootstrapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the starscreamBootstrapApp
 */
angular.module('starscreamBootstrapApp')
  .controller('MainCtrl', ['$scope', 'starscreamService', function ($scope,starscreamService) {

        $scope.getStarscream = function(){
            starscreamService.downloadStarscream($scope.projectname)
                .success(function(){
                    alert('Downloading starscream');
                })
                .error(function(err){
                    console.log(err);
                });
        };
  }]);
