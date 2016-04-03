angular.module('qApp').controller('ClientOverviewCtrl', function($http, ClientService, $location, UserService) {
    var self = this;
    /**
     *  Nav related function
     */
    this.navigateTo = function (client) {
        $location.path('clients/' + client.id);
    };
    /**
     *  CRUD related functions
     */
    this.add = function () {
        ClientService.create(this.client).then(function (client) {
            self.clients.push(client);
        });
    };
    this.delete = function (client) {
        ClientService.delete(client).then(function () {
            var index = self.clients.indexOf(client);
            self.clients.splice(index, 1);
        });
    };
    /**
     *  Init related functions
     */
    this.user = UserService.getUser();
    this.client = {};
    function init() {
        ClientService.get().then(function (res) {
            self.clients = res.data;
        });
    }
    init();
});