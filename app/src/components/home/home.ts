export default class HomeCtrl{

    static $inject:[string] = ['$scope', '$location', 'UserService'];

    private $location:ng.ILocationService;
    private UserService;

    public user:string;

    constructor($scope, $location, UserService) {
        this.$location = $location;
        this.UserService = UserService;
        this.user = this.UserService.getUser();
        
        $scope.showList = function () {
            $location.path('clients');
        };
        $scope.showLogin = function () {
            $location.path('login');
        };
        $scope.reset = function () {
            $location.path('reset');
        };
    }
}