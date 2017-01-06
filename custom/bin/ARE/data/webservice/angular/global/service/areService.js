angular.module(asterics.appServices)
    .service('areService', ['$http', '$q', function ($http, $q) {
        var thiz = this;
        //The base URI that ARE runs at
        var _baseURI = "http://localhost:8081/rest/";
        //delimiter used for encoding
        var delimiter = "-";
        var _eventSourceMap = {};

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

        /**********************************
         *    Subscription to SSE events
         **********************************/

        thiz.subscribeSSE = function (successCallback, errorCallback, eventType, channelId) {
            var resource = '';
            if ((typeof EventSource) === "undefined") {
                console.error("Error: SSE not supported by browser");
                return;
            }
            closeEventSource(eventType);

            switch (eventType) {
                case asterics.const.ServerEventTypes.MODEL_CHANGED:
                    resource = "runtime/deployment/listener";
                    break;
                case asterics.const.ServerEventTypes.MODEL_STATE_CHANGED:
                    resource = "runtime/model/state/listener";
                    break;
                case asterics.const.ServerEventTypes.EVENT_CHANNEL_TRANSMISSION:
                    resource = "runtime/model/channels/event/listener";
                    break;
                case asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION:
                    resource = "runtime/model/channels/data/" + encodeParam(channelId) + "/listener";
                    break;
                case asterics.const.ServerEventTypes.PROPERTY_CHANGED:
                    resource = "runtime/model/components/properties/listener";
                    break;
                default:
                    console.error("ERROR: Unknown event type given as a parameter '" + eventType + "'");
                    return;
            }

            eventSource = new EventSource(_baseURI + resource); // Connecting to SSE service
            _eventSourceMap[eventType] = eventSource;

            //adding listener for specific events
            eventSource.addEventListener("event", function (e) {
                successCallback(e.data, 200);
            }, false);

            // After SSE handshake constructed
            eventSource.onopen = function (e) {
                console.log("Waiting message...");
            };

            // Error handler
            eventSource.onerror = function (e) {
                switch (e.target.readyState) {
                    case EventSource.CONNECTING:
                        console.log(400, 'reconnecting');
                        break;
                    case EventSource.CLOSED:
                        console.log(400, 'connectionLost');
                        break;
                    default:
                        errorCallback(400, 'someErrorOccurred');
                        console.log("Error occured");
                }
            };
        };


        thiz.unsubscribeSSE = function (eventType) {
            closeEventSource(eventType);
        };


        function closeEventSource(eventType) {
            var eventSource = _eventSourceMap[eventType];
            _eventSourceMap[eventType] = null;

            if (eventSource) {
                eventSource.close();
                return true;
            } else {
                return false;
            }
        }

        //encodes PathParametes
        function encodeParam(text) {
            encoded = "";
            for (i = 0; i < text.length; i++) {
                encoded += text.charCodeAt(i) + delimiter;
            }

            return encoded;
        }
    }]);