"use strict";angular.module("starscreamBootstrapApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("starscreamBootstrapApp").service("baseUrlService",[function(){this.GetBaseUrl=function(){var a="";return-1!=window.location.host.indexOf("localhost")&&(a="http://localhost:8080"),a}}]),angular.module("starscreamBootstrapApp").controller("MainCtrl",["$scope","baseUrlService",function(a,b){a.projectname="",a.getStarscream=function(){if(""==a.projectname.trim())return void toastr.error("You must enter a project name");if(-1!=a.projectname.toLowerCase().indexOf("starscream"))return void toastr.error("Starscream is not a valid project name");a.projectname=a.projectname.replace(" ","");var c=/^[a-zA-Z]$/;if(c.test(a.projectname)){var d=b.GetBaseUrl(),e=d+"/getStarscream?projectname="+a.projectname.trim().replace(" ","");window.location=e,toastr.success("Happy Coding!")}else toastr.error("Invalid project name!")}}]);