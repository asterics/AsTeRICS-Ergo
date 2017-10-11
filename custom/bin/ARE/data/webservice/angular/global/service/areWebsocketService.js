angular.module(asterics.appServices)
    .service('areWebsocketService', ['$http', '$q', 'utilService', '$timeout', function ($http, $q, utilService, $timeout) {
        var thiz = this;
        var _websocket = null;
        var _actionQueue = [];
        var _isRunning = false;

        /**
         * calls a given actionFunction and listens to the websocket for a response, which is returned with a promise.
         * The action is added to an internal queue, which successive calls all actions submitted to this function.
         * Therfore it is possible that the action is performed with some delay. If the given action is performed and
         * there is no response on the websocket for more than 10 seconds (WEBSOCKET_TIMEOUT), the returned promise is
         * rejected.
         *
         * @param actionFunction a function that calls some are-function which produces a response on websocket,
         * e.g. areService.sendDataToInputPort()
         * @param canceler a promise that can be used to cancel this action if not already performed
         * @returns {promise|e|*} a promise that is either resolved with the answer from websocket or rejected after
         * 10 seconds of no response on websocket
         */
        thiz.doActionAndGetWebsocketResponse = function (actionFunction, canceler) {
            var def = $q.defer();
            console.log("adding action to websocket queue, current length: " + _actionQueue.length);
            var queueItem = getQueueItem(actionFunction, canceler, def);
            if (canceler && canceler.promise) {
                canceler.promise.then(function () {
                    queueItem.canceled = true;
                });
            }
            _actionQueue.push(queueItem);
            if (!_isRunning) {
                run();
            }
            return def.promise;
        };

        function initWebsocket() {
            var def = $q.defer();
            if (!_websocket || _websocket.readyState != _websocket.OPEN) {
                if (_websocket) {
                    _websocket.close();
                }
                _websocket = new WebSocket(utilService.getWebsocketUrl());
                _websocket.onopen = function (evt) {
                    console.info("websocket opened!");
                    def.resolve();
                };
                _websocket.onclose = function (evt) {
                    console.info("websocket closed!");
                };
                _websocket.onerror = function (evt) {
                    console.info("websocket error!");
                    def.reject();
                };
            } else {
                def.resolve();
            }
            return def.promise;
        }

        function getQueueItem(actionFunction, canceler, defer) {
            return {
                actionFunction: actionFunction,
                defer: defer,
                canceled: false
            }
        }

        function run() {
            _isRunning = true;
            if (_actionQueue.length > 0) {
                var queueElement = _actionQueue.shift();
                var resolved = false;
                if (!queueElement.canceled) {
                    initWebsocket().then(function () {
                        _websocket.onmessage = function (evt) {
                            var data = angular.copy(evt.data);
                            queueElement.defer.resolve(data);
                            resolved = true;
                            run();
                        };
                        queueElement.actionFunction();
                        $timeout(function () {
                            if (!resolved) {
                                queueElement.defer.reject();
                                _isRunning = false;
                                _websocket.close();
                            }
                        }, asterics.const.WEBSOCKET_TIMEOUT);
                    }, function error() {
                        _isRunning = false;
                    });
                } else {
                    run();
                }
            } else {
                _isRunning = false;
            }
        }
    }]);