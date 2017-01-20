(function () {
    'use strict';

    angular
        .module('app')
        .controller('JobController', JobController);

    JobController.$inject = ['$scope','JobService','$location', '$rootScope'];
    function BlogController($scope,JobService,$location,$rootScope) {
    	 var vm = this;
         vm.job = null;
         vm.jobs = [];
         
		 vm.getJobDetails = getJobDetails;
         vm.getAllJobs = getAllJobs;
         vm.applyForJob = applyForJob;
		 
         vm.submit = submit;
         vm.reset = reset;
         
         console.log('UserName in JobCtrl:'+$rootScope.currentUser);
		 
         getAllJobs();
		 
         function getAllJobs(){
  	  	   JobService.getAllJobs()
  	    	       .then(
  	    	                      function(d) {
  	    	                          console.log('inside fetch function')
  	    	                          vm.jobs=d;
  	    	                          console.log(vm.jobs);
  	    	                      },
  	    	                      function(errResponse){
  	    	                          console.error('Error while fetching Jobs');
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
      	                          console.error('Error while fetching job details');
      	                      });
            }
         
         function postAJob(job){
 	    	JobService.postAJob(job)
 	    	    	       .then(
 	    	    	                      function(d){
											  alert("You successfully posted the Job")
											  },
 	    	    	                      function(errResponse){
 	    	    	                          console.error('Error while posting the Job.');
 	    	    	                      });
            }
         
         function applyForJob(jobId){
        	    console.log("applyForJob")
        		var currentUser=$rootscope.currentUser;
        		console.log("currentUser's id:"+currentUser.userId)
        		
        		if(typeof currentUser.userId=='undefined'){
        		     alert("Please login to apply for Job")
        			 console.log("User not logged in..Can't Apply")
        			 $location.path('/login');
        		}

        		console.log("@UserId:"+currentUser.userId+ "applying For Job:"+jobId)
        		
        		JobService.applyForJob(jobId)
        		    .then(
        			        function(d){
        					vm.job=d;
        					alert("You have successfully applied for job")
        					},
        					function(errResponse){
        	 	    	    console.error('Error while applying the Job.');
        	 	    	    	                      });
        	            }
         
         function submit() {
 	    	   console.log('Saving New Job', vm.job); 
 	    	   postAJob(vm.job);

 	    	vm.reset();
 	    	}
         
         function reset(){
 	    	      vm.user={};
 	    	      $scope.myForm.$setPristine();
            }

}

})();
