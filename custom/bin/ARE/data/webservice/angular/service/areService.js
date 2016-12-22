angular.module(are.app)
    .service('areService', ['$http', function ($http) {
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

        //encodes PathParametes
        function encodeParam(text) {
            encoded = "";
            for (i = 0; i < text.length; i++) {
                encoded += text.charCodeAt(i) + delimiter;
            }

            return encoded;
        };
    }]);