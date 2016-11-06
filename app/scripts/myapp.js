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

angular.module('talktalkTestApp').component('contactManage', {
    templateUrl: '/scripts/contacts/views/contact-manage.html',
    controller: function (ContactService, $routeParams, $location) {
        this.contact = {
            name: null,
            email: null,
            avatar: null
        };

        this.$onInit = function () {
            if (!$routeParams.contactIndex) {
                this.mode = 'add';
                return;
            }

            if (ContactService.hasList()) {
                this.contact = ContactService.getContact($routeParams.contactIndex);
                // wrong index provided
                if (!this.contact) {
                    $location.path('/contacts');
                }
                this.mode = 'edit';
            } else {
                $location.path('/contacts');
            }
        };

        this.handle = function () {
           if(this.mode === 'add') {
                ContactService.addContact(this.contact);
            }
            else {
                ContactService.updateContact(this.contact, $routeParams.contactIndex);
            }
           
           $location.path('/contacts');
        };

    }
});
angular.module('talktalkTestApp').component('contacts', {
    templateUrl: '/scripts/contacts/views/contacts.html',
    controller: function (ContactService, $location) {
        var self = this;
        this.contacts = [];
        
        this.$onInit = function () {
            if(ContactService.hasList()) {
                this.contacts = ContactService.getList();
            } else {
                ContactService.requestList().then(function(response) {
                    self.contacts = response.data;
                });
            }
        };
        
        this.manageContact = function(path) {
            $location.path(path);
        };
        
    }
});
angular.module('talktalkTestApp')
        .service('ContactService', ['$http', '$q', function ($http, $q)
            {
                this.url = 'http://www.mocky.io/v2/58088826100000e9232b75b0?callback=JSON_CALLBACK';

                this.hasList = function () {
                    return localStorage.getItem("contacts");
                };

                this.getList = function () {
                    var list = localStorage.getItem("contacts");

                    if (list) {
                        return JSON.parse(localStorage.getItem("contacts"));
                    }
                };

                this.requestList = function () {
                    var defer = $q.defer();
                    return $http.jsonp(this.url, {jsonpCallbackParam: 'callback'})
                            .success(function (response) {
                                localStorage.setItem("contacts", JSON.stringify(response));
                                defer.resolve(response);
                                return defer.promise;
                            }).error(function (response) {
                        return $q.reject('Server error');
                    });
                };

                this.getContact = function (index) {
                    var list = [];
                    if (this.hasList()) {
                        list = this.getList();
                        if (!list[index]) {
                            return false;
                        }

                        return list[index];
                    }

                    return false;
                };

                this.addContact = function (contact) {
                    var list = this.getList();
                    list.push(contact);
                    localStorage.setItem("contacts", JSON.stringify(list));
                };
                
                this.updateContact = function (contact, index) {
                    var list = this.getList();
                    list[index] = contact;
                    localStorage.setItem("contacts", JSON.stringify(list));
                };


            }]);


'use strict';

/**
 * @ngdoc function
 * @name talktalkTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the talktalkTestApp
 */
angular.module('talktalkTestApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name talktalkTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the talktalkTestApp
 */
angular.module('talktalkTestApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
