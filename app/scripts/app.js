'use strict';

/**
 * @ngdoc overview
 * @name talktalkTestApp
 * @description
 * # talktalkTestApp
 *
 * Main module of the application.
 */
angular
  .module('talktalkTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://www.mocky.io'
    ]);
     
      
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/contacts', {
        template: '<contacts></contacts>'
      })
      .when('/contact/edit/:contactIndex', {
        template: '<contact-manage></contact-manage>'
      })
      .when('/contact/add', {
        template: '<contact-manage></contact-manage>'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
