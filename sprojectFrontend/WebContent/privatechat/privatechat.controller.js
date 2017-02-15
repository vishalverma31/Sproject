angular
        .module('app')
        .controller('PrivateChatController', function($scope,PrivateChatService) {
    	 $scope.pmessages=[];
		 $scope.pmessage= "";
		 $scope.max = 140;
		 
		 $scope.sortTime = function(message) {
			    var date = new Date(message.time);
			    return date;
			};
		 
		 $scope.addPrivateMessage = function() {
			console.log("PChatCtrl: addMessage")
			PrivateChatService.send($scope.pmessage);
			$scope.pmessage="";
			};
			
			PrivateChatService.receive().then(null,null,function(pmessage) {
			    console.log("PChatCtrl: receive")
				$scope.pmessages.push(pmessage);
			});
});