(function () {
    'use strict';
    console.log('inside authentication service')
    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

        	console.log('AuthService: inside Login method inside service')
            $http.post('http://localhost:9086/sprojectRest/user/authenticate', { username: username, password: password })
                .then(function (res) {
					$rootScope.currentUser={userId: res.data.userId,
							firstName: res.data.firstName,
							lastName: res.data.lastName,
							username: res.data.username,
							password: res.data.password,
							role: res.data.role};
					
                	var response={success:true};
                    callback(response);
                });

        }

        function SetCredentials(username, password) {
            
        	
            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentUser;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('currentUser', $rootScope.currentUser, { expires: cookieExp });
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('currentUser');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }


})();
