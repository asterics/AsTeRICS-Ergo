angular.module(asterics.appServices)
    .service('areService', ['$http', '$q', function ($http, $q) {
        var thiz = this;
        //The base URI that ARE runs at
        var _baseURI = "http://localhost:8081/rest/";
        //delimiter used for encoding
        var delimiter = "-";

        thiz.deployAndStartModel = function (filepath) {
            return $http({
                method: 'PUT',
                url: _baseURI + "runtime/model/autorun/" + encodeParam(filepath)
            });
        };

        thiz.startModel = function () {
            return $http({
                method: 'PUT',
                url: _baseURI + "runtime/model/state/start"
            });
        };

        thiz.stopModel = function () {
            return $http({
                method: 'PUT',
                url: _baseURI + "runtime/model/state/stop"
            });
        };

        thiz.getModelState = function () {
            return $http({
                method: 'GET',
                url: _baseURI + "runtime/model/state"
            });
        };

        thiz.getModelName = function () {
            return $http({
                method: 'GET',
                url: _baseURI + "runtime/model/name"
            });
        };

        thiz.isModelStarted = function (modelName) {
            var def = $q.defer();
            thiz.getModelName().then(function (response) {
                if (!response.data || response.data.indexOf(modelName) === -1) {
                    def.resolve(false);
                } else {
                    thiz.getModelState().then(function (response) {
                        def.resolve(response.data === "started");
                    }, function error() {
                        def.resolve(false);
                    });
                }
            }, function error() {
                def.resolve(false);
            });
            return def.promise;
        };

        thiz.deployModelFromFile = function (filepath) {
            if (filepath == "") return;
            return $http({
                method: 'PUT',
                url: _baseURI + "runtime/model/" + encodeParam(filepath)
            });
        };

        thiz.sendDataToInputPort = function (componentId, componentKey, value) {
            return $http({
                method: 'PUT',
                url: _baseURI + "runtime/model/components/input/" + encodeParam(componentId) + "/" + encodeParam(componentKey),
                dataType: 'text',
                headers: {
                    "Content-Type": "text/plain"
                },
                data: value
            });
        };

        thiz.getRuntimeComponentProperty = function (componentId, componentKey) {
            if ((componentId == "") || (componentKey == "")) return;
            return $http({
                method: 'GET',
                url: _baseURI + "runtime/model/components/" + encodeParam(componentId) + "/" + encodeParam(componentKey)
            });
        };

        //encodes PathParametes
        function encodeParam(text) {
            encoded = "";
            for (i = 0; i < text.length; i++) {
                encoded += text.charCodeAt(i) + delimiter;
            }

            return encoded;
        }
    }]);