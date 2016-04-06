export default class HomeCtrl{

    static $inject:[string] = ['$location', 'UserService'];

    private $location:ng.ILocationService;
    private UserService;

    public user:string;

    constructor( $location, UserService) {
        this.$location = $location;
        this.UserService = UserService;
        this.user = this.UserService.getUser();
    }
    showList():void {
        this.$location.path('clients');
    }
    showLogin() {
       this.$location.path('login');
    }
    reset() {
        this.$location.path('reset');
    }
}