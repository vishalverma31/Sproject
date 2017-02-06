(function () {
    'use strict';

    angular
        .module('app')
        .factory('EventService', EventService);

    EventService.$inject = ['$http','$q','$rootScope'];
    function EventService($http,$q,$rootScope) {
        var BASE_URL='http://localhost:9080/sprojectRest';
        var service = {};

        service.fetchAllEvents = fetchAllEvents;			//Done
        service.fetchAllJoinedEvents = fetchAllJoinedEvents;//Done
                
        service.getEvent = getEvent;						//Done
        service.joinEvent = joinEvent;						//Done
                
        service.postEvent = postEvent;						//Done
        
        return service;
		
		function fetchAllEvents() {
        	console.log("EService: fetchAllEvents")
            return $http.get(BASE_URL+'/event/')
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('EService: Error fetching All Events');
                           return $q.reject(errResponse);
                       }
                 );
            }
        
        function fetchAllJoinedEvents() {
        	console.log("EService: fetchAllJoinedEvents")
            return $http.get(BASE_URL+'/event/joined')
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('EService: Error fetching All Joined Events');
                           return $q.reject(errResponse);
                       }
                 );
            }
        
        function postEvent(event) {
          console.log("EService: postEvent")
            return $http.post(BASE_URL+'/event/', event)
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('EService: Error posting Event');
                           return $q.reject(errResponse);
                       }
                 );
        }
		
		function getEvent(id) {
        	   console.log("EService: getEvent")
            return $http.get(BASE_URL+'/event/'+id)
              .then(
                      function(response){
                    	   $rootScope.selectedEvent=response.data;
                           return response.data;
                        },
                      function(errResponse){
                           console.error('EService: Error while getting the Event');
                           return $q.reject(errResponse);
                       }
                   );
            }
           
           function joinEvent(id) {
        	   console.log("EService: joinEvent")
               return $http.get(BASE_URL+'/joinEvent/'+id)
                 .then(
                         function(response){
                       	   return response.data;
                           },
                         function(errResponse){
                              console.error('BService: Error while getting the Blog');
                              return $q.reject(errResponse);
                          }
                      );
               }
			

}

})();