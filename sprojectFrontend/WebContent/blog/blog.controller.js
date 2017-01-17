(function () {
    'use strict';

    angular
        .module('app')
        .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope','BlogService','$location', '$rootScope'];
    function BlogController($scope,BlogService,$location,$routeParams,$rootScope) {
    	 var vm = this;

         vm.blog = null;
         vm.allBlogs = [];
         vm.getBlog = getBlog;
         vm.fetchAllBlogs = fetchAllBlogs;
         vm.createBlog = createBlog;
         vm.updateBlog = updateBlog;
         vm.submit = submit;
         vm.edit = edit;
         vm.remove = remove;
         vm.reset = reset;

         vm.fetchAllBlogs();
         
         function getBlog(id){
        	   console.log(">>Getting Blog:"+id)
        	    BlogService.getBlog(id)
        	       .then(
        	                      function(d) {
        	                          vm.blog=d;
        	                          $location.path('/viewblog');
        	                      },
        	                      function(errResponse){
        	                          console.error('Error while fetching Blogs');
        	                      }
         );
         };
        	    
        	    
         function fetchAllBlogs(){
        	  	   BlogService.fetchAllBlogs()
        	    	       .then(
        	    	                      function(d) {
        	    	                          console.log('inside fetch function')
        	    	                          vm.allBlog=d;
        	    	                          console.log(vm.allBlog);
        	    	                      },
        	    	                      function(errResponse){
        	    	                          console.error('Error while fetching Blogs');
        	    	                      }
         );
         };    	         
        
        function createBlog(blog){
        	    	BlogService.createBlog(blog)
        	    	    	       .then(
        	    	    	                      vm.fetchAllBlogs,
        	    	    	                      function(errResponse){
        	    	    	                          console.error('Error while creating Blog.');
        	    	    	                      }
        );
        };        	    	    	 
       
        function updateBlog(blog, id){
            	   BlogService.updateBlog(blog, id)
           	    	       .then(
           	                      vm.fetchAllBlogs,
           	                      function(errResponse){
            	                          console.error('Error while updating Blog.');
           	    	                      }
        ); 
        };       	    	     

        function submit() {
           	    	   console.log('Saving New Blog', vm.blog); 
           	    	   console.log($rootScope.currentUser);
           	    	   vm.blog.user=$rootScope.currentUser;
           	    	   vm.createBlog(vm.blog);

           	    	vm.reset();
           	    	};

       function edit(id) {
           	    	   console.log('Id to be edited', id); 
           	    	   for(var i=0;i<vm.allBlogs.length;i++){
           	    	      if(vm.allBlogs[i].id === id) {
           	    	          vm.blog = angular.copy(vm.allBlogs[i]);
           	    	           break;
           	    	          }
           	    	   }
       };
           	    	

       function remove(id) {
           	    	   console.log('Id to be deleted', id); 
           	    	      if(vm.blog.id === id) {
           	    	          vm.reset();
           	    	          }
           	    	    vm.deleteBlog(id);
        };

       function reset(){
           	    	      vm.blog={};
           	    	      $scope.myForm.$setPristine();
        };
}