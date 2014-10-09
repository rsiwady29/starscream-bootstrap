'use strict';

angular
  .module('starscreamBootstrapApp')
    .service('getStarscreamService', ['$http','baseUrlService', function($http,baseUrlService){

        var services = {};
        var url = baseUrlService.GetBaseUrl();
        
        services.downloadStarscream =  function(projectname){
            $http.get(url + '/getStarscream', {
                params: {
                    projectname: projectname
                }
            });
        };

        return services;
    }]);