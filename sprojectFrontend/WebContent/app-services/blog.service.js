(function () {
    'use strict';

    angular
        .module('app')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['$http','$q','$rootScope'];
    function BlogService($http) {
        var BASE_URL='http://localhost:8186/sprojectRest'
        var service = {};

        service.fetchAllBlogs = fetchAllBlogs;
        service.getBlog = getBIog;
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
                           console.error('Error fetching all Blogs');
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
                           console.error('Error creating the Blog');
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
                           console.error('Error while deleting Blog');
                           return $q.reject(errResponse);
                       }
                 );
            }
           
           function getBlog(id) {
            return $http.get(BASE_URL+'/blog/'+id)
              .then(
                        function(response){
                           return response.data;
                        },
                      function(errResponse){
                           console.error('Error while getting the Blog');
                           return $q.reject(errResponse);
                       }
                 );
            }

