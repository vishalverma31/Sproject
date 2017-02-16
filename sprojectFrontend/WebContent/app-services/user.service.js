(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        var BASE_URL='http://localhost:9086/sprojectRest';
        service.GetAll = GetAll;
        service.GetAllExceptCurrent=GetAllExceptCurrent;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.logout = logout;
        service.makeAdmin = makeAdmin;
        service.imageUpload=imageUpload;
        
        return service;

        function imageUpload() {
            return $http.post(BASE_URL+'/rest/file/upload/')
            .then(
            		createSuccess, 
            	   handleError('UserService: Error getting all users')
            	 );
        }
        
        function GetAll() {
            return $http.get(BASE_URL+'/user/')
            .then(
            	   handleSuccess, 
            	   handleError('UserService: Error getting all users')
            	 );
        }

        function GetById(id) {
            return $http.get(BASE_URL+'/user/id/'+ id)
            .then(
            		handleSuccess, 
            		handleError('UserService: Error getting user by id')
            	 );
        }

        function GetByUsername(username) {
            return $http.get(BASE_URL+'/user/username/' + username)
            .then(
            		handleSuccess, 
            		handleError('UserService: Error getting user by username')
            	 );
        }

        function Create(user) {
            return $http.post(BASE_URL+'/user/', user)
            .then(
            		createSuccess,
            		handleError('UserService: Error creating user')
            	 );
        }

        function Update(user) {
            return $http.put(BASE_URL+'/user/', user)
            .then(
            		handleSuccess,
            		handleError('UserService: Error updating user')
            	 );
        }

        function Delete(id) {
            return $http.delete(BASE_URL+'/user/' + id)
            .then(
            		handleSuccess, 
            		handleError('UserService: Error deleting user')
            	 );
        }
        
        function GetAllExceptCurrent(){
        	return $http.get(BASE_URL+'/user/friend/')
        	.then(
        			handleSuccess,
        			handleError('UserService: Error getting all users')
        		 );
        }
        
        function logout() {
        	return $http.put(BASE_URL+'/user/logout')
        	.then(
        			null,
        			handleError('UserService: Error while Logging Out')
        		 );
        }
        
        function makeAdmin(id){
        	return $http.put(BASE_URL+'/user/makeAdmin/'+id)
        	.then(
        			handleSuccess,
        			handleError('UserService: Error while Making User, Admin')
        		 );
        }

        // private functions

        function handleLogout(res) {
        	console.log("=>UService: handleLogout- "+res)
        	return res.data;
        }
        
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
