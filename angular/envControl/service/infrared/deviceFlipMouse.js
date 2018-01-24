angular.module(asterics.appServices)
    .service('hardwareFlipMouse', ['areService', 'areWebsocketService', '$q', '$timeout', function (areService, areWebsocketService, $q, $timeout) {
        var thiz = this;
        var LIPMOUSE_TIMEOUT_ERROR = 'IR_TIMEOUT';
        var LIPMOUSE_IN_RESCAN = 'IN_PORT_RESCAN';
        var LIPMOUSE_NEW_RESCAN = 'NEW_PORT_RESCAN';
        var componentName = 'LipMouse.1';
        var portName = 'send';
        var learnCmdResponse = 'IR: recorded';
        var _testTimeout = 6000;
        thiz.canceler = $q.defer();

        thiz.getName = function() {
            return asterics.envControl.HW_IR_FLIPMOUSE;
        };

        thiz.send = function (cmd) {
            return irAction('AT IP ' + cmd);
        };

        thiz.irLearn = function () {
            var def = $q.defer();
            var commandId = new Date().getTime();
            irAction('AT IR ' + commandId).then(function (response) {
                var index = response.indexOf(learnCmdResponse);
                if (index == -1 || response.indexOf(LIPMOUSE_TIMEOUT_ERROR) !== -1) {
                    def.reject(asterics.envControl.IRLEARN_TIMEOUT);
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
            isConnectedInternal(def, false);
            return def.promise;
        };

        function isConnectedInternal(def, wasRescanStart) {
            irAction('AT', _testTimeout).then(function (response) {
                if (response.indexOf(LIPMOUSE_IN_RESCAN) !== -1) {
                    $timeout(function() {
                        isConnectedInternal(def, wasRescanStart);
                    }, 1000);
                } else if (response.indexOf(LIPMOUSE_NEW_RESCAN) !== -1) {
                    if(!wasRescanStart) {
                        $timeout(function() {
                            isConnectedInternal(def, true);
                        }, 1000);
                    } else {
                        def.resolve(false);
                    }
                } else {
                    def.resolve(true);
                }
            }, function error(response) {
                def.resolve(false);
            });
        }

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
                def.resolve(response);
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