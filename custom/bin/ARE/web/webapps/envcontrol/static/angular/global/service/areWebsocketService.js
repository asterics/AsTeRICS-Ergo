angular.module(asterics.appServices)
    .service('areWebsocketService', ['httpWrapper', '$q', 'utilService', '$timeout', function ($http, $q, utilService, $timeout) {
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
         * @param timeout timeout in milliseconds to wait to get a response from websocket
         * @param canceler a promise that can be used to cancel this action if not already performed
         * @returns {promise|e|*} a promise that is either resolved with the answer from websocket or rejected after
         * 10 seconds of no response on websocket
         */
        thiz.doActionAndGetWebsocketResponse = function (actionFunction, canceler, timeout) {
            var def = $q.defer();
            console.log("adding action to websocket queue, current length: " + _actionQueue.length);
            var queueItem = getQueueItem(actionFunction, timeout, canceler, def);
            _actionQueue.push(queueItem);
            runQueue();
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

        function getQueueItem(actionFunction, timeout, canceler, defer) {
            var item = {
                actionFunction: actionFunction,
                timeout: timeout,
                defer: defer,
                canceled: false
            };
            if (canceler && canceler.promise) {
                canceler.promise.then(function () {
                    item.canceled = true;
                });
            }
            return item;
        }

        function runQueue() {
            if (_actionQueue.length > 0 && !_isRunning) {
                _isRunning = true;
                var queueItem = _actionQueue.shift();
                var promise = runItem(queueItem);
                promise.finally(function () {
                    _isRunning = false;
                    runQueue();
                });
            }
        }

        function runItem(queueItem) {
            var timeout = queueItem.timeout || asterics.const.WEBSOCKET_TIMEOUT;
            var resolved = false;
            var def = $q.defer();
            if (queueItem.canceled) {
                def.reject();
                return;
            }
            $timeout(function () {
                if (!resolved) {
                    console.log("waiting for websocket message timed out (" + timeout + "ms)!");
                    queueItem.defer.reject();
                    def.reject();
                }
            }, timeout);

            initWebsocket().then(function () {
                _websocket.onmessage = function (evt) {
                    var data = angular.copy(evt.data);
                    queueItem.defer.resolve(data);
                    resolved = true;
                    def.resolve();
                };
                queueItem.actionFunction();
            }, function error() {
                handleError(queueItem);
                def.reject();
            });

            return def.promise;
        }

        function handleError(queueItem) {
            queueItem.defer.reject();
            _actionQueue = [];
            _websocket.close();
        }
    }]);