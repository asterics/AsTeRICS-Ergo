angular.module(asterics.appServices)
    .service('httpWrapper', ['$http', function ($http) {
        return $http;
    }]);