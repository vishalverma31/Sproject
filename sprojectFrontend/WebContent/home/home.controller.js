(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService','FlashService', '$rootScope','$location','AuthenticationService','$scope'];
    function HomeController(UserService,FlashService, $rootScope,$location,AuthenticationService,$scope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.currentUserId=$rootScope.currentUser.userId;
        vm.deleteUser = deleteUser;
        vm.logout=logout;
        vm.makeAdmin=makeAdmin;
        vm.Update=Update;
        vm.loadCurrentUser=loadCurrentUser;
        vm.imageUpload=imageUpload;
        
        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }
        
        function imageUpload() {
             
            UserService.imageUpload()
                .then(function (response) {
                    if (response.success) {
                        $location.path('/updateProfile');
                      } 
                    else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    	}
                  	}
                );
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                    $scope.link = '/sprojectFrontend/resources/dp_'+vm.currentUserId+'.jpg';
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
                        
                        $location.path('/updateProfile');
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
