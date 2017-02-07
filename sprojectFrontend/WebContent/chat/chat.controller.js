angular
        .module('app')
        .controller('ChatController', function($scope,ChatService) {
    	 $scope.messages=[];
		 $scope.message= "";
		 $scope.max = 140;
		 
		 $scope.addMessage = function() {
			console.log("ChatCtrl: addMessage")
			ChatService.send($scope.message);
			$scope.message="";
			};
			
			ChatService.receive()
			  .then(null,null,function(message) {
			    console.log("ChatCtrl: receive")
				$scope.messages.push(message);
			    });
});