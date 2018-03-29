angular.module(asterics.appServices)
    .service('httpWrapper', ['$q', function ($q) {
        return function (config) {
            var def = $q.defer();
            def.resolve("");
            //console.log("sent http:");
            //console.log(config);
            return def.promise;
        };
    }]);