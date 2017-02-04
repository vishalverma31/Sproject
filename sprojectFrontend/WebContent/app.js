(function () {
    'use strict';
console.log('inside app.js')
    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            
            //BLOG MODULE
            .when('/createblog', {
                controller: 'BlogController',
                templateUrl: 'blog/createblog.view.html',
                controllerAs: 'vm'
            })
            .when('/listblog', {
                controller: 'BlogController',
                templateUrl: 'blog/listblog.view.html',
                controllerAs: 'vm'
            })
            .when('/listnewblogs', {
                controller: 'BlogController',
                templateUrl: 'blog/listnewblogs.view.html',
                controllerAs: 'vm'
            })
            .when('/viewblog', {
                controller: 'BlogController',
                templateUrl: 'blog/showblog.view.html',
                controllerAs: 'vm'
            })
            
            //JOB MODULE
            .when('/postjob', {
                controller: 'JobController',
                templateUrl: 'job/postjob.view.html',
                controllerAs: 'vm'
            })
            .when('/searchjob', {
                controller: 'JobController',
                templateUrl: 'job/searchjob.view.html',
                controllerAs: 'vm'
            })
            .when('/jobdetails', {
                controller: 'JobController',
                templateUrl: 'job/jobdetails.view.html',
                controllerAs: 'vm'
            })
            
            //CHAT FUNCTIONALITY
            .when('/chat_forum', {
                controller: 'ChatController',
                templateUrl: 'chat/chat.view.html'
            })
            
            .when('/privatechat', {
                controller: 'PrivateChatController',
                templateUrl: 'privatechat/privatechat.view.html'
            })
            
            //FRIEND MODULE
            .when('/friendrequest', {
                controller: 'FriendController',
                templateUrl: 'friend/friendrequest.view.html',
                controllerAs: 'vm'
            })
            .when('/searchfriend', {
                controller: 'FriendController',
                templateUrl: 'friend/searchfriend.view.html',
                controllerAs: 'vm'
            })
            .when('/viewfriend', {
                controller: 'FriendController',
                templateUrl: 'friend/viewfriend.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.currentUser = $cookies.getObject('currentUser') || {};
        
        if ($rootScope.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentUser;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register','/listblog','/viewblog','/searchjob','/jobdetails']) === -1;
            console.log('Restricted Page:'+restrictedPage);
            var adminPage = $.inArray($location.path(), ['/postjob','/listnewblogs']) === 0;
            console.log('Restricted Page:'+restrictedPage);
            
            var loggedIn = $rootScope.currentUser.username;
            var role = $rootScope.currentUser.role;
            
            console.log('logged In:'+loggedIn+' ['+role+']');
            
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            else{
            	if(adminPage && role!='admin') {
            		alert('This action is restricted to the admin role only.');
            		$location.path('/login');
            	}
            	
            }
        });
    }

})();
