angular.module('qApp').controller('ClientDetailCtrl', function ($routeParams, $location, ClientService, UserService) {
    if(isNaN($routeParams.id)) {
        $location.path('clients');
        return;
    }
    /**
     *  Update related functions.
     */
    this.descriptionHasChanged = function () {
        return this.localClient.description != this.client.description;
    };
    this.undoDescription = function () {
        this.localClient.description = this.client.description;
    };
    this.nameHasChanged = function () {
        return this.localClient.firstName != this.client.firstName || this.localClient.lastName != this.client.lastName;
    };
    this.undoName = function () {
        this.localClient.firstName = this.client.firstName;
        this.localClient.lastName = this.client.lastName;
    };
    var self = this;
    this.update = function () {
        this.updateActionsPerformed++;
        ClientService.update(angular.merge(this.client, this.localClient)).then(function (client) {
            self.client = client;
        });
    };

    /**
     *  Init related functions.
     */
    var genericDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper dui ac hendrerit consequat. Donec gravida semper velit nec blandit. Nulla facilisis in est sit amet finibus.';
    this.client = {};
    this.localClient = {};
    this.user = UserService.getUser();
    this.updateActionsPerformed = 0;

    function setClient(client) {
        client.description = client.description || genericDescription;
        self.client = client;
        self.localClient = angular.copy(client);
    }
    function init() {
        ClientService.getById($routeParams.id).then(function (res) {
            var client = res.data;
            setClient(client);
        }, function () {
            $location.path('clients');
        });
    }
    init();
});