/**
 * Created by rheimbach on 1/27/2016.
 */
angular.module('qApp')
/**
 *  Service that contains all client related backend communication.
 */
.service('ClientService', function ($http, $q) {
    var base = '/clients',
        self = this;
    function retrieveId(location) {
        var parts = location.split('/');
        return parts[parts.length - 1];
    }
    /**
     *  Creates remote client.
     *  Receives the location of the new created client and retrieves it from that location.
     */
    this.create = function (client) {
        var defer = $q.defer();
        $http.post(base, client).then(function (res) {
            self.getById(retrieveId(res.data.location)).then(function(res) {
                defer.resolve(res.data)
            }, defer.reject);
        }, defer.reject);
        return defer.promise;
    };
    this.get = function () {
        return $http.get(base);
    };
    this.getById = function (id) {
        return $http.get(base + '/' + id);
    };
    /**
     *  Updates remote client.
     *  Receives the location of the new updated client and retrieves it from that location.
     */
    this.update = function (client) {
        var defer = $q.defer();
        $http.put(base + '/' + client.id, client).then(function (res) {
            self.getById(retrieveId(res.data.location)).then(function(res) {
                defer.resolve(res.data)
            }, defer.reject);
        }, defer.reject);
        return defer.promise;
    };
    this.delete = function (client) {
        return $http.delete(base + '/' + client.id)
    };
});
