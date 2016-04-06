/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
import HomeCtrl from "./components/home/home";
angular.module('qApp', ['fakeBackend', 'ngRoute'])
    /**
     *  In stead of declaring a controller externally, we now import a controller class
     *  and assign it to the appropriate name in app.ts.
     */
    .controller('HomeCtrl', HomeCtrl)
    .constant('USER_ROLES', {
        ALL: '*',
        ADMIN: 'admin',
        EMPLOYEE: 'employee'
    })
    .config(($logProvider, $routeProvider, USER_ROLES) => {
        $logProvider.debugEnabled(false);
        $routeProvider
            .when('/', {
                templateUrl: 'components/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: '$ctrl',
                access_levels: [USER_ROLES.ALL],
                title: 'Home'
            })
            .when('/login', {
                templateUrl: 'components/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: '$ctrl',
                access_levels: [USER_ROLES.ALL],
                title: 'Login'
            })
            .when('/clients', {
                templateUrl: 'components/client_overview/client_overview.html',
                controller: 'ClientOverviewCtrl',
                controllerAs: '$ctrl',
                access_levels: [USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN],
                title: 'Clients overview'
            })
            .when('/clients/:id', {
                templateUrl: 'components/client_detail/client_detail.html',
                controller: 'ClientDetailCtrl',
                controllerAs: '$ctrl',
                access_levels: [USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN],
                title: 'Client detail'
            })
            .when('/reset', {
                controller: function () {
                    window.localStorage.clear();
                    location.reload(true);
                },
                template: 'reset..',
                access_levels: [USER_ROLES.ADMIN],
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($rootScope, $location, UserService) {
        $rootScope.$on('$routeChangeStart',
            function (evt, next, curr) {
                if(!UserService.authenticate(next.access_levels)) {
                    if (!!UserService.getUser()) {
                        alert('Not authorized');
                        $location.path('/');
                    } else {
                        $location.path('/');
                    }
                }
            })
    });