angular.module(asterics.appServices)
    .service('areService', ['$http', '$q', 'utilService', function ($http, $q, utilService) {
        var thiz = this;
        var _eventSourceMap = {};

        thiz.deployAndStartModel = function (filepath) {
            return $http({
                method: 'PUT',
                url: utilService.getRestUrl() + "runtime/model/autorun/" + utilService.encodeParam(filepath)
            });
        };

        thiz.startModel = function () {
            return $http({
                method: 'PUT',
                url: utilService.getRestUrl() + "runtime/model/state/start"
            });
        };

        thiz.stopModel = function () {
            return $http({
                method: 'PUT',
                url: utilService.getRestUrl() + "runtime/model/state/stop"
            });
        };

        thiz.getModelState = function () {
            return $http({
                method: 'GET',
                url: utilService.getRestUrl() + "runtime/model/state"
            });
        };

        thiz.getModelName = function () {
            return $http({
                method: 'GET',
                url: utilService.getRestUrl() + "runtime/model/name"
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
                url: utilService.getRestUrl() + "runtime/model/" + utilService.encodeParam(filepath)
            });
        };

        thiz.sendDataToInputPort = function (componentId, inputId, value, canceler) {
            return $http({
                method: 'PUT',
                url: utilService.getRestUrl() + "runtime/model/components/" + utilService.encodeParam(componentId) + "/ports/" + utilService.encodeParam(inputId) + "/data",
                dataType: 'text',
                headers: {
                    "Content-Type": "text/plain"
                },
                data: value,
                config: getConfigCanceler(canceler)
            });
        };

        thiz.getRuntimeComponentProperty = function (componentId, componentKey) {
            if ((componentId == "") || (componentKey == "")) return;
            return $http({
                method: 'GET',
                url: utilService.getRestUrl() + "runtime/model/components/" + utilService.encodeParam(componentId) + "/" + utilService.encodeParam(componentKey)
            });
        };

        thiz.getComponentDataChannelsIds = function (componentId, portId, canceler) {
            if (componentId == "") return;
            return $http({
                method: 'GET',
                url: utilService.getRestUrl() + "runtime/model/components/" + utilService.encodeParam(componentId) + "/" + utilService.encodeParam(portId) + "/channels/data/ids",
                config: getConfigCanceler(canceler)
            });
        };

        /**
         * opens and listens to a websocket, calls the "afteropen" method after opening the websocket and returns the
         * next value that is received via websocket. After receiving a value the websocket is closed
         *
         * @param canceler a promise that can be resolved in order to abort the action and close the websocket
         * @param afterOpen a function that is called, after the websocket is opened, e.g. a method, that sends data to
         * an are-model input-port
         * @returns {e|*|promise} a promise that is resolved with the data from websocket (e.g. data from are-model
         * output-port that is triggered by the data that is sent to input port in "afterOpen")
         */
        thiz.getNextWebsocketValue = function (canceler, afterOpen) {
            var def = $q.defer();
            websocket = new WebSocket(utilService.getWebsocketUrl());
            websocket.onopen = function (evt) {
                console.info("websocket opened!");
                afterOpen();
            };
            websocket.onclose = function (evt) {
                console.info("websocket closed!");
            };
            websocket.onmessage = function (evt) {
                var data = angular.copy(evt.data);
                def.resolve(data);
                websocket.close();
            };
            websocket.onerror = function (evt) {
                console.info("websocket error!");
                def.reject();
            };
            if (canceler && canceler.promise) {
                canceler.promise.then(function () {
                    websocket.close();
                });
            }
            return def.promise;
        };

        /**********************************
         *    Subscription to SSE events
         **********************************/

        thiz.subscribeSSE = function (successCallback, errorCallback, eventType, channelId) {
            var resource = '';
            if ((typeof EventSource) === "undefined") {
                var msg = "Error: SSE not supported by browser";
                console.error(msg);
                errorCallback(msg);
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
                    resource = "runtime/model/channels/data/" + utilService.encodeParam(channelId) + "/listener";
                    break;
                case asterics.const.ServerEventTypes.PROPERTY_CHANGED:
                    resource = "runtime/model/components/properties/listener";
                    break;
                default:
                    var msg = "ERROR: Unknown event type given as a parameter '" + eventType + "'";
                    console.error(msg);
                    errorCallback(msg);
                    return;
            }

            eventSource = new EventSource(utilService.getRestUrl() + resource); // Connecting to SSE service
            _eventSourceMap[eventType] = eventSource;

            //adding listener for specific events
            eventSource.addEventListener("event", function (e) {
                successCallback(JSON.parse(e.data), 200);
            }, false);

            // After SSE handshake constructed
            eventSource.onopen = function (e) {
                console.log("opened SSE for: " + eventType);
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
                console.log("closed SSE for: " + eventType);
                return true;
            } else {
                return false;
            }
        }

        function getConfigCanceler(canceler) {
            var config = {};
            if (canceler) {
                config.timeout = canceler.promise;
            }
            return config;
        }
    }]);