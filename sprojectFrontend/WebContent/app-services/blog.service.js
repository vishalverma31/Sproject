(function () {
    'use strict';

    angular
        .module('app')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['$http','$q','$rootScope'];
    function BlogService($http,$q,$rootScope) {
        var BASE_URL='http://localhost:9086/sprojectRest';
        var service = {};

        service.fetchAllBlogs = fetchAllBlogs;
        service.fetchNewBlogs = fetchNewBlogs;
        service.fetchAllBlogComments = fetchAllBlogComments;
        
        service.getBlog = getBlog;
        service.approveBlog = approveBlog;
        service.rejectBlog = rejectBlog;
        
        service.createBlog = createBlog;
        service.createBlogComment = createBlogComment;
        service.deleteBlog = deleteBlog;

        return service;
        
        function createBlogComment(blogComment,blogId) {
      	  console.log("BService: create BlogComment")
          return $http.post(BASE_URL+'/addComment/'+blogId,blogComment)
            .then(
                    function(response){
                         return response.data;
                      },
                    function(errResponse){
                         console.error('BService: Error creating the BlogComment');
                         return $q.reject(errResponse);
                     }
               );
          }
        
        function fetchAllBlogComments(blogId) {
        	console.log("BService: fetchAllBlogComments")
            return $http.get(BASE_URL+'/blogComment/'+blogId)
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('BService: Error fetching all BlogComments');
                           return $q.reject(errResponse);
                       }
                 );
            }
        
        function fetchAllBlogs() {
        	console.log("BService: fetchAllBlogs")
            return $http.get(BASE_URL+'/blog/')
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('BService: Error fetching all Blogs');
                           return $q.reject(errResponse);
                       }
                 );
            }
        
        function fetchNewBlogs() {
        	console.log("BService: fetchNewBlogs")
            return $http.get(BASE_URL+'/blog/new')
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('BService: Error fetching all New Blogs');
                           return $q.reject(errResponse);
                       }
                 );
            }
        
           function createBlog(blog) {
        	  console.log("BService: create Blog")
            return $http.post(BASE_URL+'/blog/', blog)
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('BService: Error creating the Blog');
                           return $q.reject(errResponse);
                       }
                 );
            }
           
           function deleteBlog(id) {
        	   console.log("BService: Delete Blog")
            return $http.delete(BASE_URL+'/blog/'+id)
              .then(
                      function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('BService: Error while deleting Blog');
                           return $q.reject(errResponse);
                       }
                 );
            }
           
           function getBlog(id) {
        	   console.log("BService: getBlog")
            return $http.get(BASE_URL+'/blog/'+id)
              .then(
                      function(response){
                    	   
                    	  $rootScope.selectedBlog=response.data;
                    	    return response.data;
                        },
                      function(errResponse){
                           console.error('BService: Error while getting the Blog');
                           return $q.reject(errResponse);
                       }
                   );
            }
           
           function approveBlog(id) {
        	   console.log("BService: ApproveBlog")
               return $http.get(BASE_URL+'/approveblog/'+id)
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
           
          function rejectBlog(id) {
        	  console.log("BService: RejectBlog")
               return $http.get(BASE_URL+'/rejectblog/'+id)
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