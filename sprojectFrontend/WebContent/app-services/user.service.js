(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        var BASE_URL='http://localhost:9080/sprojectRest';
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(BASE_URL+'/user/')
            .then(
            	   handleSuccess, 
            	   handleError('Error getting all users')
            	 );
        }

        function GetById(id) {
            return $http.get(BASE_URL+'/user/id/'+ id)
            .then(
            		handleSuccess, 
            		handleError('Error getting user by id')
            	 );
        }

        function GetByUsername(username) {
            return $http.get(BASE_URL+'/user/username/' + username)
            .then(
            		handleSuccess, 
            		handleError('Error getting user by username')
            	 );
        }

        function Create(user) {
            return $http.post(BASE_URL+'/user/', user)
            .then(
            		createSuccess,
            		handleError('Error creating user')
            	 );
        }

        function Update(user) {
            return $http.put(BASE_URL+'/user/' + user.id, user)
            .then(
            		handleSuccess,
            		handleError('Error updating user')
            	 );
        }

        function Delete(id) {
            return $http.delete(BASE_URL+'/user/' + id)
            .then(
            		handleSuccess, 
            		handleError('Error deleting user')
            	 );
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }
        
        function createSuccess(res) {
        	var res={success:true};
            return res;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
