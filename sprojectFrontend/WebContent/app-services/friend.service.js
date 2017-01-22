(function () {
    'use strict';

    angular
        .module('app')
        .factory('FriendService', FriendService);

    FriendService.$inject = ['$http'];
    function FriendService($http) {
        var service = {};
        var BASE_URL='http://localhost:9080/sprojectRest';
        
        service.getMyFriends=getMyFriends;
        service.getMyFriendRequests=getMyFriendRequests;
        service.updateFriendRequest=updateFriendRequest;
        service.acceptFriendRequest=acceptFriendRequest;
        service.rejectFriendRequest=rejectFriendRequest;
        service.deleteFriend=deleteFriend;
        
        return service;
    
    }   
})();