(function () {
    'use strict';

    angular
        .module('app')
        .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope','BlogService','$location', '$rootScope'];
    function BlogController($scope,BlogService,$location,$rootScope) {
    	 var vm = this;

         vm.blog = null;
         vm.allBlogs = [];
         vm.getBlog = getBlog;
         vm.fetchAllBlogs = fetchAllBlogs;
         
         vm.updateBlog = updateBlog;
         vm.blogSubmit = blogSubmit;
         vm.edit = edit;
         vm.remove = remove;
         vm.blogReset = blogReset;
         
         console.log('UserName in Blog Ctrl:'+$rootScope.currentUser);

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
        	                          console.error('BCtrl: Error while fetching the Blog');
        	                      }
         );
         }
        	    
        	    
         function fetchAllBlogs(){
        	  	   BlogService.fetchAllBlogs()
        	    	       .then(
        	    	                      function(d) {
        	    	                          console.log('BCtrl: inside fetchAllBlogs function')
        	    	                          vm.allBlogs=d;
        	    	                          console.log(vm.allBlogs);
        	    	                      },
        	    	                      function(errResponse){
        	    	                          console.error('BCtrl: Error while fetching All Blogs');
        	    	                      }
         );
         }    	         
        
        function createBlog(blog){
        	    	BlogService.createBlog(blog)
        	    	    	       .then(
        	    	    	                      vm.fetchAllBlogs,
        	    	    	                      function(errResponse){
        	    	    	                          console.error('BCtrl: Error while creating Blog.');
        	    	    	                      }
        );
        }        	    	    	 
       
        function updateBlog(blog, id){
            	   BlogService.updateBlog(blog, id)
           	    	       .then(
           	                      vm.fetchAllBlogs,
           	                      function(errResponse){
            	                          console.error('BCtrl: Error while updating Blog.');
           	    	                      }
        ); 
        }       	    	     

        function blogSubmit() {
           	    	   console.log('BCtrl: Saving New Blog', vm.blog); 
           	    	   console.log($rootScope.currentUser);
           	    	   vm.blog.user=$rootScope.currentUser;
           	    	   createBlog(vm.blog);

           	    	vm.blogReset();
       }

       function edit(id) {
           	    	   console.log('BCtrl: Id to be edited', id); 
           	    	   for(var i=0;i<vm.allBlogs.length;i++){
           	    	      if(vm.allBlogs[i].id === id) {
           	    	          vm.blog = angular.copy(vm.allBlogs[i]);
           	    	           break;
           	    	          }
           	    	   }
       }
           	    	

       function remove(id) {
           	    	   console.log('BCtrl: Id to be deleted', id); 
           	    	      if(vm.blog.id === id) {
           	    	          vm.reset();
           	    	          }
           	    	    vm.deleteBlog(id);
        }

       function blogReset(){
           	    	      vm.blog={};
           	    	      $scope.myBlogForm.$setPristine();
        }
}

})();