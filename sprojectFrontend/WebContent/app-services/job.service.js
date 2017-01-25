(function () {
    'use strict';

    angular
        .module('app')
        .factory('JobService', JobService);

    JobService.$inject = ['$http','$q','$rootScope'];
    function JobService($http,$q,$rootScope) {
        var BASE_URL='http://localhost:9080/sprojectRest';
        var service = {};

        service.getAllJobs = getAllJobs;
        service.getJobDetails = getJobDetails;
        service.postAJob = postAJob;
        service.applyForJob = applyForJob;

        return service;
        
        function getAllJobs() {
            return $http.get(BASE_URL+'/job/')
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('JobService: Error getting all the Jobs');
                           return $q.reject(errResponse);
                       }
                 );
        }
        
        function getJobDetails(jobId) {
            return $http.get(BASE_URL+'/job/'+jobId)
              .then(
                      function(response){
					       console.log('JobService: Job details:'+response.data.title);
						   
						   $rootScope.selectedJob=response.data;
						   						   
                           return response.data;
                        },
                      function(errResponse){
                           console.error('JobService: Error while getting the Job Details');
                           return $q.reject(errResponse);
                       }
                   );
        }
        
        function postAJob(job) {
            return $http.post(BASE_URL+'/job/', job)
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('JobService: Error while posting the Job');
                           return $q.reject(errResponse);
                       }
                 );
            }
        
        function applyForJob(jobId) {
            return $http.post(BASE_URL+'/applyForJob/'+jobId)
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('JobService: Error while applying for the Job');
                           return $q.reject(errResponse);
                       }
                 );
            }
        
}

})();