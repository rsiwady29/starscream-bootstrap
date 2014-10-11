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

            if($scope.projectname.toLowerCase().indexOf('starscream') != -1){
                // we currently don't support projects with starscream inside their name < :( >
                return;
            }

            /// TODO: Project name should only contain letters

            var url = baseUrlService.GetBaseUrl();
            var downloadLink = url + '/getStarscream?projectname='+$scope.projectname.trim().replace(' ','');

            //window.location = downloadLink;
        }
  }]);
