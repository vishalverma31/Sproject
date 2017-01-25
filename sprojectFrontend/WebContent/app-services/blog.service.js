(function () {
    'use strict';

    angular
        .module('app')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['$http','$q','$rootScope'];
    function BlogService($http,$q,$rootScope) {
        var BASE_URL='http://localhost:9080/sprojectRest';
        var service = {};

        service.fetchAllBlogs = fetchAllBlogs;
        service.getBlog = getBlog;
        service.createBlog = createBlog;
       
        service.deleteBlog = deleteBlog;

        return service;
        
        function fetchAllBlogs() {
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
        
           function createBlog(blog) {
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

}

})();