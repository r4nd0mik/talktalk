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