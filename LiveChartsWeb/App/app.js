﻿'use strict';

var app = angular.module("liveChartsApp", [
    'ngRoute', 'ngSanitize', 'ngAnimate'
]).config([
    '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        //Documentation
        $routeProvider.when('/documentation/:version?/:section', {
            templateUrl: '/App/Views/docs.html',
            controller: 'docsController'
        });
        $routeProvider.when('/docnotfound', {
            templateUrl: '/App/Views/docchanged.html'
        });

        //Examples
        $routeProvider.when('/examples/:version?/:platform/:article', {
            templateUrl: '/App/Views/examples.html',
            controller: 'examplesController'
        });
        $routeProvider.when('/articlenotfound', {
            templateUrl: '/App/Views/articlechanged.html'
        });

        //Otherwise
        $routeProvider.otherwise('/examples/wpf/start', {
            templateUrl: '/App/Views/home.html',
            controller: 'homeController'
        });
    }
]).factory('menuService', ['$rootScope', function ($rootScope) {

    var service = {
        model: {
            isSmall: false
        },

        SaveState: function() {
            sessionStorage.userService = angular.toJson(service.model);
        },

        RestoreState: function () {

            service.model = angular.fromJson(sessionStorage.userService) || service.model;
        }
    };

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}]);;