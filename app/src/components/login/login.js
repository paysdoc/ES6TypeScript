angular.module('qApp').controller('LoginCtrl', function (UserService, USER_ROLES, $location) {
    this.login = function (ROLE) {
        if(!USER_ROLES[ROLE]) return;
        UserService.login(ROLE);
        $location.path('/');
    };
});