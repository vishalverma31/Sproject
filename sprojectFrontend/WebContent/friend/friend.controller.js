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
		//vm.updateFriendRequest=updateFriendRequest;
		
		vm.getMyFriends=getMyFriends;
		vm.deleteFriend=deleteFriend;
		
		vm.fetchAllUsers=fetchAllUsers;
		vm.startPrivateChat=startPrivateChat;
		
		fetchAllUsers();
		getMyFriends();
		getMyFriendRequests();
		
		function getMyFriends(){
			console.log("=>FCtrl: Getting my friends")
			FriendService.getMyFriends()
					.then(
							function(d){
								vm.friends=d;
								console.log("=>FCtrl: Got the friend list")
							},function(errResponse){
									console.error('=>FCtrl: Error while fetching friends')
							}
					
					);
		}
		
		function getMyFriendRequests(){
			console.log("=>FCtrl: Getting my friendRequests")
			FriendService.getMyFriendRequests()
					.then(
							function(d){
								vm.friendRequests=d;
								console.log("=>FCtrl: Got the friendRequests")
							},function(errResponse){
									console.error('=>FCtrl: Error while fetching friendRequests')
							}
					
					);
		}
		
		/*function updateFriendRequest(friend, id){
			console.log("=>FCtrl: updateFriendRequest()")
			FriendService.updateFriendRequest(friend, id)
				.then(
						fetchAllFriends
						,function(errResponse){
									console.error('=>FCtrl: Error while updating friendRequests')
							}
				
					);
			
		}*/
		
		function acceptFriendRequest(friendId){
			console.log("=>FCtrl: acceptFriendRequest:"+friendId)
			FriendService.acceptFriendRequest(friendId)
				.then(
						function(d) {
						vm.friend= d;
						getMyFriendRequests();
						alert("friend Request Accepted")
						},function(errResponse){
							console.error('=>FCtrl: Error while sending friend Request ')
					});
						
		}
		
		function rejectFriendRequest(friendId){
			console.log("=>FCtrl: rejectFriendRequest:"+friendId)
			FriendService.rejectFriendRequest(friendId)
				.then(
						function(d) {
						vm.friend= d;
						getMyFriendRequests();
						alert("friend Request Rejected")
						},function(errResponse){
							console.error('=>FCtrl: Error while sending friend Request ')
					});
						
		}
		
		function fetchAllUsers(){
			UserService.GetAllExceptCurrent()
			.then(
					function(d){
						vm.users=d;
					}, function(errResponse){
							console.error('=>FCtrl: Error while fetching Users')
					});
		}
		
		function deleteFriend(id){
			FriendService.deleteFriend(id)
				.then(
						fetchAllFriends,
						function(errResponse){
							console.error('=>FCtrl: Error while Deleting Friend')
					});
		
		}
		
		function startPrivateChat(friendName)
		{
		  console.log("=>FCtrl: Start Private Chat:"+friendName)
		  $rootScope.friendName=friendName;
		  alert("Private Chat Started");
		  $location.path("/privatechat")
		} 

}

})();