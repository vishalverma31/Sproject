(function () {
    'use strict';
    console.log('inside login controller')
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
        	console.log('inside login controller')
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
            	console.log(response.success)
                if (response.success) {
                	console.log(vm.username+'  '+vm.password);
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
