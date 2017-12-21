angular.module(asterics.appServices)
    .service('envControlIRService', ['areService', 'areWebsocketService', '$q', '$timeout', function (areService, areWebsocketService, $q, $timeout) {
        var thiz = this;
        var componentName = 'LipMouse.1';
        var portName = 'send';
        var learnCmdResponse = 'IR: recorded';
        var _learnWaitSeconds = 5;
        var _learnWaitMillis = _learnWaitSeconds * 1000;
        var _testTimeout = 6000;
        var _lastLearnStartTime;
        thiz.canceler = $q.defer();

        thiz.irSend = function (cmd) {
            return irAction('AT IP ' + cmd);
        };

        thiz.irLearn = function () {
            _lastLearnStartTime = new Date().getTime();
            var def = $q.defer();
            var commandId = new Date().getTime();
            irAction('AT IR ' + commandId).then(function (response) {
                var index = response.indexOf(learnCmdResponse);
                if (index == -1 || response.indexOf(asterics.envControl.LIPMOUSE_TIMEOUT_ERROR) !== -1) {
                    def.reject(response);
                } else {
                    def.resolve(commandId);
                }
            }, function error(response) {
                def.reject(response);
            });
            return def.promise;
        };

        thiz.isConnected = function () {
            var def = $q.defer();
            irAction('AT', _testTimeout).then(function (response) {
                if (response.indexOf(asterics.envControl.IRTRANS_SOCKET_ERROR) !== -1) {
                    def.resolve(false);
                } else {
                    def.resolve(true);
                }
            }, function error(response) {
                def.resolve(false);
            });
            return def.promise;
        };

        //aborts a current action, closes websocket
        thiz.abortAction = function () {
            thiz.canceler.resolve();
            thiz.canceler = $q.defer();
        };

        function irAction(cmd, timeout) {
            var def = $q.defer();
            console.log("sending: " + cmd);

            areWebsocketService.doActionAndGetWebsocketResponse(actionFunction, thiz.canceler, timeout).then(function (response) {
                console.log('ir response: ' + response);
                if (response.indexOf(asterics.envControl.IRTRANS_SOCKET_ERROR) !== -1) {
                    def.reject(response);
                } else {
                    def.resolve(response);
                }
            }, function error() {
                def.reject();
            });

            function actionFunction() {
                areService.sendDataToInputPort(componentName, portName, cmd, thiz.canceler).then(function success() {
                }, function error() {
                    def.reject();
                });
            }

            return def.promise;
        };
    }]);