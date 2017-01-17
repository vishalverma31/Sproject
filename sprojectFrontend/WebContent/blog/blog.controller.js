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
         



