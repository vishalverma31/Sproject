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
		vm.usersExceptCurrent=[];
		vm.friendRequests=[];
		
		vm.sendFriendRequest=sendFriendRequest;			//done
		vm.acceptFriendRequest=acceptFriendRequest;		//done
		vm.rejectFriendRequest=rejectFriendRequest;		//done
		//vm.updateFriendRequest=updateFriendRequest;
		
		vm.getMyFriends=getMyFriends;					//done
		vm.deleteFriend=deleteFriend;					//done
		
		vm.fetchAllUsers=fetchAllUsers;					//done
		vm.startPrivateChat=startPrivateChat;			//done
		
		fetchAllUsers();
		getMyFriends();
		getMyFriendRequests();
		
		function sendFriendRequest(friendId) {
			console.log("=>FCtrl: Sending FriendRequest:"+friendId)
			FriendService.sendFriendRequest(friendId)
				.then(
						function(d){
								vm.friend=d;
								alert("Friend Request sent")
						}, function(errResponse){
									console.error('=>FCtrl: Error while fetching friends')
							}
					);

		}

		
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
						$location.path('/friendrequest');
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
						$location.path('/friendrequest');
						},function(errResponse){
							console.error('=>FCtrl: Error while sending friend Request ')
					});
						
		}
		
		function fetchAllUsers(){
			UserService.GetAllExceptCurrent()
			.then(
					function(d){
						vm.usersExceptCurrent=d;
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