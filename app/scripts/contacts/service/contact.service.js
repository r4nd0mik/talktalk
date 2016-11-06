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

