(function () {
    'use strict';

    angular
        .module('app')
        .controller('FriendController', FriendController);

    FriendController.$inject = ['UserService', '$location', '$scope', 'FriendService','$rootScope'];
    function FriendController(UserService, $location, $scope, FriendService, $rootScope) {
        var vm = this;
		
		vm.friend=null;
		vm.friends=[];
		vm.user=null;
		vm.users=[];
		vm.friendRequests=[];
		
		vm.sendFriendRequest=sendFriendRequest;
		vm.acceptFriendRequest=acceptFriendRequest;
		vm.rejectFriendRequest=rejectFriendRequest;
		vm.updateFriendRequest=updateFriendRequest;
		
		vm.getMyFriends=getMyFriends;
		vm.deleteFriend=deleteFriend;
		
		vm.fetchAllUsers=fetchAllUsers;
		
		fetchAllUsers();
		getMyFriends();
		getMyFriendRequests();
		
		function getMyFriends(){
			console.log("Getting my friends")
			FriendService.getMyFriends()
					.then(
							function(d){
								vm.friends=d;
								console.log("Got the friend list")
							},function(errResponse){
									console.error('Error while fetching friends')
							}
					
					);
		}
		
		function getMyFriendRequests(){
			console.log("Getting my friendRequests")
			FriendService.getMyFriendRequests()
					.then(
							function(d){
								vm.friendRequests=d;
								console.log("Got the friendRequests")
							},function(errResponse){
									console.error('Error while fetching friendRequests')
							}
					
					);
		}
		
		function updateFriendRequest(friend, id){
			console.log("=>FCtrl: updateFriendRequest()")
			FriendService.updateFriendRequest(friend, id)
				.then(
						fetchAllFriends
						,function(errResponse){
									console.error('Error while updating friendRequests')
							}
				
					);
			
		}
		
		function acceptFriendRequest(friendId){
			console.log("=>acceptFriendRequest:"+friendId)
			FriendService.acceptFriendRequest(friendId)
				.then(
						function(d) {
						vm.friend= d;
						getMyFriendRequests();
						alert("friend Request Accepted")
						},function(errResponse){
							console.error('Error while sending friend Request ')
					});
						
		}
		
		function rejectFriendRequest(friendId){
			console.log("=>rejectFriendRequest:"+friendId)
			FriendService.rejectFriendRequest(friendId)
				.then(
						function(d) {
						vm.friend= d;
						getMyFriendRequests();
						alert("friend Request Rejected")
						},function(errResponse){
							console.error('Error while sending friend Request ')
					});
						
		}
		
		function fetchAllUsers(){
			UserService.GetAllExceptCurrent()
			.then(
					function(d){
						vm.users=d;
					}, function(errResponse){
							console.error('Error while fetching Users')
					});
		}
		
		function deleteFriend(id){
			FriendService.deleteFriend(id)
				.then(
						fetchAllFriends,
						function(errResponse){
							console.error('Error while Deleting Friend')
					});
		
		}

}

})();