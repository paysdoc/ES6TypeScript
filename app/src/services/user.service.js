angular.module('qApp').factory('UserService', function (USER_ROLES, $route) {
    var service = {};
    service.authenticate = function (access_levels) {
        return access_levels.indexOf(USER_ROLES.ALL) != -1 || access_levels.indexOf(USER_ROLES[window.localStorage.role]) != -1;
    };
    service.login = function (ROLE) {
        window.localStorage.role = ROLE;
    };
    service.logout = function () {
        window.localStorage.role = null;
        $route.reload();
    };
    service.getUser = function () {
        return USER_ROLES[window.localStorage.role];
    };
    return service;
});