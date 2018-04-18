var App = angular.module('App', ['ngRoute']);


App.config(function($routeProvider){
    $routeProvider.when('/admin', {
        controller: 'linkLists',
        templateUrl: 'views/linkLists.html'
    })
    .when('/admin/dashboard', {
        controller: 'linkLists',
        templateUrl: 'views/linkLists.html'
    })
    .when('/admin/createlink', {
        controller: 'createLinkController',
        templateUrl: 'views/createlink.html'
    })
    .when('/admin/updatelink/:id', {
        controller: 'updateLinkController',
        templateUrl: 'views/updatelink.html'
    })
    .when('/admin/manageuser', {
        controller: 'userController',
        templateUrl: 'views/users.html'
    })
    .when('/admin/settings', {
        controller: 'settingsController',
        templateUrl: 'views/settings.html'
    })
    .otherwise({
        redirectTo: '/admin/dashboard'
    });
});
