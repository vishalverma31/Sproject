angular
        .module('app')
        .controller('PrivateChatController', function($scope,PrivateChatService) {
    	 $scope.messages=[];
		 $scope.message= "";
		 $scope.max = 140;
		 
		 $scope.addPrivateMessage = function() {
			console.log("PChatCtrl: addMessage")
			PrivateChatService.send($scope.message);
			$scope.message="";
			};
			
			PrivateChatService.receive().then(null,null,function(message) {
			    console.log("PChatCtrl: receive")
				$scope.messages.push(message);
			});
});