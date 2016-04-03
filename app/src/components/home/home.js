angular.module('qApp').controller('HomeCtrl', function ($scope, $location, UserService) {
    $scope.user = UserService.getUser();
    $scope.showList = function () {
        $location.path('clients');
    };
    $scope.showLogin = function () {
        $location.path('login');
    };
    $scope.reset = function () {
        $location.path('reset');
    };
});