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

        $scope.projectname = '';

        $scope.getStarscream = function(){

            if($scope.projectname.trim() == ''){
                toastr.error('You must enter a project name');
                return;
            }

            if($scope.projectname.toLowerCase().indexOf('starscream') != -1){
                // we currently don't support projects with starscream inside their name < :( >
                toastr.error('Starscream is not a valid project name');
                return;
            }

            $scope.projectname = $scope.projectname.replace(' ', '');

            var regex = /^[a-zA-Z]+$/;

            if(regex.test($scope.projectname)){
                var url = baseUrlService.GetBaseUrl();
                var downloadLink = url + '/getStarscream?projectname='+$scope.projectname.trim().replace(' ','');

                window.location = downloadLink;
                toastr.success('Happy Coding!');
            }
            else{
                toastr.error('Invalid project name!');
            }
        }
  }]);
