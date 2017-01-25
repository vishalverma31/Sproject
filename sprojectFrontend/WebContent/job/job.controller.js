(function () {
    'use strict';

    angular
        .module('app')
        .controller('JobController', JobController);

    JobController.$inject = ['$scope','JobService','$location', '$rootScope'];
    function JobController($scope,JobService,$location,$rootScope) {
    	 var vm = this;
         vm.job = null;
         vm.jobs = [];
         
		 vm.getJobDetails = getJobDetails;
         vm.getAllJobs = getAllJobs;
         vm.applyForJob = applyForJob;
		 
         vm.submitJob = submitJob;
         vm.resetJob = resetJob;
         
         console.log('UserName in JobCtrl:'+$rootScope.currentUser);
		 
         getAllJobs();
		 
         function getAllJobs(){
  	  	   JobService.getAllJobs()
  	    	       .then(
  	    	                      function(d) {
  	    	                          console.log('JobCtrl: inside fetch function')
  	    	                          vm.jobs=d;
  	    	                          console.log(vm.jobs);
  	    	                      },
  	    	                      function(errResponse){
  	    	                          console.error('JobCtrl: Error while fetching all Jobs');
  	    	                      });
            }
         
         function getJobDetails(jobId){
      	   console.log(">>Getting Job with ID:"+jobId)
      	    JobService.getJobDetails(jobId)
      	       .then(
      	                      function(d) {
      	                          vm.job=d;
      	                          $location.path('/jobdetails');
      	                      },
      	                      function(errResponse){
      	                          console.error('JobCtrl: Error while fetching job details');
      	                      });
            }
         
         function postAJob(job){
 	    	JobService.postAJob(job)
 	    	    	       .then(
 	    	    	                      function(d){
											  alert("You successfully posted the Job")
											  },
 	    	    	                      function(errResponse){
 	    	    	                          console.error('JobCtrl: Error while posting the Job.');
 	    	    	                      });
            }
         
         function applyForJob(jobId){
        	    console.log("applyForJob")
        		var currentUser=$rootscope.currentUser;
        		console.log("currentUser's id:"+currentUser.userId)
        		
        		if(typeof currentUser.userId=='undefined'){
        		     alert("Please login to apply for Job")
        			 console.log("JobCtrl: User not logged in..Can't Apply")
        			 $location.path('/login');
        		}

        		console.log("JobCtrl: UserId:"+currentUser.userId+ "applying For Job:"+jobId)
        		
        		JobService.applyForJob(jobId)
        		    .then(
        			        function(d){
        					vm.job=d;
        					alert("JobCtrl: You have successfully applied for job")
        					},
        					function(errResponse){
        	 	    	    console.error('JobCtrl: Error while applying the Job.');
        	 	    	    }
        				);
        }
         
         function submitJob() {
 	    	   console.log('JobCtrl: Saving New Job', vm.job); 
 	    	   postAJob(vm.job);

 	    	vm.reset();
 	    	}
         
         function resetJob(){
 	    	      vm.user={};
 	    	      $scope.myJobForm.$setPristine();
            }

}

})();
