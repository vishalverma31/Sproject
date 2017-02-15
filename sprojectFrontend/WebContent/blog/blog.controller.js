(function () {
    'use strict';

    angular
        .module('app')
        .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope','BlogService','$location', '$rootScope'];
    function BlogController($scope,BlogService,$location,$rootScope) {
    	 var vm = this;

         vm.blog = null;
         vm.blogComment = null;
         
         vm.allBlogs = [];
         vm.allNewBlogs = [];
         vm.allBlogComments = [];
         
         vm.getBlog = getBlog;
         vm.approveBlog = approveBlog;
         vm.rejectBlog = rejectBlog;
         
         vm.fetchAllBlogs = fetchAllBlogs;
         vm.fetchNewBlogs = fetchNewBlogs;
         vm.fetchAllBlogComments = fetchAllBlogComments;
         
         vm.updateBlog = updateBlog;
         vm.blogSubmit = blogSubmit;
         vm.edit = edit;
         vm.remove = remove;
         vm.blogReset = blogReset;
         
         vm.commentSubmit=commentSubmit;
         vm.commentReset=commentSubmit;

         
         console.log('UserName in Blog Ctrl:'+$rootScope.currentUser);

         vm.fetchAllBlogs();
         vm.fetchNewBlogs();
         
         
         function getBlog(id){
        	   console.log(">>BCtrl: Getting Blog:"+id)
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
         
         function approveBlog(id){
      	   console.log(">>BCtrl: Approving Blog:"+id)
      	    BlogService.approveBlog(id)
      	       .then(
      	                      function() {
      	                    	  fetchNewBlogs();
      	                          $location.path('/listnewblogs');
      	                      },
      	                      function(errResponse){
      	                          console.error('BCtrl: Error while fetching the Blog');
      	                      }
      	       		);
         }	    
         
         function rejectBlog(id){
        	   console.log(">>BCtrl: Rejecting Blog:"+id)
        	    BlogService.rejectBlog(id)
        	       .then(
        	                      function() {
        	                    	  fetchNewBlogs();
        	                          $location.path('/listnewblogs');
        	                      },
        	                      function(errResponse){
        	                          console.error('BCtrl: Error while fetching the Blog');
        	                      }
        	       		);
           }
        	    
         function fetchAllBlogs(){
        	 console.log(">>BCtrl: fetching Approved Blogs")
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
         
         function fetchNewBlogs(){
        	 console.log(">>BCtrl: fetching New Blogs")
  	  	   BlogService.fetchNewBlogs()
  	    	       .then(
  	    	                      function(d) {
  	    	                          console.log('BCtrl: inside fetchNewBlogs function')
  	    	                          vm.allNewBlogs=d;
  	    	                          console.log(vm.allBlogs);
  	    	                      },
  	    	                      function(errResponse){
  	    	                          console.error('BCtrl: Error while fetching All New Blogs');
  	    	                      }
  	    	            );
         }
         
         function fetchAllBlogComments(blogId){
        	 console.log(">>BCtrl: fetching All Blog Comments")
        	  	   BlogService.fetchAllBlogComments(blogId)
        	    	       .then(
        	    	                      function(d) {
        	    	                          console.log('BCtrl: inside fetchAllBlogComments function')
        	    	                          vm.allBlogComments=d;
        	    	                          console.log(vm.allBlogComments);
        	    	                      },
        	    	                      function(errResponse){
        	    	                          console.error('BCtrl: Error while fetching All Blog Comments');
        	    	                      }
        	    	       		);
         }
        
        function createBlog(blog){
        	console.log(">>BCtrl: create Blog")
        	    	BlogService.createBlog(blog)
        	    	    	       .then(
        	    	    	                      vm.fetchAllBlogs,
        	    	    	                      function(errResponse){
        	    	    	                          console.error('BCtrl: Error while creating Blog.');
        	    	    	                      }
        );
        }        	    	    	 
       
        function updateBlog(blog, id){
        	console.log(">>BCtrl: update Blog")
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
           	    	   vm.blog.blogTitle=document.getElementById("blogTitle").value;
           	    	   vm.blog.blogContent=document.getElementById("blogContent").value;
           	    	   
           	    	   createBlog(vm.blog);

           	    	vm.blogReset();
       }

       function edit(id) {
    	   console.log(">>BCtrl: edit Blog")
           	    	   console.log('BCtrl: Id to be edited', id); 
           	    	   for(var i=0;i<vm.allBlogs.length;i++){
           	    	      if(vm.allBlogs[i].id === id) {
           	    	          vm.blog = angular.copy(vm.allBlogs[i]);
           	    	           break;
           	    	          }
           	    	   }
       }
           	    	

       function remove(id) {
    	   console.log(">>BCtrl: remove Blog")
           	    	   console.log('BCtrl: Id to be deleted', id); 
           	    	      if(vm.blog.id === id) {
           	    	          vm.reset();
           	    	          }
           	    	    vm.deleteBlog(id);
        }

       function blogReset(){
    	   console.log(">>BCtrl: Reset Blog Form")
           	    	      vm.blog={};
           	    	      $scope.myBlogForm.$setPristine();
        }
       
       function commentSubmit(blogId) {
       	
	    	   console.log('BCtrl: Saving New Blog Comment', vm.blogComment); 
	    	   console.log($rootScope.currentUser);
	    	   vm.blogComment.user=$rootScope.currentUser;
	    	   //vm.blogComment.blog=selectedBlog;
	    	   vm.blogComment.blogComment==document.getElementById("comment").value;
	    	   createBlogComment(vm.blogComment,blogId);

	    	vm.commentReset();
       }

       function createBlogComment(blogComment,blogId){
    	   console.log(">>BCtrl: create BlogComment")
    	BlogService.createBlogComment(blogComment,blogId)
    	    	       .then(
    	    	                      vm.fetchAllBlogComments,
    	    	                      function(errResponse){
    	    	                          console.error('BCtrl: Error while creating BlogComment.');
    	    	                      }
    	    	       		);
       }

       function commentReset(){
    	   console.log(">>BCtrl: Reset BlogComment Form")
	    	      vm.blogComment={};
	    	      $scope.myCommentForm.$setPristine();
       }
}

})();