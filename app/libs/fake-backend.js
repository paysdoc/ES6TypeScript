/**
 * Created by rheimbach on 1/27/2016.
 */
/**
 *  fakeBacked urls:
 *  GET     /clients
 *  GET     /clients/:id
 *  POST    /clients
 *  PUT     /clients/:id
 *  DELETE  /clients/:id
 *
 *  ngMockE2E - Angular module for end-to-end testing.
 *              Provides the $httpBackend for mocking (simulating) a backend.
 */
angular.module('fakeBackend', ['ngMockE2E'])

    /**
     *  Simple factory that returns some Classes to simulate backend objects.
     */
    .factory('BackendClasses' , function () {
        var id = 1,
            classes = {};
        function Client(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.id = id;
            this.contract = null;
            id += 1;
        };
        function Contract(start, end, min, sms, data, priceAMonth) {
            this.start = start;
            this.end = end;
            this.min = min;
            this.sms = sms;
            this.data = data;
            this.priceAMonth = priceAMonth;
            this.usages = {};
        };
        function Usage (min, sms, data) {
            this.min = min;
            this.sms = sms;
            this.data = data;
        };

        return {
            Client:Client,
            Contract:Contract,
            Usage:Usage
        };
    })
    /**
     *  Service that holds our data (fake database).
     *  BackendClasses  -   Factory that holds the backend classes.
     */
    .service('BackendData', function (BackendClasses) {
        var Client = BackendClasses.Client,
            Contract = BackendClasses.Contract,
            Usage = BackendClasses.Usage;

        this.clients = [];

        function getDate(day, month, year) {
            var date = new Date();
            date.setMonth(month - 1);
            date.setUTCDate(day);
            date.setFullYear(year);
            return date;
        }

        var client1 = new Client('Jan', 'Berg'),
            client2 = new Client('Karel', 'de Vries');

        client1.contract = new Contract(getDate(1, 5, 2014), getDate(1, 5, 2016), 1000, 1000, 3000);
        client1.contract.usages['February'] = new Usage(232, 123, 2100);

        this.clients.push(client1);
        this.clients.push(client2);
    })
    /**
     *  Code that will be executed after this module is initialized.
     *  $httpBacked -   Angular Service that is used for testing purposes. In this case it serves as a fake backend.
     *  BackendData -   Fake database.
     *  BackendClasses  -   Factory that holds the backend classes. Used here for data creation purposes.
     */
    .run(function($httpBackend, BackendData, BackendClasses) {
        var Client = BackendClasses.Client;

        /**
         *  GET request to retrieve all clients (contracts not included).
         */
        $httpBackend.whenGET('/clients').respond(function(method, url, data, headers) {
            var clientsWithoutContracts = angular.copy(BackendData.clients);
            for(var i in clientsWithoutContracts) {
                delete clientsWithoutContracts[i].contract;
            }
            return [200, clientsWithoutContracts, {}];
        });

        /**
         *  POST request that creates a new Client.
         */
        $httpBackend.whenPOST('/clients').respond(function(method, url, data, headers) {
            var fromJson = angular.fromJson(data);
            var newClient = new Client(fromJson.firstName, fromJson.lastName);
            BackendData.clients.push(newClient);
            return [200, newClient];
        });

        /**
         *  GET request to retrieve a client based on id (contract included if available).
         */
        var regexClientId = new RegExp('/clients/([0-9]+)');
        $httpBackend.whenGET({
            test: function (url) {
                if(regexClientId.test(url)) {
                    var id = url.match(regexClientId)[1];
                    for(var i = 0;i < BackendData.clients.length; i++) {
                        if(BackendData.clients[i].id == id) {
                            return true;
                        }
                    }
                }
                return false;
            }
        }).respond(function (method, url, data, headers) {
            var id = url.match(regexClientId)[1];
            for(var i = 0;i < BackendData.clients.length; i++) {
                if(BackendData.clients[i].id == id) {
                    return [200, BackendData.clients[i]];
                }
            }
            return [404, { message: 'Not Found'}];
        });
        /**
         *  PUT request to update a client based on id.
         */
        $httpBackend.whenPUT({
            test: function (url) {
                return regexClientId.test(url);
            }
        }).respond(function (method, url, data, headers) {
            var id = url.match(regexClientId)[1];
            for(var i = 0;i < BackendData.clients.length; i++) {
                if(BackendData.clients[i].id == id) {
                    angular.extend(BackendData.clients[i], angular.fromJson(data));
                    return [200, BackendData.clients[i]];
                }
            }
            return [404, { message: 'Not Found'}];
        });

        /**
         *  DELETE request to delete a client based on id.
         */
        $httpBackend.whenDELETE({
            test: function (url) {
                return regexClientId.test(url);
            }
        }).respond(function (method, url, data, headers) {
            var id = url.match(regexClientId)[1];
            for(var i = 0;i < BackendData.clients.length; i++) {
                if(BackendData.clients[i].id == id) {
                    BackendData.clients.splice(i, 1);
                    return [200, { message: 'Client with id: ' + id +' deleted'}];
                }
            }
            return [404,{ message: 'Not Found'}];
        });

        /**
         *  GET request for HTML and CSS.
         *  $httpBackend catches all requests, so this part allows HTML and CSS requests to pass through.
         */
        var regexHtmlCss = new RegExp('^(.*\.(html|css$))[^.]*$');
        $httpBackend.whenGET({
            test: function (url) {
                return regexHtmlCss.test(url);
            }
        }).passThrough();
    })
    /**
     *  $httpProvider interceptors allow the developer to add additional behaviour to request handling
     *  as well as possible rejection of request/responses. In this case a simple log on debug level is added.
     */
    .config(function($httpProvider) {
        var loggingInterceptor = function($log) {
            return {
                'request': function(config) {
                    $log.debug('Request', config.method, config.url, (!!config.data) ? config.data : '');
                    return config;
                },
                'response': function(response) {
                    $log.debug('Response', response.config.method, response);
                    return response;
                },
                'responseError': function(response) {
                    $log.error('Response', response.config.method, response.config.url, response.data);
                    return response;
                }
            };
        };
        $httpProvider.interceptors.push(loggingInterceptor);
    });