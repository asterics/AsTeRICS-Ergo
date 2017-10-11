angular.module(asterics.appServices)
    .service('envControlIRService', ['areService', 'areWebsocketService', '$q', '$timeout', function (areService, areWebsocketService, $q, $timeout) {
        var thiz = this;
        var irTransName = 'IrTrans.1';
        var irTransActionInput = 'action';
        var learnCmdResponse = 'LEARN ';
        var _learnWaitSeconds = 5;
        var _learnWaitMillis = _learnWaitSeconds * 1000;
        var _lastLearnStartTime;
        thiz.canceler = $q.defer();

        thiz.irSend = function (cmd) {
            return irAction('sndhex H' + cmd);
        };

        thiz.irLearn = function () {
            _lastLearnStartTime = new Date().getTime();
            var def = $q.defer();
            irAction('learn ,,,,,W' + _learnWaitSeconds).then(function (response) { //W5 means timeout of 5 seconds
                var index = response.indexOf(learnCmdResponse);
                if (index == -1 || response.indexOf(asterics.envControl.IRTRANS_TIMEOUT_ERROR) !== -1) {
                    def.reject(response);
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
            irAction('snd irtrans,ok').then(function (response) {
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

        function irAction(cmd) {
            var def = $q.defer();
            var actionString = '@IRTRANS:' + cmd;
            console.log("sending: " + actionString);

            areWebsocketService.doActionAndGetWebsocketResponse(actionFunction, thiz.canceler).then(function (response) {
                console.log('ir response: ' + response);
                if (response.indexOf(asterics.envControl.IRTRANS_SOCKET_ERROR) !== -1) {
                    def.reject(response);
                } else {
                    def.resolve(response);
                }
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