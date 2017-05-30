angular.module(asterics.appServices)
    .service('areService', ['$http', '$q', function ($http, $q) {
        var thiz = this;
        //The base URI that ARE runs at
        var hostname = window.location.hostname;
        var port = window.location.port;
        var _baseUri = "http://" + hostname + ":" + port + "/";
        var _baseUriREST = _baseUri + "rest/";
        var _saveFolder = "saved";
        var _pathToSaveFolder = "data/webservice/";
        var _timestampSuffix = ".timestamp";
        //delimiter used for encoding
        var delimiter = "-";
        var _eventSourceMap = {};

        thiz.deployAndStartModel = function (filepath) {
            return $http({
                method: 'PUT',
                url: _baseUriREST + "runtime/model/autorun/" + encodeParam(filepath)
            });
        };

        thiz.startModel = function () {
            return $http({
                method: 'PUT',
                url: _baseUriREST + "runtime/model/state/start"
            });
        };

        thiz.stopModel = function () {
            return $http({
                method: 'PUT',
                url: _baseUriREST + "runtime/model/state/stop"
            });
        };

        thiz.getModelState = function () {
            return $http({
                method: 'GET',
                url: _baseUriREST + "runtime/model/state"
            });
        };

        thiz.getModelName = function () {
            return $http({
                method: 'GET',
                url: _baseUriREST + "runtime/model/name"
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
                url: _baseUriREST + "runtime/model/" + encodeParam(filepath)
            });
        };

        thiz.sendDataToInputPort = function (componentId, inputId, value, canceler) {
            return $http({
                method: 'PUT',
                url: _baseUriREST + "runtime/model/components/" + encodeParam(componentId) + "/ports/" + encodeParam(inputId) + "/data",
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
                url: _baseUriREST + "runtime/model/components/" + encodeParam(componentId) + "/" + encodeParam(componentKey)
            });
        };

        thiz.getComponentDataChannelsIds = function (componentId, portId, canceler) {
            if (componentId == "") return;
            return $http({
                method: 'GET',
                url: _baseUriREST + "runtime/model/components/" + encodeParam(componentId) + "/" + encodeParam(portId) + "/channels/data/ids",
                config: getConfigCanceler(canceler)
            });
        };

        thiz.saveData = function (filename, dataJSON) {
            var modificationDate = new Date().getTime();
            var savepath = _pathToSaveFolder + _saveFolder + "/" + getCurrentAppName();
            $http({
                method: 'POST',
                url: _baseUriREST + "storage/data/" + encodeParam(savepath) + "/" + encodeParam(filename),
                headers: {
                    "Content-Type": "application/json"
                },
                data: angular.toJson(dataJSON)
            });
            $http({
                method: 'POST',
                url: _baseUriREST + "storage/data/" + encodeParam(savepath) + "/" + encodeParam(filename + _timestampSuffix),
                headers: {
                    "Content-Type": "application/json"
                },
                data: {lastModified: modificationDate}
            });
            return modificationDate;
        };

        thiz.getSavedData = function (filename) {
            var getPath = _saveFolder + "/" + getCurrentAppName();
            var def = $q.defer();
            $http({
                method: 'GET',
                url: _baseUri + getPath + "/" + filename
            }).then(function (response) {
                def.resolve(response.data);
            }, function() {
                def.resolve(null);
            });
            return def.promise;
        };

        thiz.getLastModificationDate = function (filename) {
            var getPath = _saveFolder + "/" + getCurrentAppName();
            var def = $q.defer();
            $http({
                method: 'GET',
                url: _baseUri + getPath + "/" + filename + _timestampSuffix
            }).then(function (response) {
                def.resolve(response.data.lastModified);
            }, function() {
                def.resolve(-1);
            });
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
                    resource = "runtime/model/channels/data/" + encodeParam(channelId) + "/listener";
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

            eventSource = new EventSource(_baseUriREST + resource); // Connecting to SSE service
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

        //encodes PathParametes
        function encodeParam(text) {
            encoded = "";
            for (i = 0; i < text.length; i++) {
                encoded += text.charCodeAt(i) + delimiter;
            }

            return encoded;
        }

        function getConfigCanceler(canceler) {
            var config = {};
            if (canceler) {
                config.timeout = canceler.promise;
            }
            return config;
        }

        function getCurrentAppName() {
            var searchString = "#!/" + asterics.const.STATE_HOME +"/";
            var href = window.location.href;
            return href.substring(href.indexOf(searchString)).substring(searchString.length);
        }
    }]);