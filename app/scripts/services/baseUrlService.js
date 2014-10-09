'use strict';

angular
  .module('starscreamBootstrapApp')
    .service('baseUrlService', [ function(){

        this.GetBaseUrl = function() {
            var baseUrl = '';
            if (window.location.host.indexOf("localhost") != -1) {
                baseUrl = 'http://localhost:8080';
            }
            return baseUrl;
        };

    }]);