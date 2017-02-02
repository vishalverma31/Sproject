(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$location','AuthenticationService'];
    function HomeController(UserService, $rootScope,$location,AuthenticationService) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.logout=logout;
        
        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
        
        function logout() {
        	UserService.logout()
        	.then( function () {
        		AuthenticationService.ClearCredentials();
        		$location.path("/login");
        		}, function(errResponse){
					console.error('=>HomeCtrl: Error while Logging Out')
				}
        	);
        	
        }
        
        
    }

})();
