(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService','FlashService', '$rootScope','$location','AuthenticationService'];
    function HomeController(UserService,FlashService, $rootScope,$location,AuthenticationService) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        
        vm.deleteUser = deleteUser;
        vm.logout=logout;
        vm.makeAdmin=makeAdmin;
        vm.Update=Update;
        
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
        
        function makeAdmin(id){
        	UserService.makeAdmin(id)
        	.then(function () {
                loadAllUsers();
            });
        }
        
        function Update(user) {
            vm.dataLoading = true;
            
            UserService.Update(user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Update Successful', true);
                        $location.path('/');
                      } 
                    else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    	}
                  	}
                );
        }
        
        function logout() {
        	UserService.logout()
        	.then( function () {
        		AuthenticationService.ClearCredentials();
        		$rootScope.currentUser='';
        		$location.path("/login");
        		}, function(errResponse){
					console.error('=>HomeCtrl: Error while Logging Out')
				}
        	);
        	
        }
        
        
    }

})();
