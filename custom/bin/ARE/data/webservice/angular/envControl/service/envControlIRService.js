angular.module(asterics.appServices)
    .service('envControlIRService', ['areService', '$q', '$timeout', function (areService, $q, $timeout) {
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

        //aborts a current action, unsubscribes from SSE
        thiz.abortAction = function () {
            thiz.canceler.resolve();
            thiz.canceler = $q.defer();
            return areService.unsubscribeSSE(asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION);
        };

        function irAction(cmd) {
            var def = $q.defer();
            var actionString = '@IRTRANS:' + cmd;
            console.log("sending: " + actionString);

            var successCallback = function (response) {
                areService.unsubscribeSSE(asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION);
                console.log('ir response: ' + response.data);
                if (response.data.indexOf(asterics.envControl.IRTRANS_SOCKET_ERROR) !== -1) {
                    def.reject(response.data);
                } else {
                    def.resolve(response.data);
                }
            };
            var errorCallback = function error() {
                areService.unsubscribeSSE(asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION);
                def.reject();
            };
            areService.getComponentDataChannelsIds(irTransName, 'output', thiz.canceler).then(function (response) {
                var channelIds = Object.keys(response.data);
                areService.subscribeSSE(successCallback, errorCallback, asterics.const.ServerEventTypes.DATA_CHANNEL_TRANSMISSION, channelIds[0]);
                areService.sendDataToInputPort(irTransName, irTransActionInput, actionString, thiz.canceler).then(function success() {
                }, function error() {
                    def.reject();
                });
            });
            return def.promise;
        };
    }]);