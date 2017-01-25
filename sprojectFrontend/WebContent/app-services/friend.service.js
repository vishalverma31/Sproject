(function () {
    'use strict';

    angular
        .module('app')
        .factory('FriendService', FriendService);

    FriendService.$inject = ['$http'];
    function FriendService($http) {
        var service = {};
        var BASE_URL='http://localhost:9080/sprojectRest';
        
        service.getMyFriends=getMyFriends;               //done
        service.getMyFriendRequests=getMyFriendRequests; //done
        service.sendFriendRequest=sendFriendRequest;     //done
        service.updateFriendRequest=updateFriendRequest; 
        service.acceptFriendRequest=acceptFriendRequest; //done
        service.rejectFriendRequest=rejectFriendRequest; //done
        service.deleteFriend=deleteFriend;
        
        return service;
        
        function sendFriendRequest(friendId){
            return $http.get(Base_URL+'/addFriend/'+friendId)
                    .then(
                                 function(response){
                                            return response.data;
                                 }, function(errResponse) {
                                     console.error('Error while creating friend');
                                     return $q.reject(errResponse);
                                 }
                             );
        }
        
        function getMyFriends(){
            return $http.get(Base_URL+'/myFriends/')
                    .then(
                                 function(response){
                                            return response.data;
                                 }, null
                         );
        }
        
        function getMyFriendRequests(){
            return $http.get(Base_URL+'/getMyFriendRequests/')
                    .then(
                                 function(response){
                                            return response.data;
                                 }, null
                         );
        }
        
        function acceptFriendRequest(friendId){
            return $http.get(Base_URL+'/acceptFriend/'+friendId)
                    .then(
                                 function(response){
                                            return response.data;
                                 }, function(errResponse) {
                                     console.error('Error while adding friend');
                                     return $q.reject(errResponse);
                                 }
                             );
        }
        
        function rejectFriendRequest(friendId){
            return $http.get(Base_URL+'/rejectFriend/'+friendId)
                    .then(
                                 function(response){
                                            return response.data;
                                 }, function(errResponse) {
                                     console.error('Error while rejecting friend');
                                     return $q.reject(errResponse);
                                 }
                             );
        }
        
    }   
})();