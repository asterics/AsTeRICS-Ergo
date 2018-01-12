angular.module(asterics.appServices)
    .service('deviceIrTrans', ['areService', 'areWebsocketService', '$q', '$timeout', function (areService, areWebsocketService, $q) {
        var thiz = this;
        var IRTRANS_SOCKET_ERROR = 'ERROR_SOCKET_NOT_OPEN';
        var IRTRANS_TIMEOUT_ERROR = 'TIMEOUT ERROR';
        var irTransName = 'IrTrans.1';
        var irTransActionInput = 'action';
        var learnCmdResponse = 'LEARN ';
        var _learnWaitSeconds = 5;
        var _testTimeout = 6000;
        var _lastLearnStartTime;
        thiz.canceler = $q.defer();

        thiz.getName = function() {
            return asterics.envControl.HW_IRTRANS_USB;
        };

        thiz.send = function (cmd) {
            return irAction('sndhex H' + cmd);
        };

        thiz.irLearn = function () {
            _lastLearnStartTime = new Date().getTime();
            var def = $q.defer();
            irAction('learn ,,,,,W' + _learnWaitSeconds).then(function (response) { //W5 means timeout of 5 seconds
                var index = response.indexOf(learnCmdResponse);
                if (index == -1 || response.indexOf(IRTRANS_TIMEOUT_ERROR) !== -1) {
                    def.reject(asterics.envControl.IRLEARN_TIMEOUT);
                } else {
                    def.resolve(response.substring(index + learnCmdResponse.length));
                }
            }, function error(response) {
                def.reject(response);
            });
            return def.promise;
        };

        thiz.isConnected = function () {
            var def = $q.defer();
            irAction('snd irtrans,ok', _testTimeout).then(function (response) {
                if (response.indexOf(IRTRANS_SOCKET_ERROR) !== -1) {
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
            var actionString = '@IRTRANS:' + cmd;
            console.log("sending: " + actionString);

            areWebsocketService.doActionAndGetWebsocketResponse(actionFunction, thiz.canceler, timeout).then(function (response) {
                console.log('ir response: ' + response);
                if (response.indexOf(IRTRANS_SOCKET_ERROR) !== -1) {
                    def.reject(response);
                } else {
                    def.resolve(response);
                }
            }, function error() {
                def.reject();
            });

            function actionFunction() {
                areService.sendDataToInputPort(irTransName, irTransActionInput, actionString, thiz.canceler).then(function success() {
                }, function error() {
                    def.reject();
                });
            }

            return def.promise;
        };
    }]);