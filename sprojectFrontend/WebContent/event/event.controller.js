(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventController', EventController);

    EventController.$inject = ['$scope','EventService','$location', '$rootScope'];
    function EventController($scope,EventService,$location,$rootScope) {
    	 var vm = this;

         vm.event = null;
         vm.joinevent=null;
		 vm.allEvents=[];
		 vm.allJoinedEvents=[];
		 
		 vm.eventSubmit=eventSubmit;      				//Done
		 vm.eventReset=eventReset;						//Done
		 
		 vm.getEvent=getEvent;							//Done
		 vm.joinEvent=joinEvent;						//Done
		 vm.fetchAllEvents=fetchAllEvents;				//Done
		 vm.fetchAllJoinedEvents=fetchAllJoinedEvents;	//Done
		 
		 console.log('UserName in Event Ctrl:'+$rootScope.currentUser);
		 
		 vm.fetchAllEvents();
		 vm.fetchAllJoinedEvents();
		 
		 function getEvent(id){
        	   console.log(">>ECtrl: Getting Event:"+id)
        	    EventService.getEvent(id)
        	       .then(
        	                      function(d) {
        	                          vm.event=d;
        	                          $location.path('/viewevent');
        	                      },
        	                      function(errResponse){
        	                          console.error('ECtrl: Error while fetching the Blog');
        	                      }
         );
         }
		 
		 function joinEvent(id){
			console.log("=>ECtrl: joining Event:"+id)
			EventService.joinEvent(id)
				.then(
						function(d) {
						vm.event= d;
						fetchAllJoinedEvents();
						alert("You have joined the Event")
						},function(errResponse){
							console.error('=>ECtrl: Error while joining Event')
					});
						
		}
		 
		 function fetchAllEvents(){
        	 console.log(">>ECtrl: fetching All Events")
        	  	   EventService.fetchAllEvents()
        	    	       .then(
        	    	                      function(d) {
        	    	                          console.log('ECtrl: inside fetchAllEvents function')
        	    	                          vm.allEvents=d;
        	    	                          console.log(vm.allEvents);
        	    	                      },
        	    	                      function(errResponse){
        	    	                          console.error('ECtrl: Error while fetching All Events');
        	    	                      }
        	    	       		);
         }
         
         function fetchAllJoinedEvents(){
        	 console.log(">>ECtrl: fetching All Joined Events")
					EventService.fetchAllJoinedEvents()
							.then(
  	    	                      function(d) {
  	    	                          console.log('ECtrl: inside fetchAllJoinedEvents function')
  	    	                          vm.allJoinedEvents=d;
  	    	                          console.log(vm.allJoinedEvents);
  	    	                      },
  	    	                      function(errResponse){
  	    	                          console.error('ECtrl: Error while fetching All New Events');
  	    	                      }
  	    	            );
         }
		 
		 function eventSubmit() {
        	
           	    	   console.log('ECtrl: Saving New Event', vm.event); 
           	    	   console.log($rootScope.currentUser);
           	    	   vm.event.createdBy=$rootScope.currentUser;
           	    	   vm.event.eventDescription=document.getElementById("eventDescription").value;
					   vm.event.eventTitle=document.getElementById("eventTitle").value;
					   
					   postEvent(vm.event);

           	    	vm.eventReset();
		}
		
		function postEvent(event){
        	console.log(">>ECtrl: post Event")
        	    	EventService.postEvent(event)
        	    	    	       .then(
        	    	    	                      vm.fetchAllEvents,
        	    	    	                      function(errResponse){
        	    	    	                          console.error('ECtrl: Error while posting Event.');
        	    	    	                      }
        );
        }
		
		function eventReset(){
    	   console.log(">>ECtrl: Reset Event Form")
           	    	      vm.event={};
           	    	      $scope.myEventForm.$setPristine();
        }
		 
}

})();