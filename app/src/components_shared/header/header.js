angular.module('qApp').directive('qHeader', function () {
    return {
        restrict: 'E',
        bindToController: {
            backUrl: '@'
        },
        templateUrl: 'components_shared/header/header.html',
        controllerAs: 'header',
        controller: function ($route, $location, UserService) {
            this.title = $route.current.title;
            this.user = UserService.getUser();
            this.goBack = function () {
                $location.path(this.backUrl);
            };
            this.logout = function () {
                UserService.logout();
            };
        }
    }
});