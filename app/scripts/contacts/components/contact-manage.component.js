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